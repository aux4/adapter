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

  register(format, adapter) {
    this.adapters[format] = adapter;
  }

  get(format) {
    const Adapter = this.adapters[format];
    if (!Adapter) {
      throw new Error(`Unsupported format: ${format}`);
    }
    return new AdapterWrapper(new Adapter());
  }
}

class AdapterWrapper {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async stream(path = "$", params) {
    return await this.adapter.stream(path, params);
  }

  async adapt(rawData, root, responseMapping, transformerFactory, params) {
    return await adapt(this.adapter, rawData, root, responseMapping, transformerFactory, params);
  }
}

module.exports = AdapterFactory;
