const authHandler = require("../../src/handlers/authHandler");
const userRepo = require("../../src/repos/userRepository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Auth = require("../../src/models/authModel");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

jest.mock("../../src/repos/userRepository");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");
jest.mock("../../config/firebase", () => ({
  admin: {
    auth: () => ({
      verifyIdToken: jest.fn(),
    }),
  },
}));
jest.mock("../../src/models/authModel", () => ({
  validate: jest.fn(),
}));

describe("userHandler", () => {
  describe("register", () => {
    const newUserData = {
      name: "User",
      email: "user@test.com",
      password: "pass12345678",
    };

    beforeEach(() => {
      Auth.validate.mockImplementation(() => {});
    });

    it("deve lançar erro se o usuário já existir", async () => {
      userRepo.getUserByEmail.mockResolvedValue({
        id: "123",
        email: newUserData.email,
      });

      await expect(authHandler.register(newUserData)).rejects.toThrow(
        "Usuário já existe"
      );
    });

    it("deve criar um novo usuário se ele não existir", async () => {
      userRepo.getUserByEmail.mockResolvedValue(null);

      bcrypt.hash.mockResolvedValue("hashedPassword");

      userRepo.createUser.mockResolvedValue({
        id: "123",
        name: newUserData.name,
        email: newUserData.email,
        createdAt: "timestamp",
      });

      const result = await authHandler.register(newUserData);

      expect(bcrypt.hash).toHaveBeenCalledWith(
        newUserData.password,
        expect.any(Number)
      );
      expect(userRepo.createUser).toHaveBeenCalled();
      expect(result).toEqual({
        id: "123",
        name: newUserData.name,
        email: newUserData.email,
        createdAt: "timestamp",
      });
    });
  });

  describe("login", () => {
    const loginData = { email: "user@test.com", password: "pass12345678" };
    const fakeUser = {
      id: "123",
      email: loginData.email,
      password: "hashedPassword",
    };

    beforeEach(() => {
      Auth.validate.mockImplementation(() => {});
    });

    it("deve lançar erro se o usuário não for encontrado", async () => {
      userRepo.getUserByEmail.mockResolvedValue(null);

      await expect(authHandler.login(loginData, {})).rejects.toThrow(
        "Email ou senha inválidos"
      );
    });

    it("deve lançar erro se a senha for inválida", async () => {
      userRepo.getUserByEmail.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(authHandler.login(loginData, {})).rejects.toThrow(
        "Email ou senha inválidos"
      );
    });

    it("deve retornar um token se o login for bem-sucedido", async () => {
      userRepo.getUserByEmail.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);

      jwt.sign.mockReturnValue("signedToken");

      const result = await authHandler.login(loginData, {});

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: fakeUser.id, email: fakeUser.email },
        JWT_SECRET,
        { expiresIn: "3h" }
      );
      expect(result).toEqual({ token: "signedToken" });
    });
  });
});
