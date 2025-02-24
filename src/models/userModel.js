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

    if (!this.email.includes("@")) {
      const err = new Error("Invalid email");
      err.statusCode = 400;
      throw err;
    }

    if (!this.password) {
      const err = new Error("Password is required");
      err.statusCode = 400;
      throw err;
    }

    if (this.password.length < 8) {
      const err = new Error("Password must be at least 8 characters long");
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
