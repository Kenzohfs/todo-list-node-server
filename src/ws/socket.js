const { Server } = require("socket.io");
const { WS_TOPICS } = require("../consts/wsTopics");

let io;

const init = (server, options = { cors: { origin: "*" } }) => {
  io = new Server(server, options);
  io.on("connection", (socket) => {
    console.log("Socket conectado:", socket.id);
  });

  configureListeners();
  return io;
};

const configureListeners = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }

  io.on("connection", (socket) => {
    socket.on(WS_TOPICS.TASK_UPDATED, (payload) => {
      socket.broadcast.emit(WS_TOPICS.TASK_UPDATED, { taskId: payload });
    });

    socket.on(WS_TOPICS.TASK_CREATED, (payload) => {
      socket.broadcast.emit(WS_TOPICS.TASK_CREATED, { taskId: payload });
    });

    socket.on(WS_TOPICS.TASK_DELETED, (payload) => {
      socket.broadcast.emit(WS_TOPICS.TASK_DELETED, { taskId: payload });
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

const wsBroadcastMessage = (topic, data) => {
  const ws = getIO();
  ws.emit(topic, data);
};

module.exports = { init, getIO, wsBroadcastMessage };
