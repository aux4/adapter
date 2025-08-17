# Transformers

## Default

### Basic transformation
- should return value unchanged with `default` transformer

```file:config.yaml
config:
  default-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: default
      city:
        path: $.city
        transformer: default
```

```execute
cat transformer-data.json | aux4 adapter map --config default-test | jq .
```

```expect
{
  "name": "John",
  "city": "New York"
}
```

### Null/undefined values
- should handle null values with `default` transformer

```file:config.yaml
config:
  default-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: default
      city:
        path: $.city
        transformer: default
```

```execute
cat transformer-null-data.json | aux4 adapter map --config default-test | jq .
```

```expect
{}
```

## Lowercase

### Basic string conversion
- should convert string to lowercase with `lowercase` transformer

```file:config.yaml
config:
  lowercase-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: lowercase
      city:
        path: $.city
        transformer: lowercase
```

```execute
cat transformer-uppercase-data.json | aux4 adapter map --config lowercase-test | jq .
```

```expect
{
  "name": "john doe",
  "city": "new york"
}
```

### Mixed case conversion
- should convert mixed case string to lowercase

```file:config.yaml
config:
  mixed-lowercase-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: lowercase
      status:
        path: $.status
        transformer: lowercase
```

```execute
cat transformer-mixed-data.json | aux4 adapter map --config mixed-lowercase-test | jq .
```

```expect
{
  "name": "john doe",
  "status": "active"
}
```

### Number conversion
- should convert number to lowercase string

```file:config.yaml
config:
  number-lowercase-test:
    format: json
    mapping:
      code:
        path: $.code
        transformer: lowercase
      id:
        path: $.id
        transformer: lowercase
```

```execute
cat transformer-number-data.json | aux4 adapter map --config number-lowercase-test | jq .
```

```expect
{
  "code": "123",
  "id": "456"
}
```

### Empty/null values
- should handle empty and null values with `lowercase` transformer

```file:config.yaml
config:
  lowercase-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: lowercase
      city:
        path: $.city
        transformer: lowercase
```

```execute
cat transformer-null-data.json | aux4 adapter map --config lowercase-test | jq .
```

```expect
{}
```

## Uppercase

### Basic string conversion
- should convert string to uppercase with `uppercase` transformer

```file:config.yaml
config:
  uppercase-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: uppercase
      city:
        path: $.city
        transformer: uppercase
```

```execute
cat transformer-lowercase-data.json | aux4 adapter map --config uppercase-test | jq .
```

```expect
{
  "name": "JOHN DOE",
  "city": "NEW YORK"
}
```

### Mixed case conversion
- should convert mixed case string to uppercase

```file:config.yaml
config:
  mixed-uppercase-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: uppercase
      status:
        path: $.status
        transformer: uppercase
```

```execute
cat transformer-mixed-data.json | aux4 adapter map --config mixed-uppercase-test | jq .
```

```expect
{
  "name": "JOHN DOE",
  "status": "ACTIVE"
}
```

### Number conversion
- should convert number to uppercase string

```file:config.yaml
config:
  number-uppercase-test:
    format: json
    mapping:
      code:
        path: $.code
        transformer: uppercase
      id:
        path: $.id
        transformer: uppercase
```

```execute
cat transformer-number-data.json | aux4 adapter map --config number-uppercase-test | jq .
```

```expect
{
  "code": "123",
  "id": "456"
}
```

### Empty/null values
- should handle empty and null values with `uppercase` transformer

```file:config.yaml
config:
  uppercase-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: uppercase
      city:
        path: $.city
        transformer: uppercase
```

```execute
cat transformer-null-data.json | aux4 adapter map --config uppercase-test | jq .
```

```expect
{}
```

## Trim

### Leading and trailing spaces
- should remove leading and trailing whitespace with `trim` transformer

```file:config.yaml
config:
  trim-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim
      city:
        path: $.city
        transformer: trim
```

```execute
cat transformer-trim-data.json | aux4 adapter map --config trim-test | jq .
```

```expect
{
  "name": "John Doe",
  "city": "New York"
}
```

### Only leading spaces
- should remove only leading whitespace

```file:config.yaml
config:
  trim-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim
      city:
        path: $.city
        transformer: trim
```

```execute
cat transformer-trim-leading-data.json | aux4 adapter map --config trim-test | jq .
```

```expect
{
  "name": "John Doe",
  "city": "New York"
}
```

### Only trailing spaces
- should remove only trailing whitespace

```file:config.yaml
config:
  trim-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim
      city:
        path: $.city
        transformer: trim
```

```execute
cat transformer-trim-trailing-data.json | aux4 adapter map --config trim-test | jq .
```

```expect
{
  "name": "John Doe",
  "city": "New York"
}
```

### No spaces
- should leave strings without whitespace unchanged

```file:config.yaml
config:
  trim-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim
      city:
        path: $.city
        transformer: trim
```

```execute
cat transformer-no-spaces-data.json | aux4 adapter map --config trim-test | jq .
```

```expect
{
  "name": "JohnDoe",
  "city": "NewYork"
}
```

### Number conversion
- should convert number to trimmed string

```file:config.yaml
config:
  number-trim-test:
    format: json
    mapping:
      code:
        path: $.code
        transformer: trim
      id:
        path: $.id
        transformer: trim
```

```execute
cat transformer-number-data.json | aux4 adapter map --config number-trim-test | jq .
```

```expect
{
  "code": "123",
  "id": "456"
}
```

### Empty/null values
- should handle empty and null values with `trim` transformer

```file:config.yaml
config:
  trim-test:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim
      city:
        path: $.city
        transformer: trim
```

```execute
cat transformer-null-data.json | aux4 adapter map --config trim-test | jq .
```

```expect
{}
```

## Multiple (Chained Transformers)

### Trim and lowercase
- should apply trim then lowercase transformations

```file:config.yaml
config:
  multiple-trim-lowercase:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim|lowercase
      city:
        path: $.city
        transformer: trim|lowercase
```

```execute
cat transformer-multiple-trim-upper-data.json | aux4 adapter map --config multiple-trim-lowercase | jq .
```

```expect
{
  "name": "john doe",
  "city": "new york"
}
```

### Trim and uppercase
- should apply trim then uppercase transformations

```file:config.yaml
config:
  multiple-trim-uppercase:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim|uppercase
      city:
        path: $.city
        transformer: trim|uppercase
```

```execute
cat transformer-trim-data.json | aux4 adapter map --config multiple-trim-uppercase | jq .
```

```expect
{
  "name": "JOHN DOE",
  "city": "NEW YORK"
}
```

### Three transformations
- should apply multiple transformations in sequence

```file:config.yaml
config:
  multiple-complex:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim|uppercase|lowercase
      status:
        path: $.status
        transformer: trim|lowercase|uppercase
```

```execute
cat transformer-multiple-complex-data.json | aux4 adapter map --config multiple-complex | jq .
```

```expect
{
  "name": "john doe",
  "status": "ACTIVE"
}
```

### Empty/null values with multiple transformers
- should handle empty and null values with multiple transformers

```file:config.yaml
config:
  multiple-trim-lowercase:
    format: json
    mapping:
      name:
        path: $.name
        transformer: trim|lowercase
      city:
        path: $.city
        transformer: trim|lowercase
```

```execute
cat transformer-null-data.json | aux4 adapter map --config multiple-trim-lowercase | jq .
```

```expect
{}
```