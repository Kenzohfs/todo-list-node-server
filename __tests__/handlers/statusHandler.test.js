const statusHandler = require("../../src/handlers/statusHandler");
const statusRepo = require("../../src/repos/statusRepository");
const Status = require("../../src/models/statusModel");

jest.mock("../../src/repos/statusRepository");
jest.mock("../../src/models/statusModel");

describe("statusHandler", () => {
  describe("getStatus", () => {
    it("deve retornar todos os status", async () => {
      const fakeStatuses = [
        { id: "1", description: "Aberto", createdAt: "2023-01-01T00:00:00Z" },
        { id: "2", description: "Fechado", createdAt: "2023-01-02T00:00:00Z" },
      ];

      statusRepo.getAllStatus.mockResolvedValue(fakeStatuses);

      const result = await statusHandler.getStatus();

      expect(statusRepo.getAllStatus).toHaveBeenCalled();
      expect(result).toEqual(fakeStatuses);
    });
  });

  describe("createStatus", () => {
    it("deve criar um novo status", async () => {
      const inputData = { description: "Aberto" };

      const fakeStatusInstance = {
        description: "Aberto",
        validate: jest.fn(),
      };
      Status.mockImplementation(() => fakeStatusInstance);

      const fakeCreatedStatus = {
        id: "1",
        description: "Aberto",
        createdAt: "2023-01-01T00:00:00Z",
      };
      statusRepo.createStatus.mockResolvedValue(fakeCreatedStatus);

      const result = await statusHandler.createStatus(inputData);

      expect(fakeStatusInstance.validate).toHaveBeenCalled();
      expect(statusRepo.createStatus).toHaveBeenCalledWith(
        expect.objectContaining({
          description: "Aberto",
          createdAt: expect.any(String),
        })
      );
      expect(result).toEqual(fakeCreatedStatus);
    });
  });

  describe("updateStatus", () => {
    it("deve atualizar um status existente", async () => {
      const statusId = "1";
      const updateData = { description: "Atualizado" };

      const existingStatus = {
        id: statusId,
        description: "Aberto",
        createdAt: "2023-01-01T00:00:00Z",
      };
      statusRepo.getStatusById.mockResolvedValue(existingStatus);

      Status.validateUpdate = jest.fn();

      await statusHandler.updateStatus(statusId, updateData);

      expect(statusRepo.getStatusById).toHaveBeenCalledWith(statusId);
      expect(Status.validateUpdate).toHaveBeenCalledWith(updateData);
      expect(statusRepo.updateStatus).toHaveBeenCalledWith(
        statusId,
        updateData
      );
    });

    it("deve lançar erro se o status não for encontrado", async () => {
      const statusId = "inexistente";
      const updateData = { description: "Atualizado" };

      statusRepo.getStatusById.mockResolvedValue(null);

      await expect(
        statusHandler.updateStatus(statusId, updateData)
      ).rejects.toThrow("Status not found");
    });
  });

  describe("deleteStatus", () => {
    it("deve chamar o repositório para deletar o status", async () => {
      const statusId = "1";
      statusRepo.deleteStatus.mockResolvedValue();

      await statusHandler.deleteStatus(statusId);

      expect(statusRepo.deleteStatus).toHaveBeenCalledWith(statusId);
    });
  });
});
