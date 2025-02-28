const User = require("../../src/models/userModel");

describe("User Model", () => {
  describe("validate", () => {
    it("não deve lançar erro se todos os campos são válidos", () => {
      const user = new User("John Doe", "john@example.com", "password123");
      expect(() => user.validate()).not.toThrow();
    });

    it('deve lançar "Email is required" se o email estiver ausente', () => {
      const user = new User("John Doe", "", "password123");
      expect(() => user.validate()).toThrow("Email is required");
    });

    it('deve lançar "Invalid email" se o email não contém "@"', () => {
      const user = new User("John Doe", "johnexample.com", "password123");
      expect(() => user.validate()).toThrow("Invalid email");
    });

    it('deve lançar "Password is required" se a senha estiver ausente', () => {
      const user = new User("John Doe", "john@example.com", "");
      expect(() => user.validate()).toThrow("Password is required");
    });

    it('deve lançar "Password must be at least 8 characters long" se a senha for curta', () => {
      const user = new User("John Doe", "john@example.com", "pass123");
      expect(() => user.validate()).toThrow(
        "Password must be at least 8 characters long"
      );
    });

    it('deve lançar "Name is required" se o nome estiver ausente', () => {
      const user = new User("", "john@example.com", "password123");
      expect(() => user.validate()).toThrow("Name is required");
    });
  });
});
