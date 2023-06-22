const { ReplaceTransformer } = require("../../../lib/transformer");

describe("ReplaceTransformer", () => {
  let transformer;

  describe("transform", () => {
    let result;

    describe("when pattern is not found", () => {
      beforeAll(() => {
        transformer = new ReplaceTransformer({ defaultValue: "UNKNOWN" });
        result = transformer.transform("value");
      });

      it("should return the default value", () => {
        expect(result).toEqual("UNKNOWN");
      });
    });

    describe("when pattern is found", () => {
      beforeAll(() => {
        transformer = new ReplaceTransformer({ replace: { M: "MALE", F: "FEMALE" } });
        result = transformer.transform("M");
      });

      it("should return the replaced value", () => {
        expect(result).toEqual("MALE");
      });
    });

    describe("when value is undefined", () => {
      beforeAll(() => {
        transformer = new ReplaceTransformer();
        result = transformer.transform(undefined);
      });

      it("should return undefiend", () => {
        expect(result).toBeUndefined();
      });
    });
  });
});
