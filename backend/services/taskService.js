const tasks = require("../store/task");
const { v1: uuidv1 } = require("uuid");

function addTask(taskData) {
    const newTask = {
        id: uuidv1(),
        title: taskData.title || "",
        description: taskData.description || "",
        priority: taskData.priority || "Low",
        category: taskData.category || "Feature",
        status: taskData.status || "toDo",
        attachment: taskData.attachment || "",
    };
    tasks.push(newTask);
    return newTask;
}

function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    return id;
}

function updateTask(updatedTask) {
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        return tasks[index];
    }
    return null;
}

function moveTask(id, status) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks[index].status = status;
        return tasks[index];
    }
    return null;
}

function getTaskById(id) {
    return tasks.find(t => t.id === id);
}

function getAllTasks() {
    return tasks;
}

module.exports = {
    addTask,
    deleteTask,
    updateTask,
    moveTask,
    getTaskById,
    getAllTasks
};