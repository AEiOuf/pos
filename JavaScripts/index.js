const products = [
    { name: "Coffee", price: 3.5 }
];

const cart = [];

const productsDiv = document.getElementById("products");
const cartUl = document.getElementById("cart");
const totalSpan = document.getElementById("total");

// Show products
products.forEach(product => {
    const button = document.createElement("button");
    button.innerText = `${product.name} - $${product.price}`;
    button.onclick = () => addToCart(product);
    productsDiv.appendChild(button);
});

function addToCart(product) {
    cart.push(product);
    updateCart();
}

function updateCart() {
    cartUl.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.name} - $${item.price}`;
        cartUl.appendChild(li);
        total += item.price;
    });
    totalSpan.innerText = total.toFixed(2);
}

function checkout() {
    alert(`You paid $${totalSpan.innerText}!`);
    cart.length = 0; // Empty the cart
    updateCart();
}