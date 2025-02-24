const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");
const { ROUTES } = require("../consts/routes");

router.get(ROUTES.GET_STATUS, statusController.getAllStatus);
router.post(ROUTES.POST_STATUS, statusController.createStatus);
router.put(ROUTES.PUT_STATUS, statusController.updateStatus);
router.delete(ROUTES.DELETE_STATUS, statusController.deleteStatus);

module.exports = router;
