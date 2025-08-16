class TrimTransformer {
  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    return typeof value === 'string' ? value.trim() : String(value).trim();
  }
}

module.exports = TrimTransformer;
