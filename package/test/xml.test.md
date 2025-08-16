# XML

## Simple XML Document

- should parse a simple XML document with `simple` configuration

```execute
cat xml-simple.xml | aux4 adapter map --configFile config-xml.yaml --config simple | jq .
```

```expect
{
  "name": "John Doe",
  "age": 31,
  "birthdate": "1992-04-10",
  "gender": "M",
  "city": "New York"
}
```

## XML Array Processing

- should process XML with multiple elements using `people-simple` configuration

```execute
cat xml-people.xml | aux4 adapter map --configFile config-xml.yaml --config people-simple | jq .
```

```expect
{
  "person1Id": "1",
  "person1Name": "John Doe",
  "person1Age": 31,
  "person2Id": "2",
  "person2Name": "Jane Smith",
  "person2Age": 29,
  "person3Id": "3",
  "person3Name": "Mike Johnson",
  "person3Age": 42
}
```

## Nested XML Structure

- should extract data from nested XML with `nested-simple` configuration

```execute
cat xml-nested.xml | aux4 adapter map --configFile config-xml.yaml --config nested-simple | jq .
```

```expect
{
  "version": 1,
  "employee1Id": "101",
  "employee1Name": "John",
  "employee1Email": "john.doe@example.com",
  "employee1Dept": "Engineering",
  "employee1Salary": {
    "#text": 95000,
    "_attr": {
      "currency": "USD"
    }
  },
  "employee2Id": "102",
  "employee2Name": "Jane",
  "employee2Email": "jane.smith@example.com"
}
```

## XML Attributes Processing

- should extract XML attributes and element content with `book-simple` configuration

```execute
cat xml-attributes.xml | aux4 adapter map --configFile config-xml.yaml --config book-simple | jq .
```

```expect
{
  "book1Id": "1",
  "book1Title": {
    "#text": "The Great Novel",
    "_attr": {
      "lang": "en"
    }
  },
  "book1Author": "John Writer",
  "book1Price": {
    "#text": 29.99,
    "_attr": {
      "currency": "USD"
    }
  },
  "book2Id": "2",
  "book2Title": {
    "#text": "Learning Technology",
    "_attr": {
      "lang": "en"
    }
  },
  "book2Author": "Sarah Tech"
}
```

## Complex XML with Mixed Content

- should handle complex XML with attributes and nested elements using `product-details` configuration

```execute
cat xml-mixed-content.xml | aux4 adapter map --configFile config-xml.yaml --config product-details | jq .
```

```expect
{
  "productId": "P001",
  "status": "active",
  "name": "Laptop Computer",
  "description": "High-performance laptop with 16GB RAM",
  "processor": "Intel i7",
  "memory": {
    "#text": 16,
    "_attr": {
      "unit": "GB"
    }
  },
  "memoryUnit": "GB",
  "storageSize": {
    "#text": 512,
    "_attr": {
      "type": "SSD",
      "unit": "GB"
    }
  },
  "storageType": "SSD",
  "storageUnit": "GB",
  "displaySize": "15.6",
  "displayUnit": "inches",
  "displayResolution": {
    "#text": "1920x1080",
    "_attr": {
      "size": "15.6",
      "unit": "inches"
    }
  },
  "basePrice": {
    "#text": 1299.99,
    "_attr": {
      "currency": "USD"
    }
  },
  "baseCurrency": "USD",
  "discountPrice": {
    "#text": 1099.99,
    "_attr": {
      "currency": "USD",
      "expires": "2023-12-31"
    }
  },
  "discountCurrency": "USD",
  "discountExpires": "2023-12-31",
  "inStock": true,
  "quantity": 25
}
```

## XML Metadata and Indexing

- should extract metadata and specific elements using array indexing with `company-metadata` configuration

```execute
cat xml-nested.xml | aux4 adapter map --configFile config-xml.yaml --config company-metadata | jq .
```

```expect
{
  "version": 1,
  "lastUpdated": "2023-01-15T10:30:00Z",
  "firstEmployeeId": "101",
  "firstEmployeeName": "John",
  "firstEmployeeEmail": "john.doe@example.com"
}
```

## XML with Transformers

- should apply transformers to XML data with `with-transformers` configuration

```execute
cat xml-simple.xml | aux4 adapter map --configFile config-xml.yaml --config with-transformers | jq .
```

```expect
{
  "name": "JOHN DOE",
  "age": 31,
  "city": "new york",
  "gender": "M"
}
```