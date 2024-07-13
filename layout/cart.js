import { fetchData } from "../utils/FetchData.js";
import { fetchCarts, putCarts } from "../utils/HandleAPI.js";
import { handleCheckout } from "../utils/HandleOrders.js";

export async function initCart() {
  const closeCartBtn = document.querySelector(".close-cart");
  const clearCartBtn = document.querySelector(".clear-cart");
  const cartDOM = document.querySelector(".cart");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartTotal = document.querySelector(".cart-total");
  const cartContent = document.querySelector(".cart-content");
  const productsDOM = document.querySelector(".products-center");
  const openCartBtn = document.querySelector(".cart-btn");
  const checkout = document.querySelector(".checkout");

  let buttonsDOM = [];
  let cart = [];
  emptyCartUi();
  async function getAddToCartBtn() {
    const buttons = [...document.querySelectorAll(".add-to-cart-btn")];
    buttonsDOM = buttons;
    buttons.forEach((btn) => {
      let id = btn.dataset.id;

      btn.addEventListener("click", async (event) => {
        event.target.disabled = true;
        event.target.innerText = "In Cart";

        try {
          const { data, isLoading, isError } = await fetchData(
            `https://dummyjson.com/products/${id}`
          );

          if (isLoading) {
            mainDiv.innerHTML = "<p>Loading...</p>";
            return;
          }

          if (isError) {
            mainDiv.innerHTML = "<p>Error loading product data.</p>";
            return;
          }

          const newlyClickedPro = data;

          cart = [...cart, { ...newlyClickedPro, amount: 1 }];
          saveCart(cart);
          calculateCartValues(cart);
          addToCart(newlyClickedPro);
          openCart();
        } catch (error) {
          console.error("Error in main function:", error);
          event.target.disabled = false;
          event.target.innerText = "Add to Cart";
        }
      });

      let inCart = cart.find((cartItem) => {
        return cartItem.id == id;
      });
      if (inCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }
    });
  }

  function calculateCartValues(cart) {
    let total = cart.reduce((acc, item) => acc + item.price * item.amount, 0);
    cartTotal.innerText = parseFloat(total.toFixed(2));
  }

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
          <p class="item-amount">${1}</p>
          <i class="fas fa-chevron-down" data-id=${cartItem.id}></i>
      </div> 
    `;
    div.querySelector(".remove-item").addEventListener("click", removeCartItem);
    div
      .querySelector(".fa-chevron-up")
      .addEventListener("click", increaseAmount);
    div
      .querySelector(".fa-chevron-down")
      .addEventListener("click", decreaseAmount);
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

  function emptyCartUi() {
    cart = [];
    while (cartContent.firstChild) {
      cartContent.removeChild(cartContent.firstChild);
    }

    calculateCartValues(cart);
    updateButtons();
  }

  function clearCart() {
    cart = [];
    while (cartContent.firstChild) {
      cartContent.removeChild(cartContent.firstChild);
    }
    saveCart(cart);
    calculateCartValues(cart);
    updateButtons();
    closeCart();
  }

  closeCartBtn.addEventListener("click", closeCart);
  clearCartBtn.addEventListener("click", clearCart);
  openCartBtn.addEventListener("click", openCart);
  checkout.addEventListener("click", (e) => {
    checkoutCart();
    e.stopPropagation;
  });
  function populateCart(cart) {
    cart.forEach((item) => addToCart(item));
  }

  function removeCartItem(event) {
    let removeItem = event.target;
    let id = removeItem.getAttribute("data-id");
    cartContent.removeChild(removeItem.parentElement.parentElement);
    removeItemFromCart(id);
  }

  function increaseAmount(event) {
    let addAmount = event.target;
    let id = addAmount.getAttribute("data-id");
    let tempItem = cart.find((item) => {
      return item.id == id;
    });
    tempItem.amount++;
    saveCart(cart);
    calculateCartValues(cart);
    addAmount.nextElementSibling.innerText = tempItem.amount;
  }

  function decreaseAmount(event) {
    let lowerAmount = event.target;
    let id = lowerAmount.getAttribute("data-id");
    let tempItem = cart.find((item) => {
      return item.id == id;
    });
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

  function removeItemFromCart(id) {
    cart = cart.filter((item) => item.id != id);
    console.log(cart);
    calculateCartValues(cart);
    saveCart(cart);
    updateButtons();
  }

  function saveCart(cart) {
    putCarts(cart);
  }

  async function checkoutCart() {
    if (cart.length != 0) {
      try {
        await handleCheckout();
        clearCart();
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Cart is Empty");
    }
  }

  function updateButtons() {
    buttonsDOM.forEach((btn) => {
      let id = btn.dataset.id;
      let inCart = cart.find((cartItem) => cartItem.id == id);
      if (inCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      } else {
        btn.innerText = "Add to Cart";
        btn.disabled = false;
      }
    });
  }
  async function fetchInitialCart() {
    try {
      let fetchedCart = await fetchCarts();
      cart = fetchedCart;
    } catch (error) {
      console.error(error);
    }
  }
  await fetchInitialCart();

  calculateCartValues(cart);
  populateCart(cart);
  getAddToCartBtn();
  console.log("loaded");
  updateButtons(); // Ensure button states are consistent on initialization
}
export function clearCartOnLogout() {
  initCart();
}
