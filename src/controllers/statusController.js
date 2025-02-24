const statusHandler = require("../handlers/statusHandler");
const { asyncHandler } = require("../utils/asyncHandler");

exports.getAllStatus = asyncHandler(async (req, res) => {
  const status = await statusHandler.getStatus();
  res.json(status);
});

exports.createStatus = asyncHandler(async (req, res) => {
  const status = await statusHandler.createStatus(req.body);
  res.status(201).json(status);
});

exports.updateStatus = asyncHandler(async (req, res) => {
  await statusHandler.updateStatus(req.params.id, req.body);
  res.status(204).end();
});

exports.deleteStatus = asyncHandler(async (req, res) => {
  await statusHandler.deleteStatus(req.params.id);
  res.status(204).end();
});
