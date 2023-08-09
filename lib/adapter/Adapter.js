const jsonata = require("jsonata");

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
    let path, type, transformer, expression;

    if (typeof value === "object") {
      path = value.path;
      type = value.type;
      transformer = value.transformer;
      expression = value.expr;
    } else {
      path = value;
    }

    if (expression) {
      const jsonExpression = jsonata(expression);
      response[key] = await jsonExpression.evaluate(object);
      continue;
    }

    let fieldValue;

    if (path) {
      fieldValue = adapter.getValue(object, path, type);
    } else if (type === "object") {
      fieldValue = await adaptObject(adapter, object, value.mapping, transformerFactory);
    }

    if (transformer) {
      fieldValue = transformerFactory.get(transformer).transform(fieldValue);
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

    if (fieldValue !== undefined) {
      response[key] = fieldValue;
    }
  }

  return response;
}

module.exports = { adapt };
