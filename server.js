const express = require("express");
const dotenv = require("dotenv");
const { BASE_PATHS } = require("./src/consts/basePaths");

const systemRoutes = require("./src/routes/systemRoutes");
const taskRoutes = require("./src/routes/taskRoutes");

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(BASE_PATHS.SERVER, systemRoutes);
app.use(BASE_PATHS.TASKS, taskRoutes);

// Middleware de erros
app.use((err, req, res, next) => {
  console.log(err.stack);
  const errCode = err.statusCode || 500;

  res.status(errCode).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
