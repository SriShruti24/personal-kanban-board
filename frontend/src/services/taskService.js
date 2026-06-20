import socket from '../socket/socketClient';

export const createTask = (taskData) => {
  socket.emit('task:create', taskData);
};

export const updateTask = (taskData) => {
  socket.emit('task:update', taskData);
};

export const moveTask = (id, status) => {
  socket.emit('task:move', { id, status });
};

export const deleteTask = (id) => {
  socket.emit('task:delete', id);
};
