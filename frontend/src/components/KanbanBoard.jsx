import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import Column from './Column';
import TaskModal from './TaskModal';
import ProgressChart from './ProgressChart';
import Footer from './Footer';
import { useTaskStore } from '../store/useTaskStore';
import { createTask, updateTask, deleteTask } from '../services/taskService';

const KanbanBoard = () => {
  const { tasks, isConnected, moveTaskOptimistic } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    moveTaskOptimistic(draggableId, destination.droppableId);
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      updateTask(taskData);
    } else {
      createTask(taskData);
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const columns = [
    { title: 'To Do', id: 'To Do' },
    { title: 'In Progress', id: 'In Progress' },
    { title: 'Done', id: 'Done' }
  ];

  return (
    <div className="kanban-container">
      <div className="app-header">
        <div className="title-section">
          <h1 className="app-title">
            <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="30" width="90" height="40" rx="20" fill="white" stroke="#1a1a1a" strokeWidth="6"/>
              <circle cx="30" cy="50" r="8" fill="#1a1a1a"/>
              <circle cx="70" cy="50" r="8" fill="#1a1a1a"/>
              <circle cx="33" cy="48" r="3" fill="white"/>
              <circle cx="73" cy="48" r="3" fill="white"/>
            </svg>
            Kanban<span style={{ color: 'var(--primary-color)' }}>Board.</span>
          </h1>
          <p className="app-subtitle">Track assignments, projects, and daily tasks in one place.</p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          <Plus size={20} /> Add Task
        </button>
      </div>

      <ProgressChart tasks={tasks} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {columns.map((col) => (
            <Column
              key={col.id}
              title={col.title}
              status={col.id}
              tasks={tasks.filter((t) => t.status === col.id)}
              onDelete={handleDeleteTask}
              onEdit={openEditModal}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask}
        existingTask={editingTask}
      />

      <Footer />
    </div>
  );
};

export default KanbanBoard;
