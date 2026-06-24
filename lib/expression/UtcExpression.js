const moment = require("moment");

class UtcExpression {
  canHandle(expression) {
    return expression === "utc()";
  }

  async execute() {
    return moment().utc().format();
  }
}

module.exports = UtcExpression;
