const os = require("os");
const taskRepo = require("../repos/taskRepository");

exports.getTasks = async () => {
  return await taskRepo.getAllTasks();
};

exports.createTask = async (data) => {
  if (!data.title) {
    const err = new Error("Title is required");
    err.statusCode = 400;
    throw err;
  }

  const hostname = os.hostname();
  const taskData = {
    title: data.title,
    description: data.description || "",
    responsable: data.responsable || "",
    status: data.status || "to-do",
    hostname,
    createdAt: new Date(),
  };

  return await taskRepo.createTask(taskData);
};

exports.updateTask = async (id, updateData) => {
  await taskRepo.updateTask(id, updateData);
};
