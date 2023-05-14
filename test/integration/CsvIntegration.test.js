const { AdapterFactory, TransformerFactory } = require("../..");
const { DateTransformer } = require("../../transformer");

describe("Integration tests for CSV", () => {
  let adapter, inputFile, mappingConfig, output, transformerFactory;

  describe("Simple CSV", () => {
    beforeAll(async () => {
      mappingConfig = {
        mapping: {
          name: "$.name",
          age: "$.age"
        }
      };

      inputFile = `name,age
John Doe,42
Jane Doe,43`;

      adapter = new AdapterFactory();
      output = await adapter.get("text/csv").adapt(inputFile, {}, mappingConfig.mapping, transformerFactory);
    });

    it("should output an array with name and age", () => {
      expect(output).toEqual([
        {
          name: "John Doe",
          age: "42"
        },
        {
          name: "Jane Doe",
          age: "43"
        }
      ]);
    });
  });

  describe("Nested object", () => {
    beforeAll(async () => {
      mappingConfig = {
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

      inputFile = `name,street,city,state,zip
John Doe,123 Main st,Anytown,CA,12345
Jane Doe,456 Main st,Anytown,CA,12345`;

      adapter = new AdapterFactory();
      output = await adapter.get("text/csv").adapt(inputFile, {}, mappingConfig.mapping, transformerFactory);
    });

    it("should output an array with name and age", () => {
      expect(output).toEqual([
        {
          name: "John Doe",
          address: {
            street: "123 Main st",
            city: "Anytown",
            state: "CA",
            zip: "12345"
          }
        },
        {
          name: "Jane Doe",
          address: {
            street: "456 Main st",
            city: "Anytown",
            state: "CA",
            zip: "12345"
          }
        }
      ]);
    });
  });

  describe("CSV using date transformer", () => {
    beforeAll(async () => {
      mappingConfig = {
        transformers: {
          DATE: {
            type: "date",
            format: "MM/DD/YYYY"
          }
        },
        mapping: {
          name: "$.name",
          birthdate: {
            path: "$.birthday",
            transformer: "DATE"
          }
        }
      };

      inputFile = `name,birthday
John Doe,04/10/1996
Jane Doe,02/14/1991`;

      transformerFactory = new TransformerFactory();
      transformerFactory.register("DATE", new DateTransformer(mappingConfig.transformers.DATE));

      adapter = new AdapterFactory();
      output = await adapter.get("text/csv").adapt(inputFile, {}, mappingConfig.mapping, transformerFactory);
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
