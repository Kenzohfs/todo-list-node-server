const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { ROUTES } = require("../consts/routes");

router.get(ROUTES.GET_TASKS, taskController.getAllTasks);
router.post(ROUTES.POST_TASK, taskController.createTask);
router.put(ROUTES.PUT_TASK, taskController.updateTask);

module.exports = router;
