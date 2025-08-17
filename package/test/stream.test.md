# Stream

## Stream Output (with --stream parameter)

- should stream each item in the output when using `--stream` parameter

```file:config.yaml
config:
  simple:
    format: csv
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      city: $.city
```

```execute
cat content.csv | aux4 adapter map --config simple --stream
```

```expect
{"name":"John","birthdate":"1992-04-10","gender":"M","city":"New York"}
{"name":"Jane","age":"29","birthdate":"1994-02-10","gender":"F"}
{"name":"Dane","age":"42","birthdate":"1936-03-11","city":"Boston"}
```

## Non-Stream Output (without --stream parameter)

- should output JSON array when `--stream` parameter is not used

```file:config.yaml
config:
  simple:
    format: csv
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
[{"name":"John","birthdate":"1992-04-10","gender":"M","city":"New York"},{"name":"Jane","age":"29","birthdate":"1994-02-10","gender":"F"},{"name":"Dane","age":"42","birthdate":"1936-03-11","city":"Boston"}]
```

