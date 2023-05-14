async function adapt(adapter, rawData, root, responseMapping, transformerFactory) {
  const json = await adapter.parse(rawData);
  const rootNode = adapter.getRoot(json, root.path, root.type);

  if (!rootNode || (Array.isArray(rootNode) && rootNode.length === 0)) {
    throw new Error("No data");
  }

  if (Array.isArray(rootNode)) {
    return rootNode.map(item => adaptObject(adapter, item, responseMapping, transformerFactory));
  }

  return adaptObject(adapter, rootNode, responseMapping, transformerFactory);
}

function adaptObject(adapter, object, responseMapping, transformerFactory) {
  const response = {};

  Object.entries(responseMapping).map(([key, value]) => {
    let path, type, transformer;

    if (typeof value === "object") {
      path = value.path;
      type = value.type;
      transformer = value.transformer;
    } else {
      path = value;
    }

    let fieldValue;

    if (path) {
      fieldValue = adapter.getValue(object, path, type);
    } else if (type === "object") {
      fieldValue = adaptObject(adapter, object, value.mapping, transformerFactory);
    }

    if (transformer) {
      fieldValue = transformerFactory.get(transformer).transform(fieldValue);
    }

    if (path && fieldValue !== undefined) {
      if (type === "array") {
        fieldValue = (fieldValue || []).map(item => adaptObject(adapter, item, value.mapping, transformerFactory));
      } else if (type === "object") {
        fieldValue = adaptObject(adapter, fieldValue, value.mapping, transformerFactory);
      } else if (Array.isArray(fieldValue)) {
        fieldValue = fieldValue.join(", ");
      }
    }

    if (fieldValue !== undefined) {
      response[key] = fieldValue;
    }
  });

  return response;
}

module.exports = { adapt };
