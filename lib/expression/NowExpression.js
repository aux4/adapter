const moment = require("moment");

class NowExpression {
  canHandle(expression) {
    return expression === "now()";
  }

  async execute() {
    return moment().format();
  }
}

module.exports = NowExpression;
