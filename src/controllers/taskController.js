const taskHandler = require("../handlers/taskHandler");
const { asyncHandler } = require("../utils/asyncHandler");

exports.getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await taskHandler.getTasks();
  res.json(tasks);
});

exports.createTask = asyncHandler(async (req, res) => {
  const task = await taskHandler.createTask(req.body);
  res.status(201).json(task);
});

exports.updateTask = asyncHandler(async (req, res) => {
  await taskHandler.updateTask(req.params.id, req.body);
  res.status(204).end();
});
