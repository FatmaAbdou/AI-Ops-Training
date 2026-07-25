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