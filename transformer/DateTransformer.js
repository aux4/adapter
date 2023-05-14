const moment = require("moment");

function DateTransformer(mapping = {}) {
  return {
    transform: value => moment(value, mapping.pattern).format(mapping.format || "YYYY-MM-DD HH:mm:ss Z")
  };
}

module.exports = DateTransformer;
