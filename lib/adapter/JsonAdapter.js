const jsonpath = require("../JsonPath");
const JSONStream = require("JSONStream");

class JsonAdapter {
  async parse(rawData) {
    if (typeof rawData === "object") {
      return rawData;
    }
    return JSON.parse(rawData);
  }

  async stream(path = "$") {
    return JSONStream.parse(path.replace("$.", ""));
  }

  getRoot(json, path = "$") {
    return jsonpath.value(json, path);
  }

  getValue(object, path) {
    return jsonpath.value(object, path);
  }
}

module.exports = JsonAdapter;
