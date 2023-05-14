const { DateTransformer } = require("../../../transformer");

describe("DateTransformer", () => {
  let transformer;

  describe("transform", () => {
    let result;

    describe("with default format", () => {
      beforeAll(() => {
        transformer = new DateTransformer();
        result = transformer.transform("2020-03-10 10:50:00");
      });

      it("should return a date", () => {
        expect(result).toEqual("2020-03-10 10:50:00 -05:00");
      });
    });

    describe("with specific format", () => {
      beforeAll(() => {
        transformer = new DateTransformer({ format: "MM/DD/YYYY" });
        result = transformer.transform("2020-03-10");
      });

      it("should return a date", () => {
        expect(result).toEqual("03/10/2020");
      });
    });

    describe("with specific pattern", () => {
      beforeAll(() => {
        transformer = new DateTransformer({ pattern: "DD.MM.YYYY", format: "MM/DD/YYYY" });
        result = transformer.transform("10.03.2020");
      });

      it("should return a date", () => {
        expect(result).toEqual("03/10/2020");
      });
    });
  });
});
