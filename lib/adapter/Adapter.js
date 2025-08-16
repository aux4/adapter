const ExpressionProcessor = require("../ExpressionProcessor");
const UuidExpression = require("../expression/UuidExpression");
const NowExpression = require("../expression/NowExpression");
const TimeExpression = require("../expression/TimeExpression");
const JsonataExpression = require("../expression/JsonataExpression");

const JSONPATH_REGEX = /\$(\[\d+])?(\.[a-zA-Z0-9-_$]+(\[\d+])?)*/g;

// Cache for compiled mappings to avoid repeated parsing
const compiledMappingCache = new Map();

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

// Pre-compile mapping configuration for performance
function compileMappingConfig(responseMapping) {
  const cacheKey = JSON.stringify(responseMapping);
  if (compiledMappingCache.has(cacheKey)) {
    return compiledMappingCache.get(cacheKey);
  }

  const compiled = [];
  for (const [key, value] of Object.entries(responseMapping)) {
    let config;
    if (typeof value === "object") {
      config = {
        key,
        path: value.path,
        type: value.type,
        defaultValue: value.default,
        text: value.text,
        transformer: value.transformer,
        expression: value.expr,
        mapping: value.mapping
      };
    } else {
      config = { key, path: value };
    }
    compiled.push(config);
  }
  
  compiledMappingCache.set(cacheKey, compiled);
  return compiled;
}

async function adaptObject(adapter, object, responseMapping, transformerFactory) {
  const response = {};
  
  const compiledMapping = compileMappingConfig(responseMapping);

  // Optimize: Use for loop instead of for...of for better performance
  for (let i = 0; i < compiledMapping.length; i++) {
    const config = compiledMapping[i];
    const { key, path, type, defaultValue, text, transformer, expression, mapping } = config;

    if (expression) {
      response[key] = await expressionProcessor.evaluate(expression, object);
      continue;
    }

    let fieldValue;

    if (path) {
      fieldValue = adapter.getValue(object, path, type);
    } else if (text !== undefined) {
      fieldValue = text.replace(JSONPATH_REGEX, path => {
        const variableValue = adapter.getValue(object, path, type);
        if (variableValue === undefined || variableValue === null) {
          return "";
        }
        return variableValue;
      }).trim();
    } else if (type === "object") {
      fieldValue = await adaptObject(adapter, object, mapping, transformerFactory);
    }

    // Optimize: Early exit if field value is undefined and no default
    if (fieldValue === undefined && defaultValue === undefined) {
      continue;
    }

    // Apply transformer if present
    if (transformer && fieldValue !== undefined) {
      fieldValue = transformerFactory.get(transformer).transform(fieldValue);
    }

    // Optimize: Combine type conversions to avoid multiple checks
    if (fieldValue !== undefined) {
      switch (type) {
        case "number":
          fieldValue = Number(fieldValue);
          break;
        case "boolean":
          fieldValue = `${fieldValue}`.toLowerCase() === "true";
          break;
        case "array":
          if (path) {
            const array = Array.isArray(fieldValue) ? fieldValue : [fieldValue];
            fieldValue = await Promise.all(
              array.map(item => adaptObject(adapter, item, mapping, transformerFactory))
            );
          }
          break;
        case "object":
          if (path) {
            fieldValue = await adaptObject(adapter, fieldValue, mapping, transformerFactory);
          }
          break;
        default:
          if (Array.isArray(fieldValue)) {
            fieldValue = fieldValue.join(", ");
          }
      }
    }

    // Optimize: Handle empty values more efficiently
    if (fieldValue === "" || fieldValue === null) {
      fieldValue = undefined;
    }

    // Apply default value if needed
    if (fieldValue === undefined && defaultValue !== undefined) {
      fieldValue = defaultValue;
    }

    // Optimize: Skip empty objects check if not an object
    if (typeof fieldValue === "object" && fieldValue !== null && Object.keys(fieldValue).length === 0) {
      fieldValue = undefined;
    }

    // Only set field if it has a value
    if (fieldValue !== undefined) {
      response[key] = fieldValue;
    }
  }

  return response;
}

// Streaming version that works with individual chunks
async function adaptStream(adapter, chunk, responseMapping, transformerFactory) {
  // For streaming, we assume the chunk is already parsed (e.g., a single CSV row object)
  return await adaptObject(adapter, chunk, responseMapping, transformerFactory);
}

module.exports = { adapt, adaptStream };
