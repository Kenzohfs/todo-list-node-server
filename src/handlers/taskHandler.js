const os = require("os");
const taskRepo = require("../repos/taskRepository");
const Task = require("../models/taskModel");

exports.getTasks = async () => {
  return await taskRepo.getAllTasks();
};

exports.createTask = async (data) => {
  const taskModel = new Task(data.title, data.responsable, data.status);
  taskModel.validate();

  const hostname = os.hostname();
  const taskData = {
    title: taskModel.title,
    description: taskModel.description || "",
    responsable: taskModel.responsable,
    status: taskModel.status,
    hostname,
    createdAt: new Date(),
  };

  return await taskRepo.createTask(taskData);
};

exports.updateTask = async (id, updateData) => {
  Task.validateUpdate(updateData);

  await taskRepo.updateTask(id, updateData);
};

exports.deleteTask = async (id) => {
  await taskRepo.deleteTask(id);
};
