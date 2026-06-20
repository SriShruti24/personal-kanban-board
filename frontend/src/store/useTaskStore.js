import { useState, useEffect } from 'react';
import socket from '../socket/socketClient';
import { moveTask as emitMoveTask } from '../services/taskService';

export const useTaskStore = () => {
  const [tasks, setTasks] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onSyncTasks = (serverTasks) => setTasks(serverTasks);
    const onTaskCreate = (newTask) => setTasks((prev) => [...prev, newTask]);
    const onTaskUpdate = (updatedTask) => setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    const onTaskMove = (updatedTask) => setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    const onTaskDelete = (taskId) => setTasks((prev) => prev.filter((t) => t.id !== taskId));

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('sync:tasks', onSyncTasks);
    socket.on('task:create', onTaskCreate);
    socket.on('task:update', onTaskUpdate);
    socket.on('task:move', onTaskMove);
    socket.on('task:delete', onTaskDelete);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('sync:tasks', onSyncTasks);
      socket.off('task:create', onTaskCreate);
      socket.off('task:update', onTaskUpdate);
      socket.off('task:move', onTaskMove);
      socket.off('task:delete', onTaskDelete);
    };
  }, []);

  const moveTaskOptimistic = (draggableId, destinationDroppableId) => {
    const task = tasks.find((t) => t.id === draggableId);
    if (!task) return;
    
    // Optimistic UI update
    const updatedTasks = Array.from(tasks);
    const sourceTaskIndex = updatedTasks.findIndex(t => t.id === draggableId);
    updatedTasks[sourceTaskIndex] = { ...task, status: destinationDroppableId };
    setTasks(updatedTasks);
    
    // Server update
    emitMoveTask(draggableId, destinationDroppableId);
  };

  return {
    tasks,
    isConnected,
    moveTaskOptimistic
  };
};
