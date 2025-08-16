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
    // Cache for compiled transformer chains to avoid repeated creation
    this.transformerCache = new Map();
    // Cache for MultipleTransformer instances to avoid recreation
    this.multipleTransformerCache = new Map();
  }
  register(name, transformer) {
    this.transformers[name] = transformer;
  }

  get(type) {
    // Check cache first for performance
    if (this.transformerCache.has(type)) {
      return this.transformerCache.get(type);
    }
    
    let transformer;
    
    if (type.includes("|")) {
      const transformerTypes = type.split("|");
      const transformers = transformerTypes
        .map(transformerType => this.transformers[transformerType])
        .filter(transformer => transformer !== undefined);

      if (transformers.length === 0) {
        transformer = this.transformers.default;
      } else if (transformers.length === 1) {
        transformer = transformers[0];
      } else {
        const multipleKey = transformerTypes.join("|");
        if (this.multipleTransformerCache.has(multipleKey)) {
          transformer = this.multipleTransformerCache.get(multipleKey);
        } else {
          transformer = new MultipleTransformer(transformers);
          this.multipleTransformerCache.set(multipleKey, transformer);
        }
      }
    } else {
      transformer = this.transformers[type] || this.transformers.default;
    }
    
    // Cache the result
    this.transformerCache.set(type, transformer);
    return transformer;
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
