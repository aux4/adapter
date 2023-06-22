const jsonpath = require("jsonpath");
const JSONStream = require("JSONStream");

class JsonAdapter {
  async parse( rawData) {
    return JSON.parse(rawData);
  }

  getRoot(json, path = "$") {
    return jsonpath.value(json, path);
  }

  getValue(object, path) {
    return jsonpath.value(object, path);
  }
}

module.exports = JsonAdapter;
