class RemoveTransformer {
  constructor(mapping) {
    this.mapping = mapping;
  }

  transform(value) {
    if (!value) return value;

    let newValue = value;
    this.mapping.list.forEach(item => {
      newValue = newValue.replaceAll(item, "");
    });
    return newValue;
  }
}

module.exports = RemoveTransformer;
