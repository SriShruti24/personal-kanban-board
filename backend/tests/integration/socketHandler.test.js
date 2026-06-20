import { describe, it, expect, vi, beforeEach } from 'vitest';
const taskHandler = require('../../socket/taskHandler');
const taskService = require('../../services/taskService');

vi.mock('../../services/taskService', () => ({
    addTask: vi.fn(),
    updateTask: vi.fn(),
    moveTask: vi.fn(),
    deleteTask: vi.fn()
}));

describe('Socket Handler Integration Tests', () => {
    let mockIo;
    let mockSocket;
    let socketHandlers;

    beforeEach(() => {
        vi.clearAllMocks();
        socketHandlers = {};
        
        mockIo = {
            emit: vi.fn()
        };
        mockSocket = {
            on: vi.fn((event, callback) => {
                socketHandlers[event] = callback;
            })
        };

        taskHandler(mockIo, mockSocket);
    });

    it('should handle task:create and emit back', () => {
        const mockTaskData = { title: 'New Task' };
        const createdTask = { id: '123', title: 'New Task', status: 'To Do' };
        vi.mocked(taskService.addTask).mockReturnValue(createdTask);

        socketHandlers['task:create'](mockTaskData);

        expect(taskService.addTask).toHaveBeenCalledWith(mockTaskData);
        expect(mockIo.emit).toHaveBeenCalledWith('task:create', createdTask);
    });

    it('should handle task:update and emit back', () => {
        const updatedTaskData = { id: '123', title: 'Updated' };
        vi.mocked(taskService.updateTask).mockReturnValue(updatedTaskData);

        socketHandlers['task:update'](updatedTaskData);

        expect(taskService.updateTask).toHaveBeenCalledWith(updatedTaskData);
        expect(mockIo.emit).toHaveBeenCalledWith('task:update', updatedTaskData);
    });

    it('should handle task:move and emit back', () => {
        const movedTaskData = { id: '123', status: 'Done' };
        vi.mocked(taskService.moveTask).mockReturnValue(movedTaskData);

        socketHandlers['task:move']({ id: '123', status: 'Done' });

        expect(taskService.moveTask).toHaveBeenCalledWith('123', 'Done');
        expect(mockIo.emit).toHaveBeenCalledWith('task:move', movedTaskData);
    });

    it('should handle task:delete and emit back', () => {
        socketHandlers['task:delete']('123');

        expect(taskService.deleteTask).toHaveBeenCalledWith('123');
        expect(mockIo.emit).toHaveBeenCalledWith('task:delete', '123');
    });
});
