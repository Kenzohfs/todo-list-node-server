const jwt = require("jsonwebtoken");
const { admin } = require("../../config/firebase");
const JWT_SECRET = process.env.JWT_SECRET || "secret123";

exports.protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Não autenticado, não há token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    let decoded;

    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      decoded = await admin.auth().verifyIdToken(token);
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({ error: "Não autorizado, token inválido" });
  }
};
