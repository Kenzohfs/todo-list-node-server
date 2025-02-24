class User {
  name;
  email;
  password;

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  validate() {
    if (!this.email) {
      const err = new Error("Email is required");
      err.statusCode = 400;
      throw err;
    }

    if (!this.password) {
      const err = new Error("Password is required");
      err.statusCode = 400;
      throw err;
    }

    if (!this.name) {
      const err = new Error("Name is required");
      err.statusCode = 400;
      throw err;
    }
  }
}

module.exports = User;
