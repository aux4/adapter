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

## Field Mapping Forms

Each entry in a `mapping` block can be written either as a **shorthand string** (just a JSONPath) or as an **object** that unlocks transformers, defaults, type conversion, templates, nested mappings and expressions.

### Shorthand (JSONPath string)

```yaml
mapping:
  name: $.name
```

### Object form

The object form supports the following keys:

| Key           | Description                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------- |
| `path`        | JSONPath to read the value from (e.g. `$.profile.name`).                                      |
| `type`        | Coerce/structure the value: `number`, `boolean`, `array`, `object` (see below).              |
| `default`     | Value used when the resolved value is missing, `null`, or empty.                             |
| `transformer` | Name of a transformer (or pipe-chained transformers) to apply to the value.                  |
| `text`        | A template string with `$.path` placeholders interpolated from the source object.            |
| `expr`        | A built-in expression or JSONata expression evaluated against the source object (see below). |
| `mapping`     | A nested mapping, used together with `type: object` or `type: array`.                        |

```yaml
config:
  object-form:
    format: json
    mapping:
      id:
        path: $.id
        type: number
      status:
        path: $.status
        default: active
```

For input `{ "id": "42" }` this produces `{ "id": 42, "status": "active" }`.

### Text templates (`text:`)

Use `text:` to build a value from one or more source fields. JSONPath placeholders written as `$.path` are replaced with the matching value from the source object; missing values become empty strings and the result is trimmed.

```yaml
config:
  text-template:
    format: json
    mapping:
      fullName:
        text: "$.firstName $.lastName"
```

For input `{ "firstName": "John", "lastName": "Doe" }` this produces `{ "fullName": "John Doe" }`.

### Nested objects (`type: object`)

Combine `type: object` with `mapping:` to build a nested structure from the same source object.

```yaml
config:
  nested:
    format: json
    mapping:
      place:
        type: object
        mapping:
          city: $.address.city
          state: $.address.state
```

## Expression Mappings

Use `expr:` to compute a value. The adapter tries a set of built-in expressions first and, if none match, evaluates the string as a [JSONata](https://jsonata.org) expression against the source object.

### Built-in expressions

| Expression | Returns                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `uuid()`   | A **version 7 UUID** — time-ordered, so UUIDs generated later sort after earlier ones (great for sortable identifiers).         |
| `now()`    | The current local timestamp as an ISO-8601 string with the machine's UTC offset, e.g. `2026-06-23T19:42:24-05:00`.             |
| `utc()`    | The current timestamp in UTC as an ISO-8601 string in `Z` form, e.g. `2026-06-24T00:42:24Z`.                                    |
| `time()`   | The current Unix timestamp in seconds since the epoch (a number), e.g. `1782261744`.                                            |

```yaml
config:
  ids-and-dates:
    format: json
    mapping:
      id:
        expr: uuid()
      createdAtLocal:
        expr: now()
      createdAtUtc:
        expr: utc()
      createdEpoch:
        expr: time()
      name: $.name
```

```bash
echo '{"name":"John"}' | aux4 adapter map --config ids-and-dates
```

```json
{
  "id": "019ef71a-33c0-74c9-bd6b-488c4da098fb",
  "createdAtLocal": "2026-06-23T19:42:24-05:00",
  "createdAtUtc": "2026-06-24T00:42:24Z",
  "createdEpoch": 1782261744,
  "name": "John"
}
```

### JSONata expressions

Any expression that is not a built-in is evaluated as JSONata, which lets you compute fields, concatenate strings, filter arrays, and more. Field names in the expression refer to keys of the source object.

```yaml
config:
  computed:
    format: json
    mapping:
      fullName:
        expr: "firstName & ' ' & lastName"
```

```bash
echo '{"firstName":"John","lastName":"Doe"}' | aux4 adapter map --config computed
```

```json
{
  "fullName": "John Doe"
}
```

## Custom Transformers

In addition to the built-in transformers (`default`, `lowercase`, `uppercase`, `trim`), you can register named transformers in a `transformers:` block and reference them by name in your mapping. Custom transformers are built from these registrable types:

| Type      | Configuration                                                                                                | Behavior                                                              |
| --------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| `date`    | `pattern` (input format, default `YYYY-MM-DD'T'HH:mm:ss`), `format` (output format, default `YYYY-MM-DD HH:mm:ss Z`) | Reformats a date string from `pattern` to `format` (via moment).     |
| `replace` | `replace` (value→value map), `defaultValue` (optional)                                                       | Replaces the value using the map; falls back to `defaultValue`.      |
| `remove`  | `list` (array of substrings)                                                                                  | Removes every occurrence of each listed substring from the value.    |

The built-in `default` transformer returns the value unchanged.

```yaml
config:
  custom-transformers:
    format: json
    transformers:
      BIRTHDATE:
        type: date
        pattern: YYYY-MM-DD
        format: MM/DD/YYYY
      GENDER:
        type: replace
        replace:
          M: MALE
          F: FEMALE
        defaultValue: UNKNOWN
      PHONE:
        type: remove
        list:
          - "+"
          - "-"
    mapping:
      birthdate:
        path: $.birthdate
        transformer: BIRTHDATE
      gender:
        path: $.gender
        transformer: GENDER
      phone:
        path: $.phone
        transformer: PHONE
```

```bash
echo '{"birthdate":"2020-03-15","gender":"M","phone":"+1-555-123-4567"}' | aux4 adapter map --config custom-transformers
```

```json
{
  "birthdate": "03/15/2020",
  "gender": "MALE",
  "phone": "15551234567"
}
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

**Sample CSV input (content.csv):**

```csv
name,age,birthdate,gender,city
John,,1992-04-10,M,New York
Jane,29,1994-02-10,F,
Dane,42,1936-03-11,,Boston
```

**Standard output (JSON array):**

```bash
cat content.csv | aux4 adapter map --config simple
```

**Output:**

```json
[
  { "name": "John", "birthdate": "1992-04-10", "gender": "M", "city": "New York" },
  { "name": "Jane", "age": "29", "birthdate": "1994-02-10", "gender": "F" },
  { "name": "Dane", "age": "42", "birthdate": "1936-03-11", "city": "Boston" }
]
```

**Streaming output (individual JSON objects):**

```bash
cat content.csv | aux4 adapter map --config simple --stream
```

**Output:**

```json
{"name":"John","birthdate":"1992-04-10","gender":"M","city":"New York"}
{"name":"Jane","age":"29","birthdate":"1994-02-10","gender":"F"}
{"name":"Dane","age":"42","birthdate":"1936-03-11","city":"Boston"}
```

### CSV Parser Options (--options)

Pass additional options to the CSV parser to control parsing behavior. Options can be provided as command-line JSON or directly in the configuration file.

**Skip lines from the beginning using configuration:**

Set up your configuration file to skip the first data row and process from the second row onwards:

```yaml
config:
  simple:
    format: csv
    options:
      from: 2 # Skip first data row (John)
    mapping:
      name: $.name
      age: $.age
      birthdate: $.birthdate
      gender: $.gender
      city: $.city
```

**Command:**

```bash
cat content.csv | aux4 adapter map --config simple
```

**Output:**

```json
[
  { "name": "Jane", "age": "29", "birthdate": "1994-02-10", "gender": "F" },
  { "name": "Dane", "age": "42", "birthdate": "1936-03-11", "city": "Boston" }
]
```

## See Also

- [aux4/config](/r/public/packages/aux4/config) for more information on configuration files.
- [aux4/validator](/r/public/packages/aux4/validator) for validating data against schemas.

## License

Apache-2.0
