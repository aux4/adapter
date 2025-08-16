const moment = require("moment");

class DateTransformer {
  constructor(mapping = {}) {
    this.mapping = mapping;
    this.inputPattern = this.mapping.pattern || "YYYY-MM-DD'T'HH:mm:ss";
    this.outputFormat = this.mapping.format || "YYYY-MM-DD HH:mm:ss Z";
    this.momentCache = new Map();
  }

  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    
    const cacheKey = `${value}:${this.inputPattern}:${this.outputFormat}`;
    if (this.momentCache.has(cacheKey)) {
      return this.momentCache.get(cacheKey);
    }
    
    const result = moment(value, this.inputPattern).format(this.outputFormat);
    
    if (this.momentCache.size > 1000) {
      this.momentCache.clear();
    }
    this.momentCache.set(cacheKey, result);
    
    return result;
  }
}

module.exports = DateTransformer;
