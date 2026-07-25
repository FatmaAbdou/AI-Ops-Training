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