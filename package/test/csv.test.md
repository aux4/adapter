# CSV

## Simple (comma separated)

- should parse a CSV file with `simple` configuration

```execute
cat content.csv | aux4 adapter map --configFile config-csv.yaml --config simple | jq .
```

```expect
[
  {
    "name": "John",
    "birthdate": "1992-04-10",
    "gender": "M",
    "city": "New York"
  },
  {
    "name": "Jane",
    "age": "29",
    "birthdate": "1994-02-10",
    "gender": "F"
  },
  {
    "name": "Dane",
    "age": "42",
    "birthdate": "1936-03-11",
    "city": "Boston"
  }
]
```

## Pipe (pipe separated)

- should parse a CSV file with `pipe` configuration

```execute
cat content-pipe.csv | aux4 adapter map --configFile config-csv.yaml --config pipe | jq .
```

```expect
[
  {
    "name": "John",
    "age": "31",
    "birthdate": "1992-04-10",
    "gender": "M",
    "city": "New York \"City\""
  },
  {
    "name": "Jane",
    "age": "29",
    "birthdate": "1994-02-10",
    "gender": "F",
    "city": "Boston"
  }
]
```

## No Header (comma separated without column names)

- should parse a CSV file without column names with `no-header` configuration

```execute
cat content-no-columns.csv | aux4 adapter map --configFile config-csv.yaml --config no-header | jq .
```

```expect
[
  {
    "name": "John",
    "age": "31",
    "birthdate": "1992-04-10",
    "gender": "M",
    "city": "New York"
  },
  {
    "name": "Jane",
    "age": "29",
    "birthdate": "1994-02-10",
    "gender": "F",
    "city": "Boston"
  }
]
```

## Nested (comma separated)

- should parse a CSV file with a `nested` configuration

```execute
cat content.csv | aux4 adapter map --configFile config-csv.yaml --config nested | jq .
```

```expect
[
  {
    "name": "John",
    "birthdate": "1992-04-10",
    "gender": "M",
    "place": {
      "city": "New York"
    }
  },
  {
    "name": "Jane",
    "age": "29",
    "birthdate": "1994-02-10",
    "gender": "F"
  },
  {
    "name": "Dane",
    "age": "42",
    "birthdate": "1936-03-11",
    "place": {
      "city": "Boston"
    }
  }
]
```
