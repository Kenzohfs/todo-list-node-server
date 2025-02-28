const taskHandler = require("../../src/handlers/taskHandler");
const taskRepo = require("../../src/repos/taskRepository");
const statusRepo = require("../../src/repos/statusRepository");
const Task = require("../../src/models/taskModel");
const getHostnameFromIp = require("../../src/utils/reverseDns");

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("../../src/repos/taskRepository");
jest.mock("../../src/repos/statusRepository");
jest.mock("../../src/models/taskModel");
jest.mock("../../src/utils/reverseDns");

describe("taskHandler", () => {
  describe("getTasks", () => {
    it("deve retornar todas as tasks", async () => {
      const fakeTasks = [
        { id: "1", title: "Task 1" },
        { id: "2", title: "Task 2" },
      ];
      taskRepo.getAllTasks.mockResolvedValue(fakeTasks);

      const result = await taskHandler.getTasks();

      expect(taskRepo.getAllTasks).toHaveBeenCalled();
      expect(result).toEqual(fakeTasks);
    });
  });

  describe("createTask", () => {
    it("deve criar uma nova task", async () => {
      const inputData = {
        title: "Nova Task",
        responsable: "João",
        statusId: "status1",
      };

      const fakeTaskInstance = {
        title: inputData.title,
        description: "",
        responsable: inputData.responsable,
        statusId: inputData.statusId,
        validate: jest.fn(),
      };

      Task.mockImplementation(() => fakeTaskInstance);

      statusRepo.getStatusById.mockResolvedValue({
        id: inputData.statusId,
        description: "Aberto",
      });

      getHostnameFromIp.mockResolvedValue("hostname.example.com");
      const fakeCreatedTask = {
        id: "task123",
        title: inputData.title,
        description: "",
        responsable: inputData.responsable,
        statusId: inputData.statusId,
        hostname: "hostname.example.com",
        createdAt: "2023-01-01T00:00:00Z",
      };
      taskRepo.createTask.mockResolvedValue(fakeCreatedTask);

      const req = { ip: "127.0.0.1" };

      const result = await taskHandler.createTask(inputData, req);

      expect(fakeTaskInstance.validate).toHaveBeenCalled();
      expect(statusRepo.getStatusById).toHaveBeenCalledWith(inputData.statusId);
      expect(getHostnameFromIp).toHaveBeenCalledWith(req.ip);
      expect(taskRepo.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: inputData.title,
          description: "",
          responsable: inputData.responsable,
          statusId: inputData.statusId,
          hostname: "hostname.example.com",
          createdAt: expect.any(String),
        })
      );
      expect(result).toEqual(fakeCreatedTask);
    });
  });

  describe("updateTask", () => {
    it("deve atualizar uma task existente", async () => {
      const taskId = "task123";
      const updateData = { title: "Task Atualizada", statusId: "status2" };

      const existingTask = { id: taskId, title: "Task Antiga" };
      taskRepo.getTaskById.mockResolvedValue(existingTask);

      statusRepo.getStatusById.mockResolvedValue({
        id: updateData.statusId,
        description: "Em andamento",
      });
      Task.validateUpdate = jest.fn();

      await taskHandler.updateTask(taskId, updateData);

      expect(taskRepo.getTaskById).toHaveBeenCalledWith(taskId);
      expect(statusRepo.getStatusById).toHaveBeenCalledWith(
        updateData.statusId
      );
      expect(Task.validateUpdate).toHaveBeenCalledWith(updateData);
      expect(taskRepo.updateTask).toHaveBeenCalledWith(taskId, updateData);
    });

    it("deve lançar erro se a task não for encontrada", async () => {
      const taskId = "inexistente";
      const updateData = { title: "Task Atualizada" };

      taskRepo.getTaskById.mockResolvedValue(null);

      await expect(taskHandler.updateTask(taskId, updateData)).rejects.toThrow(
        "Tarefa não encontrada"
      );
    });
  });

  describe("deleteTask", () => {
    it("deve deletar a task", async () => {
      const taskId = "task123";
      taskRepo.deleteTask.mockResolvedValue();

      await taskHandler.deleteTask(taskId);

      expect(taskRepo.deleteTask).toHaveBeenCalledWith(taskId);
    });
  });
});
