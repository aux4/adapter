# Options

## CSV Parser Options (with --options parameter)

- should skip lines from top using `--options` parameter with from

```file:config.yaml
config:
  simple:
    format: csv
    options:
      from: 2
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      city: $.city
```

```execute
cat content.csv | aux4 adapter map --config simple
```

```expect
[{"name":"Jane","age":"29","birthdate":"1994-02-10","gender":"F"},{"name":"Dane","age":"42","birthdate":"1936-03-11","city":"Boston"}]
```
