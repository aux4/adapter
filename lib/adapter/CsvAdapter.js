const { parse: streamParse } = require("csv-parse");
const { parse } = require("csv-parse/sync");
const jsonpath = require("jsonpath");

class CsvAdapter {
  async parse(rawData) {
    if (typeof rawData === "object") {
      return rawData;
    }
    return parse(rawData, { columns: true, skip_empty_lines: true });
  }

  async stream() {
    return streamParse({ columns: true, skip_empty_lines: true });
  }

  getRoot(rows) {
    return rows;
  }

  getValue(row, path) {
    return jsonpath.value(row, path);
  }
}

module.exports = CsvAdapter;
