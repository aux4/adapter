const { v4: uuid } = require("uuid");

class UuidExpression {
  canHandle(expression) {
    return expression === "uuid()";
  }

  async execute() {
    return uuid();
  }
}

module.exports = UuidExpression;
