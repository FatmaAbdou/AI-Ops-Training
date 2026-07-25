const students = [
  {
    name: "Ahmed",
    grades: [80, 90, 100],
  },
  {
    name: "Sara",
    grades: [50, 40, 55],
  },
  {
    name: "Mona",
    grades: [90, 95, 92],
  },
];
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