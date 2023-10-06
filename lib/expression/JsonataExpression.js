const jsonata = require("jsonata");

class JsonataExpression {
  canHandle() {
    return true;
  }

  async execute(expression, object) {
    const jsonExpression = jsonata(expression);
    return await jsonExpression.evaluate(object);
  }
}

module.exports = JsonataExpression;
