class Auth {
  email;
  password;

  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  static validate(data) {
    if (!data.email || !data.password) {
      const err = new Error("Email and password are required");
      err.statusCode = 400;
      throw err;
    }
  }
}

module.exports = Auth;
