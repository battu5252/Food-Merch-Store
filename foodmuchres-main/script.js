const products = [
  { id: 1, name: "Pizza ", price: 499, image: "images/pizza.jpg" },
  { id: 2, name: "Burger", price: 299, image: "images/burger.jpg" },
  { id: 3, name: "Cold Drink", price: 100, image: "images/Cold Drink.jpg" }
];

let cart = [];

function renderProducts() {
  const list = document.getElementById("product-list");
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

function addToCart(id) {
  const found = cart.find(p => p.id === id);
  if (found) {
    found.qty++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartList = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  cartList.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    sum += item.qty * item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.qty} - ₹${item.qty * item.price}
      <button onclick="removeItem(${item.id})">❌</button>`;
    cartList.appendChild(li);
  });

  total.innerText = sum;
}

function removeItem(id) {
  cart = cart.filter(p => p.id !== id);
  updateCart();
}

function checkout() {
  alert("✅ Order placed! Thank you!");
  cart = [];
  updateCart();
  closeCart();
}

function closeCart() {
  document.getElementById("cart-modal").style.display = "none";
}

document.getElementById("cart-btn").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "block";
});

renderProducts();