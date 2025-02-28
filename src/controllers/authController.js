const authHandler = require("../handlers/authHandler");
const { asyncHandler } = require("../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  const user = await authHandler.register(req.body);
  res.status(201).json(user);
});

exports.login = asyncHandler(async (req, res) => {
  const token = await authHandler.login(req.body, req);
  res.json(token);
});

exports.registerOrUpdate = asyncHandler(async (req, res) => {
  const user = await authHandler.registerOrUpdate(req.body.token);
  res.status(200).json({ message: "Usuário atualizado com sucesso", user });
});
