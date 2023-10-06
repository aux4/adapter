const moment = require("moment");

class TimeExpression {
  canHandle(expression) {
    return expression === "time()";
  }

  async execute() {
    return moment().unix();
  }
}

module.exports = TimeExpression;
