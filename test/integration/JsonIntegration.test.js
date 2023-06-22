const { AdapterFactory, TransformerFactory } = require("../..");
const { DateTransformer } = require("../../lib/transformer");

describe("Integration tests for JSON", () => {
  let adapter, inputFile, mappingConfig, output, transformerFactory;

  describe("No data", () => {
    beforeAll(async () => {
      mappingConfig = {
        root: {
          path: "$.data"
        },
        mapping: {
          name: "$.name",
          age: "$.age"
        }
      };

      inputFile = {
        data: []
      };

      adapter = new AdapterFactory();
    });

    it("should throw an error", () => {
      expect(async () => {
        await adapter
          .get("json")
          .adapt(JSON.stringify(inputFile), mappingConfig.root, mappingConfig.mapping, transformerFactory);
      }).rejects.toThrow("No data");
    });
  });

  describe("Simple JSON", () => {
    beforeAll(async () => {
      mappingConfig = {
        root: {
          path: "$.data"
        },
        mapping: {
          name: "$.name",
          age: "$.age"
        }
      };

      inputFile = {
        data: [
          {
            name: "John Doe",
            age: 42
          },
          {
            name: "Jane Doe",
            age: 43
          }
        ]
      };

      adapter = new AdapterFactory();
      output = await adapter
        .get("json")
        .adapt(JSON.stringify(inputFile), mappingConfig.root, mappingConfig.mapping, transformerFactory);
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

  describe("Nested non-mapped object", () => {
    beforeAll(async () => {
      mappingConfig = {
        root: {
          path: "$.data"
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

      inputFile = {
        data: [
          {
            name: "John Doe",
            street: "123 Main st",
            city: "Anytown",
            state: "CA",
            zip: "12345",
            zip4: "6789"
          },
          {
            name: "Jane Doe",
            street: "456 Main st",
            city: "Anytown",
            state: "CA",
            zip: "12345",
            zip4: "6789"
          }
        ]
      };

      adapter = new AdapterFactory();
      output = await adapter
        .get("json")
        .adapt(JSON.stringify(inputFile), mappingConfig.root, mappingConfig.mapping, transformerFactory);
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

  describe("Nested mapped object", () => {
    beforeAll(async () => {
      mappingConfig = {
        root: {
          path: "$.data"
        },
        mapping: {
          name: "$.name",
          address: {
            type: "object",
            path: "$.address",
            mapping: {
              street: "$.street",
              city: "$.city",
              state: "$.state",
              zip: "$.zip"
            }
          }
        }
      };

      inputFile = {
        data: [
          {
            name: "John Doe",
            address: {
              street: "123 Main st",
              city: "Anytown",
              state: "CA",
              zip: "12345",
              zip4: "6789"
            }
          },
          {
            name: "Jane Doe",
            address: {
              street: "456 Main st",
              city: "Anytown",
              state: "CA",
              zip: "12345",
              zip4: "6789"
            }
          }
        ]
      };

      adapter = new AdapterFactory();
      output = await adapter
        .get("json")
        .adapt(JSON.stringify(inputFile), mappingConfig.root, mappingConfig.mapping, transformerFactory);
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

  describe("Nested array", () => {
    beforeAll(async () => {
      mappingConfig = {
        root: {
          path: "$.data"
        },
        mapping: {
          name: "$.name",
          addresses: {
            type: "array",
            path: "$.addresses",
            mapping: {
              street: "$.street",
              city: "$.city",
              state: "$.state",
              zip: "$.zip"
            }
          }
        }
      };

      inputFile = {
        data: [
          {
            name: "John Doe",
            addresses: [
              {
                street: "123 Main st",
                city: "Anytown",
                state: "CA",
                zip: "12345",
                zip4: "6789"
              },
              {
                street: "456 Main st",
                city: "Anytown",
                state: "CA",
                zip: "12345",
                zip4: "6789"
              }
            ]
          },
          {
            name: "Jane Doe",
            addresses: [
              {
                street: "123 Main st",
                city: "Anytown",
                state: "CA",
                zip: "12345",
                zip4: "6789"
              },
              {
                street: "456 Main st",
                city: "Anytown",
                state: "CA",
                zip: "12345",
                zip4: "6789"
              }
            ]
          }
        ]
      };

      adapter = new AdapterFactory();
      output = await adapter
        .get("json")
        .adapt(JSON.stringify(inputFile), mappingConfig.root, mappingConfig.mapping, transformerFactory);
    });

    it("should output an array with name and age", () => {
      expect(output).toEqual([
        {
          name: "John Doe",
          addresses: [
            {
              street: "123 Main st",
              city: "Anytown",
              state: "CA",
              zip: "12345"
            },
            {
              street: "456 Main st",
              city: "Anytown",
              state: "CA",
              zip: "12345"
            }
          ]
        },
        {
          name: "Jane Doe",
          addresses: [
            {
              street: "123 Main st",
              city: "Anytown",
              state: "CA",
              zip: "12345"
            },
            {
              street: "456 Main st",
              city: "Anytown",
              state: "CA",
              zip: "12345"
            }
          ]
        }
      ]);
    });
  });

  describe("JSON using date transformer", () => {
    beforeAll(async () => {
      mappingConfig = {
        transformers: {
          DATE: {
            type: "date",
            format: "MM/DD/YYYY"
          }
        },
        root: {
          path: "$.data"
        },
        mapping: {
          name: "$.name",
          birthdate: {
            path: "$.birthday",
            transformer: "DATE"
          }
        }
      };

      inputFile = {
        data: [
          {
            name: "John Doe",
            birthday: "1996-04-10"
          },
          {
            name: "Jane Doe",
            birthday: "1991-02-14"
          }
        ]
      };

      transformerFactory = new TransformerFactory();
      transformerFactory.register("DATE", new DateTransformer(mappingConfig.transformers.DATE));

      adapter = new AdapterFactory();
      output = await adapter
        .get("json")
        .adapt(JSON.stringify(inputFile), mappingConfig.root, mappingConfig.mapping, transformerFactory);
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

  describe("when value is an array", () => {
    beforeAll(async () => {
      mappingConfig = {
        root: {
          path: "$.data"
        },
        mapping: {
          name: "$.name",
          age: "$.age"
        }
      };

      inputFile = {
        data: [
          {
            name: "John Doe",
            age: [20, 21, 22]
          },
          {
            name: "Jane Doe",
            age: [23, 24, 25]
          }
        ]
      };

      adapter = new AdapterFactory();
      output = await adapter
        .get("json")
        .adapt(JSON.stringify(inputFile), mappingConfig.root, mappingConfig.mapping, transformerFactory);
    });

    it("should output an array with name and age", () => {
      expect(output).toEqual([
        {
          name: "John Doe",
          age: "20, 21, 22"
        },
        {
          name: "Jane Doe",
          age: "23, 24, 25"
        }
      ]);
    });
  });
});
