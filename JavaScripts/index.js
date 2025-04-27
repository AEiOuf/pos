const products = [

];

const cart = [];

const productsDiv = document.getElementById("products");
const cartUl = document.getElementById("cart");
const totalSpan = document.getElementById("total");
const inventoryList = document.getElementById("inventoryList");

// Save products to localStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Load products from localStorage
function loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        products.length = 0;
        products.push(...JSON.parse(storedProducts));
    }
}

// Show products
function renderProducts() {
    productsDiv.innerHTML = "";
    products.forEach(product => {
        const button = document.createElement("button");
        button.innerText = `${product.name} - P ${product.price}`;
        button.onclick = () => addToCart(product);
        productsDiv.appendChild(button);
    });
}

// Add to cart
function addToCart(product) {
    cart.push(product);
    updateCart();
}

// Update cart
function updateCart() {
    cartUl.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.name} - P${item.price}`;
        cartUl.appendChild(li);
        total += item.price;
    });
    totalSpan.innerText = total.toFixed(2);
}

// Checkout
function checkout() {
    alert(`You paid P${totalSpan.innerText}!`);
    cart.length = 0;
    updateCart();
}

// Tab switching
function showTab(tabId) {
    document.getElementById("checkoutTab").style.display = "none";
    document.getElementById("inventoryTab").style.display = "none";

    document.getElementById(tabId).style.display = "block";

    if (tabId === "inventoryTab") {
        renderInventory();
    } else if (tabId === "checkoutTab") {
        renderProducts();
    }
}

// Render inventory list
function renderInventory() {
    inventoryList.innerHTML = "";
    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${product.name} - P${product.price.toFixed(2)} 
      <button onclick="removeProduct(${index})">Remove</button>`;
        inventoryList.appendChild(li);
    });
}

// Add new product
function addProduct() {
    const nameInput = document.getElementById("newProductName");
    const priceInput = document.getElementById("newProductPrice");

    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (name && !isNaN(price)) {
        products.push({ name, price });
        nameInput.value = "";
        priceInput.value = "";
        saveProducts(); // <-- Save after adding
        renderInventory();
        renderProducts();
    } else {
        alert("Please enter valid product name and price.");
    }
}

function removeProduct(index) {
    products.splice(index, 1);
    saveProducts(); // <-- Save after removing
    renderInventory();
    renderProducts();
}

// Call this at the start
loadProducts();
renderProducts();

// Initial render
renderProducts();