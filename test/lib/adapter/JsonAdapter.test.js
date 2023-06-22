const { JsonAdapter } = require("../../../lib/adapter");

describe("JsonAdapter", () => {
  let adapter;

  describe("get", () => {
    beforeAll(() => {
      adapter = new JsonAdapter();
    });

    describe("parse", () => {
      let result;

      beforeAll(async () => {
        result = await adapter.parse('{"test": "value"}');
      });

      it("should parse the json", () => {
        expect(result).toEqual({ test: "value" });
      });
    });

    describe("getRoot", () => {
      let result;

      describe("when rootPath is not defined", () => {
        beforeAll(() => {
          result = adapter.getRoot({ test: "value" });
        });

        it("should get the root", () => {
          expect(result).toEqual({ test: "value" });
        });
      });

      describe("when rootPath is defined", () => {
        beforeAll(() => {
          result = adapter.getRoot({ test: "value" }, "$.test");
        });

        it("should get the root", () => {
          expect(result).toEqual("value");
        });
      });
    });

    describe("getValue", () => {
      let result;

      beforeAll(() => {
        result = adapter.getValue({ test: "value" }, "$.test");
      });

      it("should get the value", () => {
        expect(result).toEqual("value");
      });
    });
  });
});
