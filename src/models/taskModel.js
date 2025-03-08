class Task {
  title = "";
  responsable = "";
  statusId = "";
  team = "";

  constructor(title, responsable = "", statusId, team = "") {
    this.title = title;
    this.responsable = responsable;
    this.statusId = statusId;
    this.team = team;
  }

  validate() {
    if (!this.title) {
      const err = new Error("Title is required");
      err.statusCode = 400;
      throw err;
    }

    if (!this.statusId) {
      const err = new Error("StatusId is required");
      err.statusCode = 400;
      throw err;
    }

    if (!this.team) {
      const err = new Error("Team is required");
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
  }

  static allowedFields() {
    const taskAux = new Task();
    return Object.keys(taskAux);
  }
}

module.exports = Task;
