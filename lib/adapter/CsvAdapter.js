const { parse: streamParse } = require("csv-parse");
const { parse } = require("csv-parse/sync");
const jsonpath = require("jsonpath");

class CsvAdapter {
  constructor(config = {}) {
    this.config = config;
  }

  async parse(rawData, params) {
    if (typeof rawData === "object") {
      return rawData;
    }

    const options = await createOptions(this.config, params);
    return parse(rawData, options);
  }

  async stream(path, params) {
    const options = await createOptions(this.config, params);
    return streamParse(options);
  }

  getRoot(rows) {
    return rows;
  }

  getValue(row, path) {
    return jsonpath.value(row, path);
  }
}

async function createOptions(config, params) {
  const delimiter = config.delimiter || (await params.delimiter);
  const escape = config.escape || "\\";
  const relaxQuotes = config.relaxQuotes !== undefined ? config.relaxQuotes : true;
  const trim = config.trim !== undefined ? config.trim : true;

  let columns = true;
  const columnNames = config.columns || (await params.columns);
  if (columnNames) {
    columns = columnNames.split(",");
  }

  return { delimiter, columns, escape, trim, relax_quotes: relaxQuotes, skip_empty_lines: true };
}

module.exports = CsvAdapter;
