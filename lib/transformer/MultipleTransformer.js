class MultipleTransformer {
  constructor(transformers) {
    this.transformers = transformers;
  }

  transform(value) {
    return this.transformers.reduce((value, transformer) => {
      return transformer.transform(value);
    }, value);
  }
}

module.exports = MultipleTransformer;
