const handleTask = require("./taskHandler");
const taskService = require("../services/taskService");

function handleConnection(io) {
    io.on("connection", (socket) => {

        socket.emit("sync:tasks", taskService.getAllTasks());

        handleTask(io, socket);

        socket.on("disconnect", () => {
        });
    });
}

module.exports = handleConnection;
