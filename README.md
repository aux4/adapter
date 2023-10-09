# @aux4/adapter

## Install

```
$ npm install --global @aux4/adapter
```

### Usage

#### config.yml

```yaml
config:
  my-mapping:
    transformers:
      GENDER:
        type: replace
        replace:
          M: MALE
          F: FEMALE
      DATE:
        type: date
        format: MM/DD/YYYY
    
    root:
      path: $.data
    mapping:
      name: $.name
      age: $.age
      birthdate:
        path: $.birthdate
        transformer: DATE
      gender:
        path: $.gender
        transformer: GENDER
      place:
        type: object
        mapping:
          city: $.address.city
```

#### test.json

```json
{
  "data": [
    {
      "name": "John",
      "age": 31,
      "birthdate": "1992-04-10",
      "gender": "M",
      "address": {
        "city": "New York"
      }
    },
    {
      "name": "Mary",
      "age": 27,
      "birthdate": "1996-02-14",
      "gender": "F",
      "address": {
        "city": "Boston"
      }
    }
  ]
}
```

```
$ cat test.json | adapter map --config my-mapping --format json
```

```json

[
  {
    "name": "John",
    "age": 31,
    "birthdate": "04/10/1992",
    "gender": "MALE",
    "place": {
      "city": "New York"
    }
  },
  {
    "name": "Mary",
    "age": 27,
    "birthdate": "02/14/1996",
    "gender": "FEMALE",
    "place": {
      "city": "Boston"
    }
  }
]
```
