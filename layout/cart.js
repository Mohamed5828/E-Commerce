const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

let cart = [];
let buttonsDOM = [];

// Function to get and set up the Add to Cart buttons
function getAddToCartBtn() {
  const buttons = [...document.querySelectorAll(".add-to-cart-btn")];
  buttonsDOM = buttons;

  buttons.forEach((btn) => {
    let id = btn.dataset.id;

    btn.addEventListener("click", (event) => {
      event.target.disabled = true;
      event.target.innerText = "In Cart";

      let newlyClickedPro = products.find((pro) => pro.id === id);
      cart = [...cart, { ...newlyClickedPro, amount: 1 }];
      saveCart(cart);
      calculateCartValues(cart);
      addToCart(newlyClickedPro);
      openCart();
    });
    // Item already in cart disable the button
    let inCart = cart.find((cartItem) => cartItem.id === id);
    if (inCart) {
      btn.innerText = "In Cart";
      btn.disabled = true;
    }
  });
}

// Function to calculate and update the cart total values
function calculateCartValues(cart) {
  let total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
  cartTotal.innerText = parseFloat(total.toFixed(2));
}

// Function to add a cart item to the DOM and attach event listeners
function addToCart(cartItem) {
  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML = `
    <img src=${cartItem.thumbnail} alt="product">
    <div>
        <h4>${cartItem.title}</h4>
        <h5>$${cartItem.price}</h5>
        <span class="remove-item" data-id=${cartItem.id}>Remove</span>
    </div>
    <div>
        <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
        <p class="item-amount">${cartItem.amount}</p>
        <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
    </div> 
  `;
  div.querySelector(".remove-item").addEventListener("click", removeCartItem);
  div.querySelector(".fa-chevron-up").addEventListener("click", increaseAmount);
  div
    .querySelector(".fa-chevron-down")
    .addEventListener("click", decreaseAmount);
  cartContent.appendChild(div);
}

// Function to open the cart
function openCart() {
  cartOverlay.classList.add("transparentBg");
  cartDOM.classList.add("showCart");
}

// Function to close the cart
function closeCart() {
  cartOverlay.classList.remove("transparentBg");
  cartDOM.classList.remove("showCart");
}

// Function to clear the cart
function clearCart() {
  cart = [];
  while (cartContent.firstChild) {
    cartContent.removeChild(cartContent.firstChild);
  }
  saveCart(cart);
  calculateCartValues(cart);
}

// Attach event listeners to cart buttons
cartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
clearCartBtn.addEventListener("click", clearCart);

// Function to populate the cart with items from storage
function populateCart(cart) {
  cart.forEach((item) => addToCart(item));
}

// Function to remove a cart item
function removeCartItem(event) {
  let removeItem = event.target;
  let id = removeItem.dataset.id;
  cartContent.removeChild(removeItem.parentElement.parentElement);
  removeItemFromCart(id);
}

// Function to increase the amount of a cart item
function increaseAmount(event) {
  let addAmount = event.target;
  let id = addAmount.dataset.id;
  let tempItem = cart.find((item) => item.id === id);
  tempItem.amount++;
  saveCart(cart);
  calculateCartValues(cart);
  addAmount.nextElementSibling.innerText = tempItem.amount;
}

// Function to decrease the amount of a cart item
function decreaseAmount(event) {
  let lowerAmount = event.target;
  let id = lowerAmount.dataset.id;
  let tempItem = cart.find((item) => item.id === id);
  tempItem.amount--;
  if (tempItem.amount > 0) {
    saveCart(cart);
    calculateCartValues(cart);
    lowerAmount.previousElementSibling.innerText = tempItem.amount;
  } else {
    cartContent.removeChild(lowerAmount.parentElement.parentElement);
    removeItemFromCart(id);
  }
}

// Function to remove an item from the cart and update storage
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart(cart);
  calculateCartValues(cart);
}

// Function to save the cart to local storage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Fetch the cart from local storage and populate it
const fetchedCart = JSON.parse(localStorage.getItem("cart")) || [];
calculateCartValues(fetchedCart);
populateCart(fetchedCart);

// Call this function after DOM content is loaded to set up buttons
document.addEventListener("DOMContentLoaded", () => {
  getAddToCartBtn();
});
