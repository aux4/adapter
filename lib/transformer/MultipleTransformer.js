class MultipleTransformer {
  constructor(transformers) {
    this.transformers = transformers;
  }

  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    return this.transformers.reduce((value, transformer) => {
      return transformer.transform(value);
    }, value);
  }
}

module.exports = MultipleTransformer;
