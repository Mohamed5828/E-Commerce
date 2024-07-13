import { handleSearch } from "./search.js";

const renderNavbar = () => {
  const navbarContainer = document.getElementById("navbar");
  const navbarData = `
    <div class="nav-container">
      <div class="logo">
        <img src="../Logo.png" alt="" />
        <h1>OShop</h1>
      </div>
      <div class="right-nav">
        <div class="search-nav">
          <form class="search-form" id="search-form">
            <input
              class="new-search-input search-input-important"
              id="newSearchInput"
              type="search"
              placeholder="Search For a Product"
            />
            <button id="submit-btn" type="submit">
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
        <input id="mobile-search" type="search" placeholder="Search For a Product" class="search-input-important"/>
        <button type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>`;

  navbarContainer.innerHTML = navbarData;

  const searchForm = document.getElementById("search-form");
  const mobileSearchForm = document.getElementById("mobile-search-form");

  if (searchForm) {
    searchForm.addEventListener("submit", handleSearch);
  }

  if (mobileSearchForm) {
    mobileSearchForm.addEventListener("submit", handleSearch);
  }

  document.getElementById("moon-icon").addEventListener("click", toggleTheme);
  document.getElementById("sun-icon").addEventListener("click", toggleTheme);

  if (localStorage.getItem("theme") === "dark") {
    document
      .querySelectorAll("*")
      .forEach((element) => element.classList.add("dark-mode"));
  } else {
    document
      .querySelectorAll("*")
      .forEach((element) => element.classList.remove("dark-mode"));
  }
};

function toggleTheme() {
  document
    .querySelectorAll("*")
    .forEach((element) => element.classList.toggle("dark-mode"));

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

document.addEventListener("DOMContentLoaded", renderNavbar);
