const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { ROUTES } = require("../consts/routes");

router.post(ROUTES.REGISTER, authController.register);
router.post(ROUTES.LOGIN, authController.login);

module.exports = router;
