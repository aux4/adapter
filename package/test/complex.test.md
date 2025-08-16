# Complex Mappings - Supported Features

## JSON Basic Nested Objects

- should create basic nested objects from JSON data with `json-nested-simple` configuration

```execute
cat complex-data.json | aux4 adapter map --configFile config-complex-simple.yaml --config json-nested-simple | jq .
```

```expect
{
  "metadata": {
    "version": "2.1",
    "totalUsers": 2,
    "lastUpdated": "2023-12-01T15:30:00Z"
  },
  "firstUser": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "company": "Tech Corp"
  },
  "secondUser": {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "company": "Design Studio"
  }
}
```

## JSON Flattened Structure

- should flatten complex JSON structure into simple key-value pairs with `json-simple-flat` configuration

```execute
cat complex-data.json | aux4 adapter map --configFile config-complex-simple.yaml --config json-simple-flat | jq .
```

```expect
{
  "user1Id": 1,
  "user1FirstName": "John",
  "user1LastName": "Doe",
  "user1Email": "john.doe@example.com",
  "user1Age": 31,
  "user1HomeCity": "New York",
  "user1Company": "Tech Corp",
  "user2Id": 2,
  "user2FirstName": "Jane",
  "user2LastName": "Smith",
  "user2Email": "jane.smith@example.com",
  "user2Company": "Design Studio"
}
```

## CSV to Objects

- should transform CSV data into basic structured objects with `csv-simple-complex` configuration

```execute
cat complex-csv.csv | aux4 adapter map --configFile config-complex-simple.yaml --config csv-simple-complex | jq .
```

```expect
[
  {
    "person": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "age": 31
    },
    "contact": {
      "mobilePhone": "+1-555-123-4567",
      "workPhone": "+1-555-987-6543",
      "homeAddress": {
        "street": "123 Main St",
        "city": "New York",
        "state": "NY"
      },
      "workAddress": {
        "street": "456 Business Ave",
        "city": "New York",
        "state": "NY"
      }
    },
    "employment": {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "salary": 95000
    }
  },
  {
    "person": {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "age": 28
    },
    "contact": {
      "mobilePhone": "+1-555-555-1234",
      "homeAddress": {
        "street": "789 Oak Lane",
        "city": "Boston",
        "state": "MA"
      }
    },
    "employment": {
      "company": "Design Studio",
      "position": "UX Designer",
      "salary": 75000
    }
  }
]
```

## CSV Basic Complex Structure

- should transform flat CSV data into basic nested structure with `csv-to-complex` configuration

```execute
cat complex-csv.csv | aux4 adapter map --configFile config-complex-simple.yaml --config csv-to-complex | jq .
```

```expect
[
  {
    "person": {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "age": 31
    },
    "employment": {
      "company": "Tech Corp",
      "position": "Senior Developer",
      "salary": 95000
    }
  },
  {
    "person": {
      "id": 2,
      "firstName": "Jane",
      "lastName": "Smith",
      "email": "jane.smith@example.com",
      "age": 28
    },
    "employment": {
      "company": "Design Studio",
      "position": "UX Designer",
      "salary": 75000
    }
  }
]
```