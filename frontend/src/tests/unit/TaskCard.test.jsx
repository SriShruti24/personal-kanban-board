import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import React from 'react';
import TaskCard from '../../components/TaskCard';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

const mockTask = {
  id: 'task-1',
  title: 'Test Task',
  description: 'Test Description',
  priority: 'High',
  category: 'Bug',
  status: 'To Do'
};

const renderWithDnD = (ui) => {
  return render(
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {ui}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

test('renders task card details correctly', () => {
  renderWithDnD(
    <TaskCard task={mockTask} index={0} onDelete={() => {}} onEdit={() => {}} />
  );

  expect(screen.getByText('Test Task')).toBeInTheDocument();
  expect(screen.getByText('Test Description')).toBeInTheDocument();
  expect(screen.getByText('High')).toBeInTheDocument();
  expect(screen.getByText('Bug')).toBeInTheDocument();
});

test('calls onDelete when delete button is clicked', () => {
  const handleDelete = vi.fn();
  renderWithDnD(
    <TaskCard task={mockTask} index={0} onDelete={handleDelete} onEdit={() => {}} />
  );

  const deleteBtn = screen.getByTitle('Delete');
  fireEvent.click(deleteBtn);
  
  expect(handleDelete).toHaveBeenCalledWith('task-1');
});

test('calls onEdit when edit button is clicked', () => {
  const handleEdit = vi.fn();
  renderWithDnD(
    <TaskCard task={mockTask} index={0} onDelete={() => {}} onEdit={handleEdit} />
  );

  const editBtn = screen.getByTitle('Edit');
  fireEvent.click(editBtn);
  
  expect(handleEdit).toHaveBeenCalledWith(mockTask);
});
