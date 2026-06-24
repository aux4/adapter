# Expression Mappings

This test suite covers the built-in `expr:` expressions (`uuid()`, `now()`, `time()`, `utc()`)
and arbitrary JSONata expressions for computed fields.

## uuid() generates a sortable v7 UUID

**Test Case:** The `uuid()` expression returns a time-ordered version 7 UUID.

- Purpose: Verify `expr: uuid()` produces a valid v7 UUID (the version nibble is `7`).

```file:config.yaml
config:
  uuid-test:
    format: json
    mapping:
      id:
        expr: uuid()
      name: $.name
```

```execute
echo '{"name":"John"}' | aux4 adapter map --config uuid-test
```

```expect:regex
"id": *?"[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"
```

## now() returns the current local timestamp

**Test Case:** The `now()` expression returns an ISO-8601 timestamp with the local offset.

```file:config.yaml
config:
  now-test:
    format: json
    mapping:
      timestamp:
        expr: now()
      name: $.name
```

```execute
echo '{"name":"John"}' | aux4 adapter map --config now-test
```

```expect:regex
"timestamp": *?"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(Z|[+-]\d{2}:\d{2})"
```

## time() returns the current Unix timestamp

**Test Case:** The `time()` expression returns the current time in seconds since the epoch.

```file:config.yaml
config:
  time-test:
    format: json
    mapping:
      epoch:
        expr: time()
      name: $.name
```

```execute
echo '{"name":"John"}' | aux4 adapter map --config time-test
```

```expect:regex
"epoch": *?\d{10}
```

## utc() returns the current UTC timestamp

**Test Case:** The `utc()` expression returns an ISO-8601 timestamp in UTC (the `Z` form).

```file:config.yaml
config:
  utc-test:
    format: json
    mapping:
      timestamp:
        expr: utc()
      name: $.name
```

```execute
echo '{"name":"John"}' | aux4 adapter map --config utc-test
```

```expect:regex
"timestamp": *?"\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z"
```

## JSONata computed field

**Test Case:** An arbitrary JSONata expression concatenates two fields.

- Purpose: Verify `expr` falls through to JSONata for non built-in expressions.

```file:config.yaml
config:
  jsonata-test:
    format: json
    mapping:
      fullName:
        expr: "firstName & ' ' & lastName"
```

```execute
echo '{"firstName":"John","lastName":"Doe"}' | aux4 adapter map --config jsonata-test | jq .
```

```expect
{
  "fullName": "John Doe"
}
```
