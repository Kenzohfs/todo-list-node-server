const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const http = require("http");

const { BASE_PATHS } = require("./src/consts/basePaths");

const systemRoutes = require("./src/routes/systemRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
const statusRoutes = require("./src/routes/statusRoutes");
const authRoutes = require("./src/routes/authRoutes");

const { protect } = require("./src/middleware/authMiddleware");
const { init } = require("./src/ws/socket");

const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(BASE_PATHS.SERVER, systemRoutes);
app.use(BASE_PATHS.TASKS, protect, taskRoutes);
app.use(BASE_PATHS.AUTH, authRoutes);
app.use(BASE_PATHS.STATUS, protect, statusRoutes);

// Middleware de erros
app.use((err, req, res, next) => {
  console.log(err.stack);
  const errCode = err.statusCode || 500;

  res.status(errCode).json({ message: err.message });
});

init(server, { cors: { origin: "*" } });

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
