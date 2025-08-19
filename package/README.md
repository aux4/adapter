# aux4/adapter

A flexible data transformation CLI tool that maps and transforms data between JSON, CSV, and XML formats using JSONPath expressions and configurable transformers.

## Installation

```bash
aux4 aux4 pkger install aux4/adapter
```

## CSV Processing

### Simple CSV with headers

Parse a standard CSV file with column headers and map each column to JSON fields.

```yaml
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

```bash
cat content.csv | aux4 adapter map --configFile config-csv.yaml --config simple
```

### Pipe-separated values

Process CSV files that use pipe (|) as delimiter instead of commas.

```yaml
config:
  pipe:
    format: csv
    delimiter: "|"
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      city: $.city
```

```bash
cat content-pipe.csv | aux4 adapter map --configFile config-csv.yaml --config pipe
```

### CSV without headers

Handle CSV files that don't have header row by explicitly defining column names.

```yaml
config:
  no-header:
    format: csv
    columns: name,age,birthdate,gender,city
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      city: $.city
```

```bash
cat content-no-columns.csv | aux4 adapter map --configFile config-csv.yaml --config no-header
```

### CSV to nested objects

Transform flat CSV data into hierarchical JSON structure with nested objects.

```yaml
config:
  nested:
    format: csv
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      place:
        type: object
        mapping:
          city: $.city
```

```bash
cat content.csv | aux4 adapter map --configFile config-csv.yaml --config nested
```

## JSON Processing

### Simple object mapping

Extract and map fields from a basic JSON object to output JSON with same structure.

```yaml
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

```bash
cat json-simple.json | aux4 adapter map --configFile config-json.yaml --config simple
```

### Array processing

Process JSON arrays by applying the same mapping to each array element.

```yaml
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

```bash
cat json-array.json | aux4 adapter map --configFile config-json.yaml --config array
```

### Nested object extraction

Extract specific fields from deeply nested JSON structures using array indexing.

```yaml
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

```bash
cat json-nested.json | aux4 adapter map --configFile config-json.yaml --config nested-simple
```

### Array indexing

Access specific array elements using JSONPath array notation to flatten complex data.

```yaml
config:
  single-array-extraction:
    format: json
    mapping:
      personId: $.person.id
      firstName: $.person.profile.firstName
      lastName: $.person.profile.lastName
      homeCity: $.person.addresses[0].city
      homeState: $.person.addresses[0].state
      phoneNumber: $.person.phoneNumbers[0].number
      company: $.person.employment[0].company
      position: $.person.employment[0].position
```

```bash
cat json-single-array.json | aux4 adapter map --configFile config-json.yaml --config single-array-extraction
```

### Creating nested objects

Build hierarchical output structure by creating nested objects from flat input data.

```yaml
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

```bash
cat json-complex.json | aux4 adapter map --configFile config-json.yaml --config nested-objects
```

## XML Processing

### Simple XML document

Parse basic XML elements and convert them to JSON key-value pairs.

```yaml
config:
  simple:
    format: xml
    mapping:
      name: $.person.name
      age: $.person.age
      birthdate: $.person.birthdate
      gender: $.person.gender
      city: $.person.city
```

```bash
cat xml-simple.xml | aux4 adapter map --configFile config-xml.yaml --config simple
```

### XML attributes extraction

Extract both XML element content and attributes using special `_attr` notation.

```yaml
config:
  book-simple:
    format: xml
    mapping:
      book1Id: $.library.book[0]._attr.id
      book1Title: $.library.book[0].title
      book1Author: $.library.book[0].author.name
      book1Price: $.library.book[0].price
      book2Id: $.library.book[1]._attr.id
      book2Title: $.library.book[1].title
      book2Author: $.library.book[1].author.name
```

```bash
cat xml-attributes.xml | aux4 adapter map --configFile config-xml.yaml --config book-simple
```

### XML array processing

Process multiple XML elements as arrays using array indexing to access individual items.

```yaml
config:
  people-simple:
    format: xml
    mapping:
      person1Id: $.people.person[0]._attr.id
      person1Name: $.people.person[0].name
      person1Age: $.people.person[0].age
      person2Id: $.people.person[1]._attr.id
      person2Name: $.people.person[1].name
      person2Age: $.people.person[1].age
```

```bash
cat xml-people.xml | aux4 adapter map --configFile config-xml.yaml --config people-simple
```

## Data Transformers

### Lowercase transformation

Convert text values to lowercase using the built-in lowercase transformer.

```yaml
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

```bash
cat transformer-uppercase-data.json | aux4 adapter map --configFile config-transformers.yaml --config lowercase-test
```

### Uppercase transformation

Convert text values to uppercase using the built-in uppercase transformer.

```yaml
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

```bash
cat transformer-lowercase-data.json | aux4 adapter map --configFile config-transformers.yaml --config uppercase-test
```

### Trim whitespace

Remove leading and trailing whitespace from text values using the trim transformer.

```yaml
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

```bash
cat transformer-trim-data.json | aux4 adapter map --configFile config-transformers.yaml --config trim-test
```

### Multiple transformers (trim + lowercase)

Chain multiple transformers by separating them with pipe (|) to apply sequentially.

```yaml
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

```bash
cat transformer-multiple-trim-upper-data.json | aux4 adapter map --configFile config-transformers.yaml --config multiple-trim-lowercase
```

### Multiple transformers (trim + uppercase)

Apply trim first then uppercase transformation in sequence using pipe notation.

```yaml
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

```bash
cat transformer-trim-data.json | aux4 adapter map --configFile config-transformers.yaml --config multiple-trim-uppercase
```

## Complex Mappings

### JSON to nested objects

Transform complex JSON data into structured nested objects with grouped related fields.

```yaml
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
```

```bash
cat complex-data.json | aux4 adapter map --configFile config-complex-simple.yaml --config json-nested-simple
```

### CSV to complex objects

Convert flat CSV rows into rich hierarchical structures with multiple nested object levels.

```yaml
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
          homeAddress:
            type: object
            mapping:
              street: $.homeStreet
              city: $.homeCity
              state: $.homeState
      employment:
        type: object
        mapping:
          company: $.company
          position: $.position
          salary:
            path: $.salary
            type: number
```

```bash
cat complex-csv.csv | aux4 adapter map --configFile config-complex-simple.yaml --config csv-simple-complex
```

## Command Line Options

### Streaming Output (--stream)

By default, the adapter outputs data as a JSON array. Use the `--stream` parameter to output each item as individual JSON objects (one per line).

**Standard output (JSON array):**
```bash
cat content.csv | aux4 adapter map --config simple
# Output: [{"name":"John",...},{"name":"Jane",...}]
```

**Streaming output (individual JSON objects):**
```bash
cat content.csv | aux4 adapter map --config simple --stream
# Output:
# {"name":"John",...}
# {"name":"Jane",...}
```

### CSV Parser Options (--options)

Pass additional options to the CSV parser to control parsing behavior. Options must be provided as a JSON string.

**Skip lines from the beginning:**
```bash
cat content.csv | aux4 adapter map --config simple --options '{"from":2}'
# Skips first data row and processes from the second row onwards
```

You can also configure parser options directly in the configuration file:

```yaml
config:
  simple:
    format: csv
    options:
      from: 2  # Skip first data row
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      city: $.city
```

## License

This package does not include a license file. Please refer to your organization's licensing policies.
