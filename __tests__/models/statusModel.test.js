const Status = require("../../src/models/statusModel");

describe("Status Model", () => {
  describe("validate (instance method)", () => {
    it("não deve lançar erro se a descrição estiver presente", () => {
      const status = new Status("Aberto");
      expect(() => status.validate()).not.toThrow();
    });

    it("deve lançar erro se a descrição estiver vazia", () => {
      const status = new Status("");
      expect(() => status.validate()).toThrow("Description is required");
    });

    it("o erro lançado pelo validate deve ter statusCode 400", () => {
      const status = new Status("");
      try {
        status.validate();
      } catch (err) {
        expect(err.statusCode).toBe(400);
      }
    });
  });

  describe("validateUpdate (static method)", () => {
    it("não deve lançar erro se data.description for fornecido", () => {
      const data = { description: "Fechado" };
      expect(() => Status.validateUpdate(data)).not.toThrow();
    });

    it("deve lançar erro se data.description estiver ausente ou vazia", () => {
      const data = { description: "" };
      expect(() => Status.validateUpdate(data)).toThrow(
        "Description is required"
      );
    });

    it("o erro lançado pelo validateUpdate deve ter statusCode 400", () => {
      const data = { description: "" };
      try {
        Status.validateUpdate(data);
      } catch (err) {
        expect(err.statusCode).toBe(400);
      }
    });
  });
});
