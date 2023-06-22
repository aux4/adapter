#!/usr/bin/env node

process.stdin.setEncoding("utf8");

const fs = require("fs");
const yaml = require("js-yaml");
const { readStdIn } = require("../lib/Input");
const { Config } = require("@aux4/config");
const { Engine } = require("@aux4/engine");
const { AdapterFactory, TransformerFactory } = require("../index");
const { ReplaceTransformer, DateTransformer } = require("../lib/transformer");

const args = process.argv.splice(2);

const TRANSFORMER_TYPES = {
  date: DateTransformer,
  replace: ReplaceTransformer
};

(async () => {
  const filePath = args[0];
  const format = SUPPORTED_FORMATS[args[1] || "json"];

  const config = fs.readFileSync(filePath, { encoding: "utf8" });
  const mapping = loadMapping(config);

  const transformerFactory = new TransformerFactory();

  Object.entries(mapping.transformers || {}).forEach(([name, transformerReference]) => {
    const TransformerType = TRANSFORMER_TYPES[transformerReference.type];
    if (!TransformerType) {
      console.error(`Invalid transformer type: ${transformerReference.type}`);
      process.exit(1);
    }
    transformerFactory.register(name, TransformerType(transformerReference));
  });

  const inputString = await readStdIn();

  try {
    const adapterFactory = new AdapterFactory();
    const adapter = adapterFactory.get(format);
    const output = await adapter.adapt(inputString, mapping.root, mapping.mapping, transformerFactory);

    console.log(JSON.stringify(output, null, 2));
  } catch (e) {
    console.error(e.message, e);
    process.exit(1);
  }
})();

function loadMapping(config) {
  if (config.trim().startsWith("{")) {
    try {
      return JSON.parse(mapping);
    } catch (e) {
      console.error(`Invalid JSON file: ${e.message}`);
      process.exit(1);
    }
  }

  try {
    return yaml.load(config, "utf8");
  } catch (e) {
    console.error(`Invalid YAML file: ${e.message}`);
    process.exit(1);
  }
}
