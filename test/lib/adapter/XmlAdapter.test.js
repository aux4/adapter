const { XmlAdapter } = require("../../../lib/adapter");

describe("XmlAdapter", () => {
  let adapter, xml, result;

  beforeAll(async () => {
    adapter = new XmlAdapter();
    xml = await adapter.parse(`<data>
      <item>
        <name>John Doe</name>
        <age>42</age>
      </item>
      <item>
        <name>Jane Doe</name>
        <age>43</age>
      </item>
    </data>`);
  });

  describe("getRoot", () => {
    describe("when type is array", () => {
      beforeAll(() => {
        result = adapter.getRoot(xml, "$.data.item");
      });

      it("should be an array", () => {
        expect(result).toBeInstanceOf(Array);
      });

      it("should has length of 2", () => {
        expect(result).toHaveLength(2);
      });
    });

    describe("when type is object", () => {
      beforeAll(() => {
        result = adapter.getRoot(xml, "$.data");
      });

      it("should not be an array", () => {
        expect(result).not.toBeInstanceOf(Array);
      });
    });
  });

  describe("getValue", () => {
    describe("when type is object", () => {
      beforeAll(() => {
        const root = adapter.getRoot(xml, "$.data.item");
        result = adapter.getValue(root[0], "$.name");
      });

      it("should get the value", () => {
        expect(result).toEqual("John Doe");
      });
    });
  });

  describe("when type is array", () => {
    beforeAll(() => {
      result = adapter.getValue(xml, "$.data.item");
    });

    it("should get the value", () => {
      expect(result).toEqual([
        { name: "John Doe", age: 42 },
        { name: "Jane Doe", age: 43 }
      ]);
    });
  });
});
