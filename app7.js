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