class LowercaseTransformer {
  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    return value.toLowerCase();
  }
}

module.exports = LowercaseTransformer;
