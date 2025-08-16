# JSON

## Simple Object

- should parse a simple JSON object with `simple` configuration

```execute
cat json-simple.json | aux4 adapter map --configFile config-json.yaml --config simple | jq .
```

```expect
{
  "name": "John",
  "age": 31,
  "birthdate": "1992-04-10",
  "gender": "M",
  "city": "New York"
}
```

## Array Processing

- should process JSON array with `array` configuration

```execute
cat json-array.json | aux4 adapter map --configFile config-json.yaml --config array | jq .
```

```expect
[
  {
    "name": "John",
    "age": 31,
    "birthdate": "1992-04-10",
    "gender": "M",
    "city": "New York"
  },
  {
    "name": "Jane",
    "age": 29,
    "birthdate": "1994-02-10",
    "gender": "F",
    "city": "Boston"
  },
  {
    "name": "Dane",
    "age": 42,
    "birthdate": "1936-03-11",
    "gender": "M",
    "city": "Chicago"
  }
]
```

## Nested Object Extraction

- should extract data from nested JSON structure with `nested-simple` configuration

```execute
cat json-nested.json | aux4 adapter map --configFile config-json.yaml --config nested-simple | jq .
```

```expect
{
  "firstName": "John",
  "firstAge": 31,
  "firstCity": "New York",
  "secondName": "Jane",
  "secondAge": 29,
  "secondCity": "Boston"
}
```

## Complex Nested Structure

- should process complex nested JSON with `complex-simple` configuration

```execute
cat json-complex.json | aux4 adapter map --configFile config-json.yaml --config complex-simple | jq .
```

```expect
{
  "version": "1.0",
  "timestamp": "2023-01-15T10:30:00Z",
  "employee1Name": "John",
  "employee1Email": "john.doe@example.com",
  "employee1Dept": "Engineering",
  "employee2Name": "Jane",
  "employee2Email": "jane.smith@example.com",
  "employee2Dept": "Marketing"
}
```

## With Transformers

- should apply transformers to JSON data with `with-transformers` configuration

```execute
cat json-simple.json | aux4 adapter map --configFile config-json.yaml --config with-transformers | jq .
```

```expect
{
  "name": "JOHN",
  "age": 31,
  "city": "new york",
  "gender": "M"
}
```

## Nested Object Creation

- should create nested objects from JSON data with `nested-objects` configuration

```execute
cat json-complex.json | aux4 adapter map --configFile config-json.yaml --config nested-objects | jq .
```

```expect
{
  "employee": {
    "id": 1,
    "name": "John",
    "department": "Engineering"
  },
  "metadata": {
    "version": "1.0",
    "timestamp": "2023-01-15T10:30:00Z"
  }
}
```

## Basic Nested Access

- should access basic nested properties with `basic-nested` configuration

```execute
cat json-nested.json | aux4 adapter map --configFile config-json.yaml --config basic-nested | jq .
```

```expect
{
  "name": "John",
  "age": 31,
  "city": "New York"
}
```

## Single Array Element Extraction

- should extract fields from arrays with single elements using array indexing

```execute
cat json-single-array.json | aux4 adapter map --configFile config-json.yaml --config single-array-extraction | jq .
```

```expect
{
  "personId": 12345,
  "firstName": "John",
  "lastName": "Doe",
  "homeCity": "New York",
  "homeState": "NY",
  "homeStreet": "123 Main Street",
  "homeZip": "10001",
  "latitude": 40.7128,
  "longitude": -74.006,
  "phoneNumber": "+1-555-123-4567",
  "phoneType": "mobile",
  "isPrimaryPhone": true,
  "company": "Tech Corp",
  "position": "Senior Developer",
  "department": "Engineering",
  "salary": 95000,
  "currency": "USD",
  "university": "State University",
  "degree": "Bachelor of Science",
  "field": "Computer Science",
  "graduationYear": 2019
}
```

## Nested Objects from Single Array Elements

- should create nested objects from array elements with `nested-array-objects` configuration

```execute
cat json-single-array.json | aux4 adapter map --configFile config-json.yaml --config nested-array-objects | jq .
```

```expect
{
  "contact": {
    "name": "John Doe",
    "phone": "+1-555-123-4567",
    "address": {
      "street": "123 Main Street",
      "city": "New York",
      "state": "NY",
      "zip": "10001"
    }
  },
  "work": {
    "company": "Tech Corp",
    "position": "Senior Developer",
    "salary": {
      "amount": 95000,
      "currency": "USD"
    }
  },
  "education": {
    "school": "State University",
    "degree": "Bachelor of Science",
    "gpa": 3.8
  }
}
```