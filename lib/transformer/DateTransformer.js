const moment = require("moment");

class DateTransformer {
  constructor(mapping = {}) {
    this.mapping = mapping;
  }

  transform(value) {
    if (value === null || value === undefined || value === "") {
      return undefined;
    }
    return moment(value, this.mapping.pattern || "YYYY-MM-DD'T'HH:mm:ss").format(
      this.mapping.format || "YYYY-MM-DD HH:mm:ss Z"
    );
  }
}

module.exports = DateTransformer;
