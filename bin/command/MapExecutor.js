const { Transform } = require("stream");
const AdapterFactory = require("../../lib/adapter/AdapterFactory");
const TransformerFactory = require("../../lib/transformer/TransformerFactory");
const TRANSFORMER_TYPES = require("../util/TransformerTypes");
const { readStdIn } = require("../../lib/Input");
const { adaptStream } = require("../../lib/adapter/Adapter");

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

  // Use streaming for CSV format by default to avoid memory issues
  const useStreaming = stream || format === 'csv';

  if (useStreaming) {
    const parser = await adapter.stream(config.root?.path, config);
    const adapterTransformer = new AdapterTransformer(adapter, config, transformerFactory, stream);
    
    if (!stream) {
      // Start JSON array output
      process.stdout.write('[');
    }
    
    process.stdin
      .pipe(parser)
      .on("error", onError)
      .pipe(adapterTransformer)
      .on("error", onError)
      .on('end', () => {
        if (!stream) {
          // Close JSON array
          process.stdout.write(']\n');
        }
      })
      .pipe(process.stdout, { end: false })
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
  constructor(adapter, mapping, transformerFactory, streamMode = false) {
    super({ objectMode: true, readableObjectMode: false, writableObjectMode: true });
    this.adapter = adapter;
    this.mapping = mapping;
    this.transformerFactory = transformerFactory;
    this.streamMode = streamMode;
    this.isFirst = true;
    this.batch = [];
    this.batchSize = 100; // Process in batches for better performance
  }

  async _processBatch() {
    if (this.batch.length === 0) return;
    
    const results = await Promise.all(
      this.batch.map(chunk => adaptStream(this.adapter, chunk, this.mapping.mapping, this.transformerFactory))
    );
    
    if (this.streamMode) {
      // Stream mode: output each item individually
      const jsonOutputs = results.map(output => `${JSON.stringify(output)}\n`);
      this.push(jsonOutputs.join(''));
    } else {
      // Array mode: output as compact JSON array items
      const jsonOutputs = results.map((output, index) => {
        if (this.isFirst && index === 0) {
          this.isFirst = false;
          return JSON.stringify(output);
        }
        return `,${JSON.stringify(output)}`;
      });
      this.push(jsonOutputs.join(''));
    }
    
    this.batch = [];
  }

  _transform(chunk, _, callback) {
    this.batch.push(chunk);
    
    if (this.batch.length >= this.batchSize) {
      this._processBatch()
        .then(() => callback())
        .catch(err => callback(err));
    } else {
      callback();
    }
  }

  _flush(callback) {
    // Process any remaining items in the batch
    this._processBatch()
      .then(() => callback())
      .catch(err => callback(err));
  }
}

module.exports = { mapExecutor };
