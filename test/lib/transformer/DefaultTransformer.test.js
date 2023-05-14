const { DefaultTransformer } = require("../../../transformer");

describe("DefaultTransformer", () => {
  let transformer;

  beforeAll(() => {
    transformer = new DefaultTransformer();
  });

  describe("transform", () => {
    let result;

    beforeAll(() => {
      result = transformer.transform("value");
    });

    it("should return the value", () => {
      expect(result).toEqual("value");
    });
  });
});
