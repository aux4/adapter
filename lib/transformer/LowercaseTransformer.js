class LowercaseTransformer {
  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    return typeof value === 'string' ? value.toLowerCase() : String(value).toLowerCase();
  }
}

module.exports = LowercaseTransformer;
