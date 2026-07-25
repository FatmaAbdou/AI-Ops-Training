Identify:
The getHighestGrade() function returns 0 instead of the highest value when the input array contains only negative numbers.

Reproduce enviornment:
Expected Result
-10
Actual Result
0

Root Cause:
The variable max is initialized to 0.

let max = 0;

This assumes that the maximum value will always be greater than or equal to 0. When every element in the array is negative.
As a result, max remains 0 even though 0 is not an element of the array.

Also, the loop starts at index 1, which assumes the first element has already been considered. Therefore, the first element is never actually compared.


Fix:
function getHighestGrade(grades) {
  let max = -Infinity;
for (let i = 0; i < grades.length; i++) {
    if (grades[i] > max) {
      max = grades[i];
    }
  }
return max;
}
console.log(getHighestGrade([-10, -50, -90]));


Validation:
Test Case 1: All Negative Numbers
console.log(getHighestGrade([-10, -50, -90]));

Expected: -10

Actual: -10 

Test Case 2: Positive Numbers
console.log(getHighestGrade([70, 85, 92, 88]));

Expected: 92

Actual: 92 

Test Case 3: Mixed Numbers
console.log(getHighestGrade([-5, 10, -2, 8]));

Expected: 10

Actual: 10 