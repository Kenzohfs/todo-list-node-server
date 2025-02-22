const { asyncHandler } = require("../utils/asyncHandler");

exports.status = asyncHandler(async (req, res) => {
  res.json({ res: "Server is up and running" });
});
