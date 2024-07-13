import { initCart } from "./cart.js";

let currentPage = 1;
export const itemsPerPage = 10;
let selectedCategory = "all";

export const renderData = (data) => {
  const products = document.querySelector(".product");
  products.innerHTML = data
    .map(
      (item) => `
    <div class="cards"> 
      <a href="${window.location.origin}/layout/SingleProductPage.html?product=${item.id}">
        <div class="card-desc">
          <p>${item.description}</p>
        </div>
        <img class="card-img" src="${item.thumbnail}" alt="thumbnail">
        <div class="container">
          <h4 class="card-title">${item.title}</h4>
          <p class="card-title">${item.price} L.E.</p>
        </div>
      </a>
      <button class="add-to-cart-btn" id="addToCartBtn" data-id=${item.id}>Add to cart</button>
    </div>
  `
    )
    .join("");
};

export const updatePaginationControls = (page, totalPages) => {
  document.getElementById("prev-btn").disabled = page === 1;
  document.getElementById("next-btn").disabled = page === totalPages;

  const pageButtonsContainer = document.getElementById("page-buttons");
  pageButtonsContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.innerText = i;
    button.classList.add("page-button");
    if (i === page) {
      button.classList.add("active");
    }
    button.addEventListener("click", () => {
      currentPage = i;
      updateURLParams();
      loadData(currentPage, selectedCategory);
    });
    pageButtonsContainer.appendChild(button);
  }
};

const loadData = async (page, category = "all", query = null) => {
  const { products, total } = await fetchData(
    page,
    itemsPerPage,
    category,
    query
  );
  const totalPages = Math.ceil(total / itemsPerPage);
  renderData(products);
  updatePaginationControls(page, totalPages);
};

const fetchData = async (page, limit, category = "all", query = null) => {
  const skip = (page - 1) * limit;
  let url;

  if (query) {
    url = `https://dummyjson.com/products/search?q=${query}&skip=${skip}&limit=${limit}`;
  } else if (category === "all") {
    url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
  } else {
    url = `https://dummyjson.com/products/category/${category}?skip=${skip}&limit=${limit}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const loadCategories = async () => {
  const sidePanelContainer = document.getElementById("side-panel-container");
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Error loading product data.");
    }

    const catLi = data
      .map(
        (cat) =>
          `<li><a href="#" data-category="${cat.slug}">${cat.name}</a></li>`
      )
      .join("");

    const sidePanelHTML = `
      <aside class="side-panel">
        <ul>
          <li><a href="#" data-category="all">All Categories</a></li>
          ${catLi}
        </ul>
      </aside>`;

    sidePanelContainer.innerHTML = sidePanelHTML;

    document.querySelectorAll(".side-panel a").forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const category = this.getAttribute("data-category");
        selectedCategory = category;
        currentPage = 1;
        updateURLParams();
        loadData(currentPage, category);
      });
    });

    initializeCart();
  } catch (error) {
    console.error(error);
    sidePanelContainer.innerHTML = "<p>Error loading Categories data.</p>";
  }
};

async function initializeCart() {
  try {
    await initCart();
  } catch (error) {
    console.error("Error Initializing the Cart " + error);
  }
}

const updateURLParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (selectedCategory !== "all") {
    urlParams.set("category", selectedCategory);
  } else {
    urlParams.delete("category");
  }
  urlParams.set("page", currentPage);
  window.history.replaceState(null, null, `?${urlParams.toString()}`);
};

document.addEventListener("DOMContentLoaded", () => {
  loadCategories();
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");
  const category = urlParams.get("category");
  const page = parseInt(urlParams.get("page")) || 1;

  currentPage = page;
  selectedCategory = category || "all";

  if (query) {
    loadData(currentPage, selectedCategory, query);
  } else {
    loadData(currentPage, selectedCategory);
  }

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
});
