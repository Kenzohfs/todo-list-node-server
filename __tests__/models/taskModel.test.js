const Task = require("../../src/models/taskModel");

describe("Task Model", () => {
  describe("validate (instance method)", () => {
    it("não deve lançar erro se title e statusId são fornecidos", () => {
      const task = new Task("Minha Tarefa", "João", "status1");
      expect(() => task.validate()).not.toThrow();
    });

    it("deve lançar erro se title estiver ausente", () => {
      const task = new Task("", "João", "status1");
      expect(() => task.validate()).toThrow("Title is required");
    });

    it("deve lançar erro se statusId estiver ausente", () => {
      const task = new Task("Minha Tarefa", "João", "");
      expect(() => task.validate()).toThrow("StatusId is required");
    });
  });

  describe("validateUpdate (static method)", () => {
    it("não deve lançar erro se os campos de atualização forem permitidos", () => {
      const updateData = {
        title: "Tarefa Atualizada",
        responsable: "Maria",
        statusId: "status2",
      };
      expect(() => Task.validateUpdate(updateData)).not.toThrow();
    });

    it("deve lançar erro se houver campos não permitidos", () => {
      const updateData = {
        title: "Tarefa Atualizada",
        responsable: "Maria",
        statusId: "status2",
        extra: "não permitido",
      };
      expect(() => Task.validateUpdate(updateData)).toThrow(
        /The following fields are not allowed: extra/
      );
    });
  });

  describe("allowedFields (static method)", () => {
    it("deve retornar as chaves de uma instância de Task", () => {
      const fields = Task.allowedFields();
      // Como a classe Task possui as propriedades "title", "responsable" e "statusId"
      expect(fields).toEqual(
        expect.arrayContaining(["title", "responsable", "statusId"])
      );
    });
  });
});
