class ReplaceTransformer {
  constructor(mapping) {
    this.mapping = mapping;
  }

  transform(value) {
    if (!value) return value;
    return (this.mapping.replace || {})[value] || this.mapping.defaultValue;
  }
}

module.exports = ReplaceTransformer;
