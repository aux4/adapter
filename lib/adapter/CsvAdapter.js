const { parse: streamParse } = require("csv-parse");
const { parse } = require("csv-parse/sync");
const jsonpath = require("jsonpath");

class CsvAdapter {
  async parse(rawData, params) {
    if (typeof rawData === "object") {
      return rawData;
    }

    const delimiter = await params.delimiter;

    let columns = true;
    const columnNames = await params.columns;
    if (columnNames) {
      columns = columnNames.split(",");
    }

    return parse(rawData, { delimiter, columns, skip_empty_lines: true });
  }

  async stream(path, params) {
    const delimiter = await params.delimiter;

    let columns = true;
    const columnNames = await params.columns;
    if (columnNames) {
      columns = columnNames.split(",");
    }

    return streamParse({ delimiter, columns, skip_empty_lines: true });
  }

  getRoot(rows) {
    return rows;
  }

  getValue(row, path) {
    return jsonpath.value(row, path);
  }
}

module.exports = CsvAdapter;
