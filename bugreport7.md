
## Identify

The order processing program produces incorrect results because:

1. The `calculateOrderTotal()` function incorrectly accesses `item.qty` as an array instead of a number, causing the total price to become `NaN`.
2. The `processOrders()` function uses `map()` with an asynchronous callback without waiting for all promises to complete, causing it to return an empty array before the asynchronous operations finish.
3. The `main()` function does not `await` the `processOrders()` function, so it logs a pending `Promise` instead of the processed order data.

---

## Reproduce Environment

### Expected Result

```text
Processing Orders...
[
  {
    "orderId": 1,
    "user": "User 101",
    "totalPrice": 840
  },
  {
    "orderId": 2,
    "user": "User 102",
    "totalPrice": 1550
  }
]
```

### Actual Result

```text
Processing Orders...
Promise { <pending> }
```

---

## Root Cause

### Bug 1

The `calculateOrderTotal()` function uses:

```javascript
total += item.price * item.qty[index];
```

The `qty` property is a number, not an array.

Attempting to access `item.qty[index]` returns `undefined`, resulting in:

```javascript
item.price * undefined;
```

which evaluates to `NaN`. Therefore, the total order price becomes `NaN`.

The correct implementation is:

```javascript
total += item.price * item.qty;
```

### Bug 2

The `processOrders()` function processes orders using:

```javascript
orders.map(async (order) => {
```

The callback is asynchronous, but the function immediately returns `results` before any of the asynchronous operations complete.

The promises created by `map()` should be awaited using `Promise.all()` to ensure all user data has been retrieved before returning the results.

### Bug 3

The `main()` function calls:

```javascript
const data = processOrders();
```

Since `processOrders()` is an asynchronous function, it returns a `Promise`.

Because it is not awaited, the program logs the pending `Promise` instead of the processed order data.

The correct implementation is:

```javascript
const data = await processOrders();
```

---

## Fix

```javascript
const orders = [
  {
    id: 1,
    items: [
      { name: "Phone", price: 800, qty: 1 },
      { name: "Case", price: 20, qty: 2 },
    ],
    userId: 101,
  },
  {
    id: 2,
    items: [
      { name: "Laptop", price: 1500, qty: 1 },
      { name: "Mouse", price: 50, qty: 1 },
    ],
    userId: 102,
  },
];

// Fake API Call
function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "User " + userId });
    }, 500);
  });
}

// Calculate Order Total
function calculateOrderTotal(order) {
  let total = 0;

  order.items.forEach((item) => {
    total += item.price * item.qty;
  });

  return total;
}

// Process Orders
async function processOrders() {
  const results = await Promise.all(
    orders.map(async (order) => {
      const user = await getUser(order.userId);
      const total = calculateOrderTotal(order);

      return {
        orderId: order.id,
        user: user.name,
        totalPrice: total,
      };
    })
  );

  return results;
}

// Run System
async function main() {
  const data = await processOrders();

  console.log("Processing Orders...");
  console.log(JSON.stringify(data, null, 2));
}

main();
```

---

## Validation

### Test Case 1: Calculate First Order Total

**Code**

```javascript
console.log(calculateOrderTotal(orders[0]));
```

**Expected**

```text
840
```

**Actual**

```text
840
```

---

### Test Case 2: Calculate Second Order Total

**Code**

```javascript
console.log(calculateOrderTotal(orders[1]));
```

**Expected**

```text
1550
```

**Actual**

```text
1550
```

---

### Test Case 3: Process All Orders

**Code**

```javascript
const data = await processOrders();
console.log(JSON.stringify(data, null, 2));
```

**Expected**

```text
Processing Orders...
[
  {
    "orderId": 1,
    "user": "User 101",
    "totalPrice": 840
  },
  {
    "orderId": 2,
    "user": "User 102",
    "totalPrice": 1550
  }
]
```

**Actual**

```text
Processing Orders...
[
  {
    "orderId": 1,
    "user": "User 101",
    "totalPrice": 840
  },
  {
    "orderId": 2,
    "user": "User 102",
    "totalPrice": 1550
  }
]
```