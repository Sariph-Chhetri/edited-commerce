const arr = [
    { price: 50, quantity: 3 },
    { price: 100, quantity: 2 }
];

const totalPrice = arr.reduce((acc, item) => acc + item.price * item.quantity, 0);

console.log(totalPrice); // Output: 350
