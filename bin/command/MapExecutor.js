const { Transform } = require("stream");
const AdapterFactory = require("../../lib/adapter/AdapterFactory");
const TransformerFactory = require("../../lib/transformer/TransformerFactory");
const TRANSFORMER_TYPES = require("../util/TransformerTypes");
const { readStdIn } = require("../../lib/Input");

async function mapExecutor(config) {
  
  const stream = config.stream;
  const format = config.format;

  const transformerFactory = TransformerFactory.load(config, TRANSFORMER_TYPES);

  const adapterFactory = new AdapterFactory();
  const adapter = adapterFactory.get(format, config);

  const onError = e => {
    console.error(e.message.red);
    process.exit(1);
  };

  if (stream) {
    const parser = await adapter.stream(config.root?.path, config);
    const adapterTransformer = new AdapterTransformer(adapter, config, transformerFactory);
    process.stdin
      .pipe(parser)
      .on("error", onError)
      .pipe(adapterTransformer)
      .on("error", onError)
      .pipe(process.stdout)
      .on("error", onError);
    return;
  }

  try {
    const inputString = await readStdIn();
    const output = await adapter.adapt(inputString, config.root, config.mapping, transformerFactory, config);
    console.log(JSON.stringify(output, null, 2));
  } catch (e) {
    console.error(e.message.red);
  }
}

class AdapterTransformer extends Transform {
  constructor(adapter, mapping, transformerFactory) {
    super({ objectMode: true, readableObjectMode: true, writableObjectMode: true });
    this.adapter = adapter;
    this.mapping = mapping;
    this.transformerFactory = transformerFactory;
  }

  _transform(chunk, _, callback) {
    this.adapter
      .adapt(chunk, undefined, this.mapping.mapping, this.transformerFactory)
      .then(output => callback(null, JSON.stringify(output, null, 2)));
  }
}

module.exports = { mapExecutor };
