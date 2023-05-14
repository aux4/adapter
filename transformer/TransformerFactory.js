const DefaultTransformer = require("./DefaultTransformer");

function TransformerFactory() {
  const transformers = {
    default: new DefaultTransformer()
  };

  return {
    register: (name, transformer) => {
      transformers[name] = transformer;
    },

    get: type => {
      return transformers[type] || transformers.default;
    }
  };
}

module.exports = TransformerFactory;
