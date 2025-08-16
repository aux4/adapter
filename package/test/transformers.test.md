# Transformers

## Default

### Basic transformation
- should return value unchanged with `default` transformer

```execute
cat transformer-data.json | aux4 adapter map --configFile config-transformers.yaml --config default-test | jq .
```

```expect
{
  "name": "John",
  "city": "New York"
}
```

### Null/undefined values
- should handle null values with `default` transformer

```execute
cat transformer-null-data.json | aux4 adapter map --configFile config-transformers.yaml --config default-test | jq .
```

```expect
{}
```

## Lowercase

### Basic string conversion
- should convert string to lowercase with `lowercase` transformer

```execute
cat transformer-uppercase-data.json | aux4 adapter map --configFile config-transformers.yaml --config lowercase-test | jq .
```

```expect
{
  "name": "john doe",
  "city": "new york"
}
```

### Mixed case conversion
- should convert mixed case string to lowercase

```execute
cat transformer-mixed-data.json | aux4 adapter map --configFile config-transformers.yaml --config mixed-lowercase-test | jq .
```

```expect
{
  "name": "john doe",
  "status": "active"
}
```

### Number conversion
- should convert number to lowercase string

```execute
cat transformer-number-data.json | aux4 adapter map --configFile config-transformers.yaml --config number-lowercase-test | jq .
```

```expect
{
  "code": "123",
  "id": "456"
}
```

### Empty/null values
- should handle empty and null values with `lowercase` transformer

```execute
cat transformer-null-data.json | aux4 adapter map --configFile config-transformers.yaml --config lowercase-test | jq .
```

```expect
{}
```

## Uppercase

### Basic string conversion
- should convert string to uppercase with `uppercase` transformer

```execute
cat transformer-lowercase-data.json | aux4 adapter map --configFile config-transformers.yaml --config uppercase-test | jq .
```

```expect
{
  "name": "JOHN DOE",
  "city": "NEW YORK"
}
```

### Mixed case conversion
- should convert mixed case string to uppercase

```execute
cat transformer-mixed-data.json | aux4 adapter map --configFile config-transformers.yaml --config mixed-uppercase-test | jq .
```

```expect
{
  "name": "JOHN DOE",
  "status": "ACTIVE"
}
```

### Number conversion
- should convert number to uppercase string

```execute
cat transformer-number-data.json | aux4 adapter map --configFile config-transformers.yaml --config number-uppercase-test | jq .
```

```expect
{
  "code": "123",
  "id": "456"
}
```

### Empty/null values
- should handle empty and null values with `uppercase` transformer

```execute
cat transformer-null-data.json | aux4 adapter map --configFile config-transformers.yaml --config uppercase-test | jq .
```

```expect
{}
```

## Trim

### Leading and trailing spaces
- should remove leading and trailing whitespace with `trim` transformer

```execute
cat transformer-trim-data.json | aux4 adapter map --configFile config-transformers.yaml --config trim-test | jq .
```

```expect
{
  "name": "John Doe",
  "city": "New York"
}
```

### Only leading spaces
- should remove only leading whitespace

```execute
cat transformer-trim-leading-data.json | aux4 adapter map --configFile config-transformers.yaml --config trim-test | jq .
```

```expect
{
  "name": "John Doe",
  "city": "New York"
}
```

### Only trailing spaces
- should remove only trailing whitespace

```execute
cat transformer-trim-trailing-data.json | aux4 adapter map --configFile config-transformers.yaml --config trim-test | jq .
```

```expect
{
  "name": "John Doe",
  "city": "New York"
}
```

### No spaces
- should leave strings without whitespace unchanged

```execute
cat transformer-no-spaces-data.json | aux4 adapter map --configFile config-transformers.yaml --config trim-test | jq .
```

```expect
{
  "name": "JohnDoe",
  "city": "NewYork"
}
```

### Number conversion
- should convert number to trimmed string

```execute
cat transformer-number-data.json | aux4 adapter map --configFile config-transformers.yaml --config number-trim-test | jq .
```

```expect
{
  "code": "123",
  "id": "456"
}
```

### Empty/null values
- should handle empty and null values with `trim` transformer

```execute
cat transformer-null-data.json | aux4 adapter map --configFile config-transformers.yaml --config trim-test | jq .
```

```expect
{}
```

## Multiple (Chained Transformers)

### Trim and lowercase
- should apply trim then lowercase transformations

```execute
cat transformer-multiple-trim-upper-data.json | aux4 adapter map --configFile config-transformers.yaml --config multiple-trim-lowercase | jq .
```

```expect
{
  "name": "john doe",
  "city": "new york"
}
```

### Trim and uppercase
- should apply trim then uppercase transformations

```execute
cat transformer-trim-data.json | aux4 adapter map --configFile config-transformers.yaml --config multiple-trim-uppercase | jq .
```

```expect
{
  "name": "JOHN DOE",
  "city": "NEW YORK"
}
```

### Three transformations
- should apply multiple transformations in sequence

```execute
cat transformer-multiple-complex-data.json | aux4 adapter map --configFile config-transformers.yaml --config multiple-complex | jq .
```

```expect
{
  "name": "john doe",
  "status": "ACTIVE"
}
```

### Empty/null values with multiple transformers
- should handle empty and null values with multiple transformers

```execute
cat transformer-null-data.json | aux4 adapter map --configFile config-transformers.yaml --config multiple-trim-lowercase | jq .
```

```expect
{}
```