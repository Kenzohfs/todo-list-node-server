const Auth = require("../../src/models/authModel");

describe("Auth Model", () => {
  describe("validate", () => {
    it("não deve lançar erro se email e password são fornecidos", () => {
      const data = { email: "test@test.com", password: "123456" };
      expect(() => Auth.validate(data)).not.toThrow();
    });

    it("deve lançar erro se o email está ausente", () => {
      const data = { password: "123456" };
      expect(() => Auth.validate(data)).toThrow(
        "Email and password are required"
      );
    });

    it("deve lançar erro se a password está ausente", () => {
      const data = { email: "test@test.com" };
      expect(() => Auth.validate(data)).toThrow(
        "Email and password are required"
      );
    });

    it("o erro lançado deve ter statusCode 400", () => {
      const data = { email: "", password: "" };
      try {
        Auth.validate(data);
      } catch (err) {
        expect(err.statusCode).toBe(400);
      }
    });
  });
});
