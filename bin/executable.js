const colors = require("colors");
const { Engine } = require("@aux4/engine");
const { mapExecutor } = require("./command/MapExecutor");

const config = {
  profiles: [
    {
      name: "main",
      commands: [
        {
          name: "map",
          execute: async params => {
            try {
              await mapExecutor(params);
            } catch (e) {
              console.error(e.message.red);
            }
          },
          help: {
            text: "Map input to output",
            variables: [
              {
                name: "configFile",
                text: "Configuration file.\nIt automatically reads *config.yaml*, *config.yml*, *config.json*.",
                default: ""
              },
              {
                name: "config",
                text: "Configuration name",
                default: ""
              },
              {
                name: "format",
                text: "Input format. Supported formats: *json*, *xml*, *csv*.",
                default: ""
              },
              {
                name: "stream",
                text: "Stream input",
                default: false
              }
            ]
          }
        }
      ]
    }
  ]
};

(async () => {
  const engine = new Engine({ aux4: config });

  const args = process.argv.splice(2);
  await engine.run(args);
})();
