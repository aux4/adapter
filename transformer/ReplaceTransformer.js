function ReplaceTransformer(mapping) {
  return {
    transform: value => {
      if (!value) return value;

      return (mapping.replace || {})[value] || mapping.defaultValue;
    }
  };
}

module.exports = ReplaceTransformer;
