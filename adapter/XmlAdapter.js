const { Parser } = require("xml2js");
const xpath = require("xml2js-xpath");

function XmlAdapter() {
  return {
    parse: async rawData => {
      const parser = new Parser({});
      return await parser.parseStringPromise(rawData);
    },

    getRoot: (xml, path, type) => {
      if (path) {
        const nodes = xpath.find(xml, path);
        if (type === "object") {
          return nodes[0];
        }
        return nodes;
      }
      return xml;
    },

    getValue: (xml, path, type) => {
      const nodes = xpath.find(xml, path);
      return type !== "array" && nodes.length === 1 ? nodes[0] : nodes;
    }
  };
}

module.exports = XmlAdapter;
