const { DateTransformer, ReplaceTransformer, RemoveTransformer } = require("../../lib/transformer");

const TRANSFORMER_TYPES = {
  date: DateTransformer,
  replace: ReplaceTransformer,
  remove: RemoveTransformer
};

module.exports = TRANSFORMER_TYPES;
