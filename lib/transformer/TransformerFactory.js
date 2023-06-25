const DefaultTransformer = require("./DefaultTransformer");

class TransformerFactory {
  constructor() {
    this.transformers = {
      default: new DefaultTransformer()
    };
  }
  register(name, transformer) {
    this.transformers[name] = transformer;
  }

  get(type) {
    return this.transformers[type] || this.transformers.default;
  }

  static load(mapping, transformerTypes = {}) {
    const transformerFactory = new TransformerFactory();

    Object.entries(mapping.transformers || {}).forEach(([name, transformerReference]) => {
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
