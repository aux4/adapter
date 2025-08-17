# JSON

## Simple Object

- should parse a simple JSON object with `simple` configuration

```file:config.yaml
config:
  simple:
    format: json
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      city: $.city
```

```execute
cat json-simple.json | aux4 adapter map --config simple | jq .
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

```file:config.yaml
config:
  array:
    format: json
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      city: $.city
```

```execute
cat json-array.json | aux4 adapter map --config array | jq .
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

```file:config.yaml
config:
  nested-simple:
    format: json
    mapping:
      firstName: $.users[0].profile.name
      firstAge: $.users[0].profile.age
      firstCity: $.users[0].details.location.city
      secondName: $.users[1].profile.name
      secondAge: $.users[1].profile.age
      secondCity: $.users[1].details.location.city
```

```execute
cat json-nested.json | aux4 adapter map --config nested-simple | jq .
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

```file:config.yaml
config:
  complex-simple:
    format: json
    mapping:
      version: $.metadata.version
      timestamp: $.metadata.timestamp
      employee1Name: $.data.employees[0].personal.firstName
      employee1Email: $.data.employees[0].personal.email
      employee1Dept: $.data.employees[0].work.department
      employee2Name: $.data.employees[1].personal.firstName
      employee2Email: $.data.employees[1].personal.email
      employee2Dept: $.data.employees[1].work.department
```

```execute
cat json-complex.json | aux4 adapter map --config complex-simple | jq .
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

```file:config.yaml
config:
  with-transformers:
    format: json
    mapping:
      name:
        path: $.name
        transformer: uppercase
      age:
        path: $.age
        type: number
      city:
        path: $.city
        transformer: lowercase
      gender:
        path: $.gender
        transformer: trim
```

```execute
cat json-simple.json | aux4 adapter map --config with-transformers | jq .
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

```file:config.yaml
config:
  nested-objects:
    format: json
    mapping:
      employee:
        type: object
        mapping:
          id: $.data.employees[0].id
          name: $.data.employees[0].personal.firstName
          department: $.data.employees[0].work.department
      metadata:
        type: object
        mapping:
          version: $.metadata.version
          timestamp: $.metadata.timestamp
```

```execute
cat json-complex.json | aux4 adapter map --config nested-objects | jq .
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

```file:config.yaml
config:
  basic-nested:
    format: json
    mapping:
      name: $.users[0].profile.name
      age: $.users[0].profile.age
      city: $.users[0].details.location.city
```

```execute
cat json-nested.json | aux4 adapter map --config basic-nested | jq .
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

```file:config.yaml
config:
  single-array-extraction:
    format: json
    mapping:
      personId: $.person.id
      firstName: $.person.profile.firstName
      lastName: $.person.profile.lastName
      homeCity: $.person.addresses[0].city
      homeState: $.person.addresses[0].state
      homeStreet: $.person.addresses[0].street
      homeZip: $.person.addresses[0].zipCode
      latitude: $.person.addresses[0].coordinates.latitude
      longitude: $.person.addresses[0].coordinates.longitude
      phoneNumber: $.person.phoneNumbers[0].number
      phoneType: $.person.phoneNumbers[0].type
      isPrimaryPhone: $.person.phoneNumbers[0].isPrimary
      company: $.person.employment[0].company
      position: $.person.employment[0].position
      department: $.person.employment[0].department
      salary: $.person.employment[0].salary.amount
      currency: $.person.employment[0].salary.currency
      university: $.person.education[0].institution
      degree: $.person.education[0].degree
      field: $.person.education[0].field
      graduationYear: $.person.education[0].graduationYear
```

```execute
cat json-single-array.json | aux4 adapter map --config single-array-extraction | jq .
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

```file:config.yaml
config:
  nested-array-objects:
    format: json
    mapping:
      contact:
        type: object
        mapping:
          name: $.person.profile.fullName
          phone: $.person.phoneNumbers[0].number
          address:
            type: object
            mapping:
              street: $.person.addresses[0].street
              city: $.person.addresses[0].city
              state: $.person.addresses[0].state
              zip: $.person.addresses[0].zipCode
      work:
        type: object
        mapping:
          company: $.person.employment[0].company
          position: $.person.employment[0].position
          salary:
            type: object
            mapping:
              amount: $.person.employment[0].salary.amount
              currency: $.person.employment[0].salary.currency
      education:
        type: object
        mapping:
          school: $.person.education[0].institution
          degree: $.person.education[0].degree
          gpa: $.person.education[0].gpa
```

```execute
cat json-single-array.json | aux4 adapter map --config nested-array-objects | jq .
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