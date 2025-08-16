#!/usr/bin/env node

const colors = require("colors");
const { mapExecutor } = require("./command/MapExecutor.js");

process.title = "aux4-adapter";

(async () => {
  const args = process.argv.slice(2);

  try {
    const [action, format, delimiter, columns, options, transformers, mapping] = args;

    if (action !== "map") {
      console.error(`Unknown action: ${action}. Expected "map".`.red);
      process.exit(1);
    }

    const config = {
      format: format || "",
      delimiter: delimiter || ",",
      columns: columns || "",
      options: options ? JSON.parse(options) : {},
      transformers: transformers ? JSON.parse(transformers) : [],
      mapping: mapping ? JSON.parse(mapping) : {}
    };

    await mapExecutor(config);
  } catch (e) {
    console.error(e.message.red);
    process.exit(1);
  }
})();
