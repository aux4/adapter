const { DefaultTransformer } = require("../../../transformer");
const { TransformerFactory } = require("../../..");

describe("Transformer", () => {
  let transformerFactory, TransformerType;

  describe("get", () => {
    beforeAll(() => {
      TransformerType = { transform: value => `result:${value}` };

      transformerFactory = new TransformerFactory();
      transformerFactory.register("test", TransformerType);
    });

    describe("when transformer is registered", () => {
      it("should register the transformer", () => {
        expect(transformerFactory.get("test").transform("value")).toEqual("result:value");
      });
    });

    describe("when transformer is not registered", () => {
      it("should register the transformer", () => {
        expect(transformerFactory.get("another").transform("value")).toEqual("value");
      });
    });
  });
});
