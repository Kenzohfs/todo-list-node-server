const statusRepo = require("../repos/statusRepository");
const Status = require("../models/statusModel");

exports.getStatus = async () => {
  return await statusRepo.getAllTasks();
};

exports.createStatus = async (data) => {
  const statusModel = new Status(data.description);
  statusModel.validate();

  const statusData = {
    description: statusModel.description,
    createdAt: new Date(),
  };

  return await statusRepo.createStatus(statusData);
};

exports.updateStatus = async (id, updateData) => {
  const status = await statusRepo.getStatusById(id);
  if (!status) {
    const err = new Error("Status not found");
    err.statusCode = 404;
    throw err;
  }

  Status.validateUpdate(updateData);

  await statusRepo.updateStatus(id, updateData);
};

exports.deleteStatus = async (id) => {
  await statusRepo.deleteStatus(id);
};
