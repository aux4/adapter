# Basic Data Transformations

This test suite covers fundamental data transformation patterns including basic nested object creation and simple flattening operations.

## JSON to Nested Objects

**Test Case:** Create basic nested object structure from JSON data

- Configuration: `json-nested-simple`
- Purpose: Transform complex JSON into organized nested objects with metadata and user information

```file:config.yaml
config:
  json-nested-simple:
    format: json
    mapping:
      metadata:
        type: object
        mapping:
          version: $.metadata.version
          totalUsers: $.metadata.totalUsers
          lastUpdated: $.metadata.lastUpdated
      firstUser:
        type: object
        mapping:
          id: $.users[0].id
          firstName: $.users[0].profile.firstName
          lastName: $.users[0].profile.lastName
          email: $.users[0].profile.email
          company: $.users[0].employment.company
      secondUser:
        type: object
        mapping:
          id: $.users[1].id
          firstName: $.users[1].profile.firstName
          lastName: $.users[1].profile.lastName
          email: $.users[1].profile.email
          company: $.users[1].employment.company
```

```execute
cat sample-users.json | aux4 adapter map --config json-nested-simple | jq .
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

## JSON to Flat Structure

**Test Case:** Flatten nested JSON into simple key-value pairs

- Configuration: `json-simple-flat`
- Purpose: Extract nested values and create a flat structure with prefixed keys

```file:config.yaml
config:
  json-simple-flat:
    format: json
    mapping:
      user1Id: $.users[0].id
      user1FirstName: $.users[0].profile.firstName
      user1LastName: $.users[0].profile.lastName
      user1Email: $.users[0].profile.email
      user1Age: $.users[0].profile.age
      user1HomeCity: $.users[0].contacts.addresses[0].city
      user1Company: $.users[0].employment.company
      user2Id: $.users[1].id
      user2FirstName: $.users[1].profile.firstName
      user2LastName: $.users[1].profile.lastName
      user2Email: $.users[1].profile.email
      user2Company: $.users[1].employment.company
```

```execute
cat sample-users.json | aux4 adapter map --config json-simple-flat | jq .
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

## CSV to Nested Objects

**Test Case:** Transform CSV rows into structured nested objects

- Configuration: `csv-simple-complex`
- Purpose: Convert flat CSV data into organized object hierarchy with person, contact, and employment sections

```file:config.yaml
config:
  csv-simple-complex:
    format: csv
    mapping:
      person:
        type: object
        mapping:
          id:
            path: $.id
            type: number
          firstName: $.firstName
          lastName: $.lastName
          email: $.email
          age:
            path: $.age
            type: number
      contact:
        type: object
        mapping:
          mobilePhone: $.mobilePhone
          workPhone: $.workPhone
          homeAddress:
            type: object
            mapping:
              street: $.homeStreet
              city: $.homeCity
              state: $.homeState
          workAddress:
            type: object
            mapping:
              street: $.workStreet
              city: $.workCity
              state: $.workState
      employment:
        type: object
        mapping:
          company: $.company
          position: $.position
          salary:
            path: $.salary
            type: number
```

```execute
cat sample-users.csv | aux4 adapter map --config csv-simple-complex | jq .
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

## CSV Simplified Complex Structure

- should transform flat CSV data into basic nested structure with `csv-to-complex` configuration

```file:config.yaml
config:
  csv-to-complex:
    format: csv
    mapping:
      person:
        type: object
        mapping:
          id:
            path: $.id
            type: number
          firstName: $.firstName
          lastName: $.lastName
          email: $.email
          age:
            path: $.age
            type: number
      employment:
        type: object
        mapping:
          company: $.company
          position: $.position
          salary:
            path: $.salary
            type: number
```

```execute
cat sample-users.csv | aux4 adapter map --config csv-to-complex | jq .
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