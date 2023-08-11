const { v4: uuid } = require("uuid");
const jsonata = require("jsonata");

class ExpressionProcessor {
  async evaluate(expression, object) {
    if (expression === "uuid()") {
      return uuid();
    }

    const jsonExpression = jsonata(expression);
    return await jsonExpression.evaluate(object);
  }
}

module.exports = ExpressionProcessor;
