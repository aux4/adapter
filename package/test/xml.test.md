# XML

## Simple XML Document

- should parse a simple XML document with `simple` configuration

```file:config.yaml
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

```execute
cat xml-simple.xml | aux4 adapter map --config simple | jq .
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

```file:config.yaml
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
      person3Id: $.people.person[2]._attr.id
      person3Name: $.people.person[2].name
      person3Age: $.people.person[2].age
```

```execute
cat xml-people.xml | aux4 adapter map --config people-simple | jq .
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

```file:config.yaml
config:
  nested-simple:
    format: xml
    mapping:
      version: $.company.metadata.version
      employee1Id: $.company.employees.employee[0]._attr.id
      employee1Name: $.company.employees.employee[0].personal.firstName
      employee1Email: $.company.employees.employee[0].personal.email
      employee1Dept: $.company.employees.employee[0].work.department
      employee1Salary: $.company.employees.employee[0].work.salary
      employee2Id: $.company.employees.employee[1]._attr.id
      employee2Name: $.company.employees.employee[1].personal.firstName
      employee2Email: $.company.employees.employee[1].personal.email
```

```execute
cat xml-nested.xml | aux4 adapter map --config nested-simple | jq .
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

```file:config.yaml
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

```execute
cat xml-attributes.xml | aux4 adapter map --config book-simple | jq .
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

```file:config.yaml
config:
  product-details:
    format: xml
    mapping:
      productId: $.catalog.product._attr.id
      status: $.catalog.product._attr.status
      name: $.catalog.product.name
      description: $.catalog.product.description
      processor: $.catalog.product.specifications.processor
      memory: $.catalog.product.specifications.memory
      memoryUnit: $.catalog.product.specifications.memory._attr.unit
      storageSize: $.catalog.product.specifications.storage
      storageType: $.catalog.product.specifications.storage._attr.type
      storageUnit: $.catalog.product.specifications.storage._attr.unit
      displaySize: $.catalog.product.specifications.display._attr.size
      displayUnit: $.catalog.product.specifications.display._attr.unit
      displayResolution: $.catalog.product.specifications.display
      basePrice: $.catalog.product.pricing.basePrice
      baseCurrency: $.catalog.product.pricing.basePrice._attr.currency
      discountPrice: $.catalog.product.pricing.discountPrice
      discountCurrency: $.catalog.product.pricing.discountPrice._attr.currency
      discountExpires: $.catalog.product.pricing.discountPrice._attr.expires
      inStock: $.catalog.product.availability.inStock
      quantity: $.catalog.product.availability.quantity
```

```execute
cat xml-mixed-content.xml | aux4 adapter map --config product-details | jq .
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

```file:config.yaml
config:
  company-metadata:
    format: xml
    mapping:
      version: $.company.metadata.version
      lastUpdated: $.company.metadata.lastUpdated
      firstEmployeeId: $.company.employees.employee[0]._attr.id
      firstEmployeeName: $.company.employees.employee[0].personal.firstName
      firstEmployeeEmail: $.company.employees.employee[0].personal.email
```

```execute
cat xml-nested.xml | aux4 adapter map --config company-metadata | jq .
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

```file:config.yaml
config:
  with-transformers:
    format: xml
    mapping:
      name:
        path: $.person.name
        transformer: uppercase
      age:
        path: $.person.age
        type: number
      city:
        path: $.person.city
        transformer: lowercase
      gender:
        path: $.person.gender
        transformer: trim
```

```execute
cat xml-simple.xml | aux4 adapter map --config with-transformers | jq .
```

```expect
{
  "name": "JOHN DOE",
  "age": 31,
  "city": "new york",
  "gender": "M"
}
```