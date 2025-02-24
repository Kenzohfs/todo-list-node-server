const taskRepo = require("../repos/taskRepository");
const statusRepo = require("../repos/statusRepository");
const Task = require("../models/taskModel");
const getHostnameFromIp = require("../utils/reverseDns");

exports.getTasks = async () => {
  return await taskRepo.getAllTasks();
};

exports.createTask = async (data, req) => {
  const taskModel = new Task(data.title, data.responsable, data.statusId);
  taskModel.validate();

  validateStatus(taskModel.statusId);

  const hostname = await getHostnameFromIp(req.ip);
  const taskData = {
    title: taskModel.title,
    description: taskModel.description || "",
    responsable: taskModel.responsable,
    statusId: taskModel.statusId,
    hostname,
    createdAt: new Date(),
  };

  return await taskRepo.createTask(taskData);
};

exports.updateTask = async (id, updateData) => {
  const task = await taskRepo.getTaskById(id);
  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }

  if (updateData.statusId) {
    await validateStatus(updateData.statusId);
  }

  Task.validateUpdate(updateData);

  await taskRepo.updateTask(id, updateData);
};

exports.deleteTask = async (id) => {
  await taskRepo.deleteTask(id);
};

const validateStatus = async (statusId) => {
  const status = await statusRepo.getStatusById(statusId);

  if (!status) {
    const err = new Error("Status not found");
    err.statusCode = 404;
    throw err;
  }
};
