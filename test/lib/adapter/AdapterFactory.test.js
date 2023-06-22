const AdapterFactory = require("../../../lib/adapter/AdapterFactory");

describe("AdapterFactory", () => {
  let factory;

  describe("register", () => {
    let customAdapter;

    beforeAll(() => {
      customAdapter = jest.fn(() => {});

      factory = new AdapterFactory();
      factory.register("excel", customAdapter);
    });

    it("should return the custom adapter", () => {
      expect(factory.get("excel")).toBeDefined();
      expect(customAdapter).toHaveBeenCalled();
    });
  });

  describe("get", () => {
    beforeAll(() => {
      factory = new AdapterFactory();
    });

    describe("when type is not mapped", () => {
      it("should throw an error", () => {
        expect(() => {
          factory.get("excel");
        }).toThrowError("Unsupported type");
      });
    });

    describe("when type is mapped", () => {
      it("should return an adapter", () => {
        expect(factory.get("json")).toBeDefined();
      });
    });
  });
});
