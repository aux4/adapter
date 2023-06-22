const { AdapterFactory, TransformerFactory } = require("../..");
const { DateTransformer } = require("../../lib/transformer");

describe("Integration tests for XML", () => {
  let adapter, inputFile, mappingConfig, output, transformer;

  describe("Simple Object XML", () => {
    beforeAll(async () => {
      mappingConfig = {
        mapping: {
          type: "$.root._attr.type",
          name: "$.root.name",
          age: "$.root.age"
        }
      };

      inputFile = `<root type="person">
        <name>John Doe</name>
        <age>42</age>
      </root>`;

      adapter = new AdapterFactory();
      output = await adapter.get("xml").adapt(inputFile, {}, mappingConfig.mapping, transformer);
    });

    it("should output an object with name and age", () => {
      expect(output).toEqual({
        type: "person",
        name: "John Doe",
        age: 42
      });
    });
  });

  describe("Simple List XML", () => {
    beforeAll(async () => {
      mappingConfig = {
        root: {
          path: "$.data.item"
        },
        mapping: {
          name: "$.name",
          age: "$.age"
        }
      };

      inputFile = `<data>
        <item>
          <name>John Doe</name>
          <age>42</age>
        </item>
        <item>
          <name>Jane Doe</name>
          <age>43</age>
        </item>
      </data>
      `;

      adapter = new AdapterFactory();
      output = await adapter.get("xml").adapt(inputFile, mappingConfig.root, mappingConfig.mapping, transformer);
    });

    it("should output an array with name and age", () => {
      expect(output).toEqual([
        {
          name: "John Doe",
          age: 42
        },
        {
          name: "Jane Doe",
          age: 43
        }
      ]);
    });
  });

  describe("Nested object", () => {
    beforeAll(async () => {
      mappingConfig = {
        root: {
          path: "$.data.item"
        },
        mapping: {
          name: "$.name",
          address: {
            type: "object",
            mapping: {
              street: "$.street",
              city: "$.city",
              state: "$.state",
              zip: "$.zip"
            }
          }
        }
      };

      inputFile = `<data>
        <item>
          <name>John Doe</name>
          <street>123 Main st</street>
          <city>Anytown</city>
          <state>CA</state>
          <zip>12345</zip>
        </item>
        <item>
          <name>Jane Doe</name>
          <street>456 Main st</street>
          <city>Anytown</city>
          <state>CA</state>
          <zip>12345</zip>
        </item>
      </data>
      `;

      adapter = new AdapterFactory();
      output = await adapter.get("xml").adapt(inputFile, mappingConfig.root, mappingConfig.mapping, transformer);
    });

    it("should output an array with name and age", () => {
      expect(output).toEqual([
        {
          name: "John Doe",
          address: {
            street: "123 Main st",
            city: "Anytown",
            state: "CA",
            zip: 12345
          }
        },
        {
          name: "Jane Doe",
          address: {
            street: "456 Main st",
            city: "Anytown",
            state: "CA",
            zip: 12345
          }
        }
      ]);
    });
  });

  describe("XML using date transformer", () => {
    beforeAll(async () => {
      mappingConfig = {
        transformers: {
          DATE: {
            type: "date",
            format: "MM/DD/YYYY"
          }
        },
        root: {
          path: "$.data.item"
        },
        mapping: {
          name: "$.name",
          birthdate: {
            path: "$.birthday",
            transformer: "DATE"
          }
        }
      };

      inputFile = `<data>
        <item>
          <name>John Doe</name>
          <birthday>1996-04-10</birthday>
        </item>
        <item>
          <name>Jane Doe</name>
          <birthday>1991-02-14</birthday>
        </item>
      </data>
      `;

      transformer = new TransformerFactory();
      transformer.register("DATE", new DateTransformer(mappingConfig.transformers.DATE));

      adapter = new AdapterFactory();
      output = await adapter.get("xml").adapt(inputFile, mappingConfig.root, mappingConfig.mapping, transformer);
    });

    it("should output an array with name and birthdate", () => {
      expect(output).toEqual([
        {
          name: "John Doe",
          birthdate: "04/10/1996"
        },
        {
          name: "Jane Doe",
          birthdate: "02/14/1991"
        }
      ]);
    });
  });
});
