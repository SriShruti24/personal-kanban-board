const taskService = require("../services/taskService");

module.exports = (io, socket) => {
    
    socket.on("task:create", (taskData) => {
        const newTask = taskService.addTask(taskData);
        io.emit("task:create", newTask);
    });

    socket.on("task:update", (updatedTaskData) => {
        const updatedTask = taskService.updateTask(updatedTaskData);
        if (updatedTask) {
            io.emit("task:update", updatedTask);
        }
    });

    socket.on("task:move", ({ id, status }) => {
        const movedTask = taskService.moveTask(id, status);
        if (movedTask) {
            io.emit("task:move", movedTask);
        }
    });

    socket.on("task:delete", (taskId) => {
        taskService.deleteTask(taskId);
        io.emit("task:delete", taskId);
    });

};
