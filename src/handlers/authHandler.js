const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepo = require("../repos/userRepository");
const User = require("../models/userModel");
const Auth = require("../models/authModel");
const { admin } = require("../../config/firebase");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";
const SALT_ROUNDS = 10;

exports.registerOrUpdate = async (idToken) => {
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  const uid = decodedToken.uid;
  const email = decodedToken.email;
  const displayName = decodedToken.name;

  const user = await userRepo.getUserById(uid);

  if (!user) {
    await userRepo.createUser({
      uid,
      email,
      displayName,
      createdAt: new Date().toISOString(),
    });
  }

  return { uid, email, displayName };
};

exports.register = async (data) => {
  Auth.validate(data);

  const existingUser = await userRepo.getUserByEmail(data.email);
  if (existingUser) {
    const err = new Error("Usuário já existe");
    err.statusCode = 400;
    throw err;
  }

  const user = new User(data.name, data.email, data.password);
  user.validate();

  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const newUser = {
    name: user.name,
    email: user.email,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  const createdUser = await userRepo.createUser(newUser);
  delete createdUser.password;

  return createdUser;
};

exports.login = async (data, req) => {
  Auth.validate(data);

  const user = await userRepo.getUserByEmail(data.email);
  if (!user) {
    const err = new Error("Email ou senha inválidos");
    err.statusCode = 401;
    throw err;
  }

  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) {
    const err = new Error("Email ou senha inválidos");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "3h",
  });

  return { token };
};
