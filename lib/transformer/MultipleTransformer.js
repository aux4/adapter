class MultipleTransformer {
  constructor(transformers) {
    this.transformers = transformers;
  }

  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    
    let currentValue = value;
    for (let i = 0; i < this.transformers.length; i++) {
      currentValue = this.transformers[i].transform(currentValue);
      if (currentValue === null || currentValue === undefined) {
        return undefined;
      }
    }
    return currentValue;
  }
}

module.exports = MultipleTransformer;
