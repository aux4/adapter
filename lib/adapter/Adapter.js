const ExpressionProcessor = require("../ExpressionProcessor");
const UuidExpression = require("../expression/UuidExpression");
const NowExpression = require("../expression/NowExpression");
const TimeExpression = require("../expression/TimeExpression");
const JsonataExpression = require("../expression/JsonataExpression");

const JSONPATH_REGEX = /\$(\[\d+])?(\.[a-zA-Z0-9-_$]+(\[\d+])?)*/g;

const expressionProcessor = new ExpressionProcessor();
expressionProcessor.register(new UuidExpression());
expressionProcessor.register(new NowExpression());
expressionProcessor.register(new TimeExpression());
expressionProcessor.register(new JsonataExpression());

async function adapt(adapter, rawData, root = { path: "$" }, responseMapping, transformerFactory, params) {
  const json = await adapter.parse(rawData, params);
  const rootNode = adapter.getRoot(json, root.path, root.type);

  if (!rootNode || (Array.isArray(rootNode) && rootNode.length === 0)) {
    throw new Error("No data");
  }

  if (Array.isArray(rootNode)) {
    return await Promise.all(rootNode.map(item => adaptObject(adapter, item, responseMapping, transformerFactory)));
  }

  return await adaptObject(adapter, rootNode, responseMapping, transformerFactory);
}

async function adaptObject(adapter, object, responseMapping, transformerFactory) {
  const response = {};

  for (const [key, value] of Object.entries(responseMapping)) {
    let path, type, defaultValue, text, transformer, expression;

    if (typeof value === "object") {
      path = value.path;
      type = value.type;
      defaultValue = value.default;
      text = value.text;
      transformer = value.transformer;
      expression = value.expr;
    } else {
      path = value;
    }

    if (expression) {
      response[key] = await expressionProcessor.evaluate(expression, object);
      continue;
    }

    let fieldValue;

    if (path) {
      fieldValue = adapter.getValue(object, path, type);
    } else if (text !== undefined) {
      fieldValue = text.replace(JSONPATH_REGEX, path => adapter.getValue(object, path, type));
    } else if (type === "object") {
      fieldValue = await adaptObject(adapter, object, value.mapping, transformerFactory);
    }

    if (transformer) {
      fieldValue = transformerFactory.get(transformer).transform(fieldValue);
    }

    if (type === "number" && fieldValue !== undefined) {
      fieldValue = Number(fieldValue);
    } else if (type === "boolean" && fieldValue !== undefined) {
      fieldValue = `${fieldValue}`.toLowerCase() === "true";
    }

    if (path && fieldValue !== undefined) {
      if (type === "array") {
        fieldValue = await Promise.all(
          (fieldValue || []).map(item => adaptObject(adapter, item, value.mapping, transformerFactory))
        );
      } else if (type === "object") {
        fieldValue = await adaptObject(adapter, fieldValue, value.mapping, transformerFactory);
      } else if (Array.isArray(fieldValue)) {
        fieldValue = fieldValue.join(", ");
      }
    }

    if (fieldValue === "") {
      fieldValue = undefined;
    }

    if (defaultValue !== undefined && fieldValue === undefined) {
      fieldValue = defaultValue;
    }

    if (typeof fieldValue === "object" && Object.keys(fieldValue).length === 0) {
      fieldValue = undefined;
    }

    if (fieldValue !== undefined) {
      response[key] = fieldValue;
    }
  }

  return response;
}

module.exports = { adapt };
