const jsonpath = require("jsonpath");

function JsonAdapter() {
  return {
    parse: async rawData => JSON.parse(rawData),
    getRoot: (json, path = "$") => jsonpath.value(json, path),
    getValue: (object, path) => jsonpath.value(object, path)
  };
}

module.exports = JsonAdapter;
