const { DateTransformer, ReplaceTransformer } = require("../../lib/transformer");

const TRANSFORMER_TYPES = {
  date: DateTransformer,
  replace: ReplaceTransformer
};

module.exports = TRANSFORMER_TYPES;
