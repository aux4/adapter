const { CsvAdapter } = require("../../../lib/adapter");

describe("CsvAdapter", () => {
  let adapter, csv, result;

  describe("getRoot", () => {
    let rows;

    beforeAll(async () => {
      adapter = new CsvAdapter();

      rows = ["value1", "value2"];
      result = adapter.getRoot(rows);
    });

    it("should return the same parameter", () => {
      expect(result).toEqual(rows);
    });
  });

  describe("getValue", () => {
    let result;

    beforeAll(async () => {
      csv = await adapter.parse("name,age\nJohn,30", {});
      result = adapter.getValue(csv[0], "$.name");
    });

    it("should return the name", () => {
      expect(result).toEqual("John");
    });
  });
});
