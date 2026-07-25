

## Identify

The `printStudents()` function produces incorrect results because:

1. The `calculateAverage()` function iterates one element past the end of the `grades` array, causing the average to become `NaN`.
2. The `getStatus()` function is passed `student.grades` (an array) instead of the calculated `average` (a number).

---

## Reproduce Environment

### Expected Result

```text
------------
Name: Ahmed
Average: 90
Status: Passed
------------
Name: Sara
Average: 48.333333333333336
Status: Failed
------------
Name: Mona
Average: 92.33333333333333
Status: Passed
```

### Actual Result

```text
------------
Name: Ahmed
Average: NaN
Status: Failed
------------
Name: Sara
Average: NaN
Status: Failed
------------
Name: Mona
Average: NaN
Status: Failed
```

---

## Root Cause

### Bug 1

The loop in `calculateAverage()` uses:

```javascript
for (let i = 0; i <= grades.length; i++) {
```

Using `<=` causes the loop to access `grades[grades.length]`, which is `undefined`.

```javascript
total += undefined;
```

This causes `total` to become `NaN`, so the calculated average is also `NaN`.

### Bug 2

The `getStatus()` function expects a numeric average:

```javascript
function getStatus(average)
```

However, it is called with the student's grades array:

```javascript
const status = getStatus(student.grades);
```

Instead of the calculated average:

```javascript
const status = getStatus(average);
```

Passing an array instead of a number results in an incorrect comparison (`average >50`), so the student's status is not determined correctly.

---

## Fix

```javascript
function calculateAverage(grades) {
  let total = 0;

  for (let i = 0; i < grades.length; i++) {
    total += grades[i];
  }

  return total / grades.length;
}

function getStatus(average) {
  if (average > 50) {
    return "Passed";
  } else {
    return "Failed";
  }
}

function printStudents() {
  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const average = calculateAverage(student.grades);

    console.log("------------");
    console.log("Name:", student.name);
    console.log("Average:", average);

    const status = getStatus(average);
    console.log("Status:", status);
  }
}

printStudents();
```

---

## Validation

### Test Case 1: Student with Passing Average

**Code**

```javascript
const students = [
  {
    name: "Ahmed",
    grades: [80, 90, 100],
  },
];

printStudents();
```

**Expected**

```text
------------
Name: Ahmed
Average: 90
Status: Passed
```

**Actual**

```text
------------
Name: Ahmed
Average: 90
Status: Passed
```

---

### Test Case 2: Student with Failing Average

**Code**

```javascript
const students = [
  {
    name: "Sara",
    grades: [50, 40, 55],
  },
];

printStudents();
```

**Expected**

```text
------------
Name: Sara
Average: 48.333333333333336
Status: Failed
```

**Actual**

```text
------------
Name: Sara
Average: 48.333333333333336
Status: Failed
```

---

### Test Case 3: Multiple Students

**Code**

```javascript
printStudents();
```

**Expected**

```text
------------
Name: Ahmed
Average: 90
Status: Passed
------------
Name: Sara
Average: 48.333333333333336
Status: Failed
------------
Name: Mona
Average: 92.33333333333333
Status: Passed
```

**Actual**

```text
------------
Name: Ahmed
Average: 90
Status: Passed
------------
Name: Sara
Average: 48.333333333333336
Status: Failed
------------
Name: Mona
Average: 92.33333333333333
Status: Passed
```