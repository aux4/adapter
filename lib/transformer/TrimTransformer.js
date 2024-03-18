class TrimTransformer {
  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    return value.trim();
  }
}

module.exports = TrimTransformer;
