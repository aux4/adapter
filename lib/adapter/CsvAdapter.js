const { parse } = require("csv-parse/sync");
const jsonpath = require("jsonpath");

class CsvAdapter {
  async parse(rawData) {
    return parse(rawData, { columns: true, skip_empty_lines: true });
  }

  getRoot(rows) {
    return rows;
  }

  getValue(row, path) {
    return jsonpath.value(row, path);
  }
}

module.exports = CsvAdapter;
