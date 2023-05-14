const { adapt } = require("./Adapter");
const CsvAdapter = require("./CsvAdapter");
const JsonAdapter = require("./JsonAdapter");
const XmlAdapter = require("./XmlAdapter");

const CONTENT_TYPE_MAPPING = {
  "application/json": JsonAdapter,
  "application/xml": XmlAdapter,
  "text/csv": CsvAdapter
};

function AdapterFactory() {
  const adapters = { ...CONTENT_TYPE_MAPPING };

  return {
    register: (type, adapter) => {
      adapters[type] = adapter;
    },

    get: type => {
      const adapter = adapters[type];
      if (!adapter) {
        throw new Error("Unsupported content-type");
      }
      return new AdapterWrapper(adapter());
    }
  };
}

function AdapterWrapper(adapter) {
  return {
    adapt: async (rawData, root, responseMapping, transformerFactory) =>
      adapt(adapter, rawData, root, responseMapping, transformerFactory)
  };
}

module.exports = AdapterFactory;
