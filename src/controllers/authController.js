const authHandler = require("../handlers/authHandler");
const { asyncHandler } = require("../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  const user = await authHandler.register(req.body);
  res.status(201).json(user);
});

exports.login = asyncHandler(async (req, res) => {
  const token = await authHandler.login(req.body);
  res.json(token);
});
