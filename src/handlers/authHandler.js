const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepo = require("../repos/userRepository");
const User = require("../models/userModel");
const Auth = require("../models/authModel");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const SALT_ROUNDS = 10;

exports.register = async (data) => {
  Auth.validate(data);

  const existingUser = await userRepo.getUserByEmail(data.email);
  if (existingUser) {
    const err = new Error("User already exists");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = new User(data.name, data.email, hashedPassword);
  user.validate();

  const newUser = {
    name: user.name,
    email: user.email,
    password: user.password,
    createdAt: new Date(),
  };

  return await userRepo.createUser(newUser);
};

exports.login = async (data) => {
  Auth.validate(data);

  const user = await userRepo.getUserByEmail(data.email);
  if (!user) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) {
    const err = new Error("Invalid email or password");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "3h",
  });

  return { token };
};
