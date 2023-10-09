# Help

- should print help message

```execute
node ../bin/executable.js
```

```expect
  map   Map input to output
          - configFile Configuration file.
            It automatically reads config.yaml, config.yml, config.json.
          - config Configuration name
          - format Input format. Supported formats: json, xml, csv.
          - delimiter [,] CSV delimiter
          - columns CSV column names (comma separated)
          - stream Stream output
```