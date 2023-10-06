const DefaultTransformer = require("./DefaultTransformer");
const LowercaseTransformer = require("./LowercaseTransformer");
const UppercaseTransformer = require("./UppercaseTransformer");
const MultipleTransformer = require("./MultipleTransformer");
const TrimTransformer = require("./TrimTransformer");

class TransformerFactory {
  constructor() {
    this.transformers = {
      default: new DefaultTransformer(),
      lowercase: new LowercaseTransformer(),
      uppercase: new UppercaseTransformer(),
      trim: new TrimTransformer()
    };
  }
  register(name, transformer) {
    this.transformers[name] = transformer;
  }

  get(type) {
    if (type.includes("|")) {
      const transformerTypes = type.split("|");
      const transformers = transformerTypes
        .map(transformerType => this.transformers[transformerType])
        .filter(transformer => transformer !== undefined);

      if (transformers.length === 0) {
        return this.transformers.default;
      } else if (transformers.length === 1) {
        return transformers[0];
      }

      return new MultipleTransformer(transformers);
    }

    return this.transformers[type] || this.transformers.default;
  }

  static load(config, transformerTypes = {}) {
    const transformerFactory = new TransformerFactory();

    Object.entries(config.transformers || {}).forEach(([name, transformerReference]) => {
      const TransformerType = transformerTypes[transformerReference.type];
      if (!TransformerType) {
        throw new Error(`Invalid transformer type: ${transformerReference.type}`);
      }
      transformerFactory.register(name, new TransformerType(transformerReference));
    });

    return transformerFactory;
  }
}

module.exports = TransformerFactory;
