const { Transform } = require("stream");
const { XMLParser } = require("fast-xml-parser");
const jsonpath = require("jsonpath");

class XmlAdapter {
  async parse(rawData) {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributesGroupName: "_attr",
      attributeNamePrefix: "",
      allowBooleanAttributes: true
    });
    return parser.parse(rawData);
  }

  async stream() {
    throw new Error("xml does not support streaming");
  }

  getRoot(xml, path = "$") {
    return jsonpath.value(xml, path);
  }

  getValue(xml, path) {
    return jsonpath.value(xml, path);
  }
}

module.exports = XmlAdapter;
