class UppercaseTransformer {
  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    return typeof value === 'string' ? value.toUpperCase() : String(value).toUpperCase();
  }
}

module.exports = UppercaseTransformer;
