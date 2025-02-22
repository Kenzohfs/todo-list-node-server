const express = require("express");
const router = express.Router();
const { ROUTES } = require("../consts/routes");
const systemController = require("../controllers/systemController");

router.get(ROUTES.STATUS, systemController.status);

module.exports = router;
