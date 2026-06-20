import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import KanbanBoard from '../../components/KanbanBoard';

const mockSocket = vi.hoisted(() => ({
  on: vi.fn(),
  off: vi.fn(),
  emit: vi.fn(),
  connected: true
}));

vi.mock('socket.io-client', () => {
  return {
    io: () => mockSocket
  };
});

vi.mock('react-select', () => {
  return {
    __esModule: true,
    default: ({ options, value, onChange, placeholder }) => (
      <select 
        data-testid="react-select" 
        value={value?.value || ''} 
        onChange={(e) => onChange(options.find(o => o.value === e.target.value))}
      >
        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </select>
    )
  };
});

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: () => <div>BarChart</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  CartesianGrid: () => <div>CartesianGrid</div>,
  Tooltip: () => <div>Tooltip</div>,
  Cell: () => <div>Cell</div>,
}));

// Mock dnd to simulate drag and drop
let triggerDragEnd;
vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children, onDragEnd }) => {
    triggerDragEnd = onDragEnd;
    return <div data-testid="dnd-context">{children}</div>;
  },
  Droppable: ({ children, droppableId }) => (
    <div data-testid={`droppable-${droppableId}`}>
      {children({ droppableProps: {}, innerRef: vi.fn(), placeholder: null }, { isDraggingOver: false })}
    </div>
  ),
  Draggable: ({ children, draggableId }) => (
    <div data-testid={`draggable-${draggableId}`}>
      {children({ draggableProps: {}, dragHandleProps: {}, innerRef: vi.fn() }, { isDragging: false })}
    </div>
  )
}));

describe('KanbanBoard Unit & Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Unit: Tests WebSocket connection logic', () => {
    render(<KanbanBoard />);
    expect(mockSocket.on).toHaveBeenCalledWith('connect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('disconnect', expect.any(Function));
    expect(mockSocket.on).toHaveBeenCalledWith('sync:tasks', expect.any(Function));
  });

  it('Integration: Ensure WebSocket updates correctly sync state (sync:tasks)', async () => {
    render(<KanbanBoard />);
    const syncCallback = mockSocket.on.mock.calls.find(call => call[0] === 'sync:tasks')[1];
    const mockTasks = [
      { id: '1', title: 'Task 1', description: 'Desc 1', status: 'To Do', priority: 'High', category: 'Bug' }
    ];
    
    syncCallback(mockTasks);
    
    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInDocument();
      expect(screen.getByText('Desc 1')).toBeInDocument();
    });
  });

  it('Unit: Adding a task emits task:create', async () => {
    render(<KanbanBoard />);
    
    fireEvent.click(screen.getByText(/Add Task/i));
    
    const titleInput = screen.getByPlaceholderText('Task Title');
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    
    fireEvent.click(screen.getByText('Save Task'));
    
    expect(mockSocket.emit).toHaveBeenCalledWith('task:create', expect.objectContaining({
      title: 'New Task',
      status: 'To Do'
    }));
  });

  it('Unit: Deleting a task emits task:delete', async () => {
    render(<KanbanBoard />);
    const syncCallback = mockSocket.on.mock.calls.find(call => call[0] === 'sync:tasks')[1];
    syncCallback([{ id: 'task-123', title: 'Task to delete', status: 'To Do', priority: 'Low', category: 'Feature' }]);
    
    
    await waitFor(() => {
      expect(screen.getByText('Task to delete')).toBeInDocument();
    });

    const deleteBtn = screen.getByTitle('Delete');
    fireEvent.click(deleteBtn);
    
    expect(mockSocket.emit).toHaveBeenCalledWith('task:delete', 'task-123');
  });

  it('Integration: Validate drag-and-drop functionality for moving tasks', async () => {
    render(<KanbanBoard />);
    const syncCallback = mockSocket.on.mock.calls.find(call => call[0] === 'sync:tasks')[1];
    syncCallback([{ id: 'task-dnd', title: 'DnD Task', status: 'To Do', priority: 'Low', category: 'Feature' }]);
    
    await waitFor(() => {
      expect(screen.getByText('DnD Task')).toBeInDocument();
    });

    triggerDragEnd({
      draggableId: 'task-dnd',
      source: { droppableId: 'To Do', index: 0 },
      destination: { droppableId: 'In Progress', index: 0 }
    });

    expect(mockSocket.emit).toHaveBeenCalledWith('task:move', { id: 'task-dnd', status: 'In Progress' });
  });
});
