
## Identify

The book inventory program produces incorrect results because:

1. The `calculateTotalPrice()` function iterates one element past the end of the `items` array, causing the total price to become `NaN`.
2. The `isAvailable()` function uses the assignment operator (`=`) instead of the comparison operator (`===`), causing every book's `stock` to be set to `0`.
3. The `printBooks()` function attempts to access properties directly from the `books` array instead of from each individual book object, causing `undefined` to be printed.

---

## Reproduce Environment

### Expected Result

```text
Total Price: 75
Book: Clean Code
Price: 30
Book: JavaScript Basics
Price: 20
Book: React Guide
Price: 25
```

### Actual Result

```text
TypeError: Cannot read properties of undefined (reading 'price')
```

If the first bug is fixed but the others remain, the output becomes:

```text
Total Price: 75
Book: undefined
Price: undefined
Book: undefined
Price: undefined
Book: undefined
Price: undefined
```

---

## Root Cause

### Bug 1

The loop in `calculateTotalPrice()` uses:

```javascript
for (let i = 0; i <= items.length; i++) {
```

Using `<=` causes the loop to access `items[items.length]`, which is `undefined`.

The following line then attempts to read a property from `undefined`:

```javascript
total += items[i].price;
```

This throws a `TypeError`.

### Bug 2

The `isAvailable()` function uses an assignment instead of a comparison:

```javascript
if (book.stock = 0) {
```

The `=` operator assigns `0` to `book.stock` instead of comparing its value.

It should compare using:

```javascript
if (book.stock === 0) {
```

### Bug 3

Inside `printBooks()`, the code accesses properties from the array instead of the current book object:

```javascript
console.log("Book:", books.title);
console.log("Price:", books.price);
```

Since `books` is an array, it does not have `title` or `price` properties.

The current book should first be stored in a variable and then accessed:

```javascript
const book = books[i];
console.log("Book:", book.title);
console.log("Price:", book.price);
```

---

## Fix

```javascript
const books = [
  { title: "Clean Code", price: 30, stock: 5 },
  { title: "JavaScript Basics", price: 20, stock: 0 },
  { title: "React Guide", price: 25, stock: 3 },
];

// 1) Calculate Total Price
function calculateTotalPrice(items) {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }

  return total;
}

// 2) Check Availability
function isAvailable(book) {
  if (book.stock === 0) {
    return false;
  }
  return true;
}

// 3) Print Books Report
function printBooks() {
  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    console.log("Book:", book.title);
    console.log("Price:", book.price);
    console.log("Available:", isAvailable(book));
  }
}

// Run Program
const total = calculateTotalPrice(books);
console.log("Total Price:", total);
printBooks();
```

---

## Validation

### Test Case 1: Calculate Total Price

**Code**

```javascript
const total = calculateTotalPrice(books);
console.log(total);
```

**Expected**

```text
75
```

**Actual**

```text
75
```

---

### Test Case 2: Check Book Availability

**Code**

```javascript
console.log(isAvailable(books[0]));
console.log(isAvailable(books[1]));
```

**Expected**

```text
true
false
```

**Actual**

```text
true
false
```

---

### Test Case 3: Print Books Report

**Code**

```javascript
printBooks();
```

**Expected**

```text
Book: Clean Code
Price: 30
Available: true
Book: JavaScript Basics
Price: 20
Available: false
Book: React Guide
Price: 25
Available: true
```

**Actual**

```text
Book: Clean Code
Price: 30
Available: true
Book: JavaScript Basics
Price: 20
Available: false
Book: React Guide
Price: 25
Available: true
```