const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const ProductsDOM = document.querySelector(".products-center");
const copyRight = document.querySelector(".copyright");

let cart = [];
let buttonsDOM = [];

function getAddToCartBtn() {
  buttons = [...document.querySelectorAll(".add-to-cart-btn")];
  buttonsDOM = buttons;
  //the page is loaded then we capture all the add to cart btns
  buttons.forEach((btn) => {
    let id = btn.dataset.id;

    //add event to the btns
    btn.addEventListener("click", (event) => {
      event.target.disabled = true;
      event.target.innerText = "In Cart";

      let newlyClickedPro = ProductsDOM.find((pro) => pro.id === id);
      cart = [...cart, newlyClickedPro];
      saveCart(cart);
      calculateCartValues(cart);
      addToCart(newlyClickedPro);
      openCart();
    });

    //we check if its already in cart we change the text and disable the btn
    let inCart = cart.find((cartItem) => cartItem.id === id);
    if (inCart) {
      btn.innerText = "In Cart";
      btn.disabled = true;
    }
  });
}
function calculateCartValues(cart) {
  let total = 0;
  cart.map((item) => {
    total += item.price * item.price;
  });
  cartTotal.innerText = parseFloat(total.toFixed(2));
}

function addToCart(cartItem) {
  const div = document.createElement("div");
  div.classList("cart-item");
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
    </div> `;
  cartContent.appendChild(div);
}

function openCart() {
  cartOverlay.classList.add("transparentBg");
  cartDOM.classList.add("showCart");
}
function closeCart() {
  cartOverlay.classList.remove("transparentBg");
  cartDOM.classList.remove("showCart");
}
function clearCart() {
  //clear all the cart content
}
cartBtn.addEventListener("click", openCart());
closeCartBtn.addEventListener("click", closeCart());

//need to implement function and call it to get the cart items and populate it
// function populate(cart){ cart.forEach((item)=> addToCart(item))}
//calculateCartValue(fetchedCart)
//populate(fetchedCart)

function handleCart() {
  clearCartBtn.addEventListener("click", clearCartBtn());
}
