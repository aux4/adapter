# Help

- should print help message

```execute
aux4 adapter --help
```

```expect
adapter
Adapt data to specific formats.

  map
  Maps the data from STDIN to a specific format.

    --format
      The format to map the value to, e.g., 'csv', 'json', 'xml'.

      Options:
      * csv
      * json
      * xml

    --delimiter [,]
      The delimiter to use for separating values in the output, if applicable.

      Default: ,

    --columns <optional>
      The columns to include in the output, if applicable.

    --options [{}]
      Additional options for the mapping process.

      Default: {}

    --transformers [[]]
      The JSON transformers to apply to the value before mapping.

      Default: []

    --mapping [{}]
      The JSON mapping configuration to use.

      Default: {}

    --stream [false]
      Output stream to write the mapped value to.

      Default: false
```
