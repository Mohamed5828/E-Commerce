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
import {renderData} from "./products.js";

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
        <div class="theme-btn">
          <i class="far fa-moon" id="moon-icon"></i>
          <i class="far fa-sun" id="sun-icon"></i>
        </div>
      </div>
    </div>
  </div> 
  <div class="mobile-search">
    <form class="mobile-search-form">
      <input id="mobile-search" type="search" placeholder="Search For a Product" />
      <button type="submit">
        <i class="fas fa-search"></i>
      </button>
    </form>
  </div>`;

  navbarContainer.innerHTML = navbarData;

  document.getElementById("moon-icon").addEventListener("click", toggleTheme);
  document.getElementById("sun-icon").addEventListener("click", toggleTheme);

  document.getElementById("newSearchInput").addEventListener("keyup", () => {
    newSearchProducts(document.getElementById("newSearchInput").value);
  });

  if (localStorage.getItem("theme") === "dark") {
    document.querySelectorAll('*').forEach(function (element) {
      element.classList.add("dark-mode");
    });
  } else {
    document.querySelectorAll('*').forEach(function (element) {
      element.classList.remove("dark-mode");
    });
  }
}

navbar();

function toggleTheme() {
  document.querySelectorAll('*').forEach(function (element) {
    element.classList.toggle("dark-mode");
  });

  // Save the style in local storage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

//Searching
document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("newSearchInput").value;
  window.location.href = `products.html?query=${query}`;
});

document
    .getElementById("mobileSearchForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const query = document.getElementById("mobileSearch").value;
      window.location.href = `products.html?query=${query}`;
    });

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (query) {
    newSearchProducts(query);
  }
});

async function newSearchProducts(query) {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();
    renderData(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// document.getElementById("searchForm").addEventListener("submit", (event) => {

//   event.preventDefault();
//   const query = document.getElementById("newSearchInput").value;
//   newSearchProducts(query);
// });

// document.getElementById("mobileSearchForm").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const query = document.getElementById("mobileSearch").value;
//   newSearchProducts(query);
// });

// async function newSearchProducts(query) {
//   try {
//     const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
//     const data = await res.json();
//     renderData(data.products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//   }
// }

// document
//   .getElementById("newSearchInput")
//   .addEventListener("keyup", () => {
//     newSearchProducts(document.getElementById("newSearchInput").value)
//   });

// document.
//   getElementById("mobile-search")
//   .addEventListener("keyup", () => {
//     newSearchProducts(document.getElementById("mobile-search").value)
//   })

// function newSearchProducts(query) {
// //  const query = document.getElementById("newSearchInput").value;
//   fetch(`https://dummyjson.com/products/search?q=${query}`)
//     .then((res) => res.json())
//     .then((data) => {
//       renderData(data.products);
//     })
//     .catch((error) => {
//       console.error("Error fetching products:", error);
//     });
// }
