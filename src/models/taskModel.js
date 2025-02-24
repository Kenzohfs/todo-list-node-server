const { TASK_STATUS } = require("../consts/defaultTaskStatus");

class Task {
  title = "";
  responsable = "";
  status = "";

  constructor(title = "", responsable = "", status = TASK_STATUS.TODO) {
    this.title = title;
    this.responsable = responsable;
    this.status = status;
  }

  validate() {
    if (!this.title) {
      const err = new Error("Title is required");
      err.statusCode = 400;
      throw err;
    }
  }

  static validateUpdate(data) {
    const allowedFields = Task.allowedFields();
    const keys = Object.keys(data);

    const invalidFields = keys.filter((key) => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      const error = new Error(
        `The following fields are not allowed: ${invalidFields.join(", ")}`
      );
      error.statusCode = 400;
      throw error;
    }

    const requiredFields = Task.requiredFields();
    const missingFields = requiredFields.filter(
      (field) => !keys.includes(field)
    );
    if (missingFields.length > 0) {
      const error = new Error(
        "The following fields are required: " + missingFields.join(", ")
      );
      error.statusCode = 400;
      throw error;
    }
  }

  static allowedFields() {
    const taskAux = new Task();
    return Object.keys(taskAux);
  }

  static requiredFields() {
    return ["title"];
  }
}

module.exports = Task;
