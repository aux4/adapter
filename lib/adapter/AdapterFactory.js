const { adapt } = require("./Adapter");
const CsvAdapter = require("./CsvAdapter");
const JsonAdapter = require("./JsonAdapter");
const XmlAdapter = require("./XmlAdapter");

const CONTENT_TYPE_MAPPING = {
  json: JsonAdapter,
  xml: XmlAdapter,
  csv: CsvAdapter
};

class AdapterFactory {
  constructor() {
    this.adapters = { ...CONTENT_TYPE_MAPPING };
  }

  register(type, adapter) {
    this.adapters[type] = adapter;
  }

  get(type) {
    const Adapter = this.adapters[type];
    if (!Adapter) {
      throw new Error("Unsupported type");
    }
    return new AdapterWrapper(new Adapter());
  }
}

class AdapterWrapper {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async adapt(rawData, root, responseMapping, transformerFactory) {
    return await adapt(this.adapter, rawData, root, responseMapping, transformerFactory);
  }
}

module.exports = AdapterFactory;
