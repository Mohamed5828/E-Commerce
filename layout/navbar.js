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
        <form class="search-form" id="search-form">
          <input
            class="new-search-input"
            id="newSearchInput"
            type="search"
            placeholder="Search For a Product"
          />
          <button id="submit-btn"
          type="submit">
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
    <form class="mobile-search-form" id="mobile-search-form">
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

  document.getElementById("mobile-search-form").addEventListener("keyup", () => {
    newSearchProducts(document.getElementById("mobile-search").value);
  });

  if (localStorage.getItem("theme") === "dark") {
    document.querySelectorAll('*').forEach(function (element) {
      document.body.classList.add("dark-mode");
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

export async function newSearchProducts(query) {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();
    renderData(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// export let flag=false;
// //Searching
// document.getElementById("search-form").addEventListener("submit", (event) => {
//   event.preventDefault();
//   const query = document.getElementById("newSearchInput").value;
//   flag=true
//   localStorage.setItem('key',query)
//   window.location.href = `products.html?q=${query}`;
// });

// newSearchProducts(localStorage.getItem("key"))

// document.getElementById("mobile-search-form").addEventListener("submit", (event) => {
//   event.preventDefault();
//   flag=true
//   const query = document.getElementById("mobile-search").value.trim();
//   if (query) {
//     window.location.href = `products.html?q=${query}`;
//   }
// });

// // document
// //   .getElementById("mobile-search-form")
// //   .addEventListener("submit", (event) => {
// //     event.preventDefault();
// //     const query = document.getElementById("mobile-search").value;
// //     window.location.href = `products.html?q=${query}`;
// //     newSearchProducts(query)
// //   });

// // document.addEventListener("DOMContentLoaded", () => {
// //   const urlParams = new URLSearchParams(window.location.search);
// //   const query = urlParams.get("q");

// //   if (query) {
// //     newSearchProducts(document.getElementById("newSearchInput").value);
// //   }
// // });


// // document.getElementById("searchForm").addEventListener("submit", (event) => {

// //   event.preventDefault();
// //   const query = document.getElementById("newSearchInput").value;
// //   newSearchProducts(query);
// // });

// // document.getElementById("mobileSearchForm").addEventListener("submit", (event) => {
// //   event.preventDefault();
// //   const query = document.getElementById("mobileSearch").value;
// //   newSearchProducts(query);
// // });

// // async function newSearchProducts(query) {
// //   try {
// //     const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
// //     const data = await res.json();
// //     renderData(data.products);
// //   } catch (error) {
// //     console.error("Error fetching products:", error);
// //   }
// // }

// // document
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