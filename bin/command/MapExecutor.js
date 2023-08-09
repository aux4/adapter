const { Transform } = require("stream");
const { ConfigLoader } = require("@aux4/config");
const { AdapterFactory, TransformerFactory } = require("../../index");
const TRANSFORMER_TYPES = require("../util/TransformerTypes");
const { readStdIn } = require("../../lib/Input");

async function mapExecutor(params) {
  const mapping = await loadMapping(params);
  const stream = await params.stream;
  const format = (await params.format) || mapping.format;

  const transformerFactory = TransformerFactory.load(mapping, TRANSFORMER_TYPES);

  const adapterFactory = new AdapterFactory();
  const adapter = adapterFactory.get(format);

  if (stream) {
    const parser = await adapter.stream(mapping.root?.path, params);
    const adapterTransformer = new AdapterTransformer(adapter, mapping, transformerFactory);
    process.stdin
      .pipe(parser)
      .pipe(adapterTransformer)
      .pipe(process.stdout)
      .on("error", err => {
        console.error(err.message);
      });
    return;
  }

  const inputString = await readStdIn();
  const output = await adapter.adapt(inputString, mapping.root, mapping.mapping, transformerFactory, params);
  console.log(JSON.stringify(output, null, 2));
}

class AdapterTransformer extends Transform {
  constructor(adapter, mapping, transformerFactory) {
    super({ objectMode: true, readableObjectMode: true, writableObjectMode: true });
    this.adapter = adapter;
    this.mapping = mapping;
    this.transformerFactory = transformerFactory;
  }

  _transform(chunk, encoding, callback) {
    this.adapter
      .adapt(chunk, undefined, this.mapping.mapping, this.transformerFactory)
      .then(output => callback(null, JSON.stringify(output, null, 2)));
  }
}

async function loadMapping(params) {
  const configFile = await params.configFile;
  const configName = await params.config;

  const config = ConfigLoader.load(configFile);
  return config.get(configName);
}

module.exports = { mapExecutor };
