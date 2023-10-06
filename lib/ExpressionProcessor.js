class ExpressionProcessor {
  constructor() {
    this.processors = [];
  }

  register(processor) {
    this.processors.push(processor);
  }

  async evaluate(expression, object) {
    const processor = this.processors.find(processor => processor.canHandle(expression));
    if (!processor) {
      throw new Error(`Cannot execute expression: ${expression}`);
    }
    return await processor.execute(expression, object);
  }
}

module.exports = ExpressionProcessor;
