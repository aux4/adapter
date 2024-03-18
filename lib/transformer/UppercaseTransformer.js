class UppercaseTransformer {
  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    return value.toUpperCase();
  }
}

module.exports = UppercaseTransformer;
