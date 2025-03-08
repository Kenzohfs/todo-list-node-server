const taskRepo = require("../repos/taskRepository");
const statusRepo = require("../repos/statusRepository");
const Task = require("../models/taskModel");
const getHostnameFromIp = require("../utils/reverseDns");

exports.getTasks = async () => {
  return await taskRepo.getAllTasks();
};

exports.createTask = async (data, req) => {
  const taskModel = new Task(data.title, data.responsable, data.statusId, data.team);
  taskModel.validate();

  await validateStatus(taskModel.statusId);

  const hostname = await getHostnameFromIp(req.ip);
  const taskData = {
    title: taskModel.title,
    description: taskModel.description || "",
    responsable: taskModel.responsable,
    statusId: taskModel.statusId,
    team: taskModel.team,
    hostname,
    createdAt: new Date().toISOString(),
  };

  const task = await taskRepo.createTask(taskData);

  return task;
};

exports.updateTask = async (id, updateData) => {
  const task = await taskRepo.getTaskById(id);
  if (!task) {
    const err = new Error("Tarefa não encontrada");
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
    const err = new Error("Status não encontrado");
    err.statusCode = 404;
    throw err;
  }
};
