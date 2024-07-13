let currentPage = 1;
const itemsPerPage = 10;
import { initCart } from "./cart.js";

async function initializeCart() {
  try {
    initCart();
  } catch (error) {
    console.error("Error Initializing the Cart " + error);
  }
}
const fetchData = async (page, limit, category = "all") => {
  const skip = (page - 1) * limit;
  const url =
    category === "all"
      ? `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
      : `https://dummyjson.com/products/category/${category}?skip=${skip}&limit=${limit}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const renderData = (data) => {
  const products = document.querySelector(".product");
  products.innerHTML = data
    .map(
      (item) => `  
    <div class="cards"> 
        <a href="http://127.0.0.1:5500/layout/SingleProductPage.html?product=${item.id}">
            <p class="card-desc">${item.description}</p>
            <img class="card-img" src="${item.thumbnail}" alt="thumbnail" >
            <div class="container">
            <h4 class="card-title">"${item.title}"</h4>
            <p class="card-title">${item.price} L.E.</p>
            </div>
        </a>
      <button class="add-to-cart-btn" id="addToCartBtn" data-id=${item.id}>Add to cart</button>
      </div>
      `
    )
    .join("");
};

const updatePaginationControls = (page, totalPages) => {
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
      loadData(currentPage, selectedCategory);
    });
    pageButtonsContainer.appendChild(button);
  }
};

const loadData = async (page, category = "all") => {
  const { products, total } = await fetchData(page, itemsPerPage, category);
  const totalPages = Math.ceil(total / itemsPerPage);
  renderData(products);
  updatePaginationControls(page, totalPages);
};

document.getElementById("prev-btn").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    loadData(currentPage, selectedCategory);
  }
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentPage++;
  loadData(currentPage, selectedCategory);
});

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
        currentPage = 1; // Reset to first page when category changes
        loadData(currentPage, category);
      });
    });
    initializeCart();
  } catch (error) {
    console.error(error);
    sidePanelContainer.innerHTML = "<p>Error loading Categories data.</p>";
  }
};

let selectedCategory = "all";

loadCategories();
loadData(currentPage, selectedCategory);

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}
