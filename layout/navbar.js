// //navbar samll
// const navList = document.querySelector(".nav-list");

// document.querySelector(".hamburger").onclick = () => {
//   navList.classList.add("show");
// };

// document.querySelector(".close").onclick = () => {
//   navList.classList.remove("show");
// };

// const body = document.body;
// if (localStorage.getItem("theme") === "dark") {
//   body.classList.add("dark-mode");
// }
import { initCart } from "./cart.js";

const navbarContainer = document.getElementById("navbar");
async function navbar() {
  const navbarData = `<div class="nav-container">
  <div class="logo">
        <img src="../Logo.png" alt="" />
          <h1>OShop</h1>
          </div>
          <div class="right-nav">
          <div class="search-nav">
          <form class="search-form">
          <input
          class="new-search-input"
          id="newSearchInput"
          type="search"
          placeholder="Search For a Product"
          />
          <button type="submit">
          <i class="fas fa-search"></i>
          </button>
          </form>
          </div>
          <div class="cart-person">
            <div class="profile-nav" onclick="location.href = './profile.html'">
              <i class="fas fa-user"></i>
            </div>
            <div class="cart-btn">
            <i class="fas fa-shopping-cart"></i>
              
              </div>
              </div>
              </div>
              </div> 
             <div class="mobile-search">
      <form class="mobile-search-form">
        <input type="search" placeholder="Search For a Product" />
        <button type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
              `;

  navbarContainer.innerHTML = navbarData;
}
navbar();
