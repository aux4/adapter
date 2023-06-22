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
}

module.exports = TransformerFactory;
