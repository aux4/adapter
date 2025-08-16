#!/usr/bin/env node

const colors = require("colors");
const { mapExecutor } = require("./command/MapExecutor.js");

process.title = "aux4-adapter";

(async () => {
  const args = process.argv.slice(2);

  try {
    const [action, format, delimiter, columns, options, transformers, mapping, stream] = args;

    if (action !== "map") {
      console.error(`Unknown action: ${action}. Expected "map".`.red);
      process.exit(1);
    }

    const baseOptions = options ? JSON.parse(options) : {};
    const config = {
      ...baseOptions,
      format: format || "",
      delimiter: delimiter || ",",
      columns: columns || "",
      transformers: transformers ? JSON.parse(transformers) : [],
      mapping: mapping ? JSON.parse(mapping) : {},
      stream: stream === "true"
    };

    await mapExecutor(config);
  } catch (e) {
    console.error(e.message.red);
    process.exit(1);
  }
})();
