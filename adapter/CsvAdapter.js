const { parse } = require("csv-parse/sync");
const jsonpath = require("jsonpath");

function CsvAdapter() {
  return {
    parse: async rawData => parse(rawData, { columns: true, skip_empty_lines: true }),
    getRoot: rows => rows,
    getValue: (row, path) => jsonpath.value(row, path)
  };
}

module.exports = CsvAdapter;
