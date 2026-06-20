import { describe, it, expect, beforeEach } from 'vitest';
const taskService = require('../../services/taskService');
const tasksStore = require('../../store/task');

describe('Task Service Unit Tests', () => {
    beforeEach(() => {
        tasksStore.length = 0;
    });

    it('should add a new task', () => {
        const newTask = taskService.addTask({ title: 'Test Task' });
        expect(newTask).toHaveProperty('id');
        expect(newTask.title).toBe('Test Task');
        expect(newTask.status).toBe('toDo'); // matches the default in taskService
        expect(tasksStore.length).toBe(1);
    });

    it('should update a task', () => {
        const newTask = taskService.addTask({ title: 'Test Task' });
        const updatedTask = taskService.updateTask({ id: newTask.id, title: 'Updated Task', status: 'In Progress' });
        
        expect(updatedTask.title).toBe('Updated Task');
        expect(updatedTask.status).toBe('In Progress');
        expect(tasksStore[0].title).toBe('Updated Task');
    });

    it('should move a task', () => {
        const newTask = taskService.addTask({ title: 'Test Task' });
        const movedTask = taskService.moveTask(newTask.id, 'Done');
        
        expect(movedTask.status).toBe('Done');
        expect(tasksStore[0].status).toBe('Done');
    });

    it('should delete a task', () => {
        const newTask = taskService.addTask({ title: 'Test Task' });
        taskService.deleteTask(newTask.id);
        
        expect(tasksStore.length).toBe(0);
    });
});
