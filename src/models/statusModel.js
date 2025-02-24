class Status {
  description = "";

  constructor(description = "") {
    this.description = description;
  }

  validate() {
    if (!this.description) {
      const err = new Error("Description is required");
      err.statusCode = 400;
      throw err;
    }
  }

  static validateUpdate(data) {
    if (!data.description) {
      const error = new Error("Description is required");
      error.statusCode = 400;
      throw error;
    }
  }
}

module.exports = Status;
