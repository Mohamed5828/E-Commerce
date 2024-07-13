//Searching
// document.getElementById("searchIcon").addEventListener("click", function () {
//   let searchInput = document.getElementById("newSearchInput");
//   if (searchInput.classList.contains("show")) {
//     searchInput.classList.remove("show");
//   } else {
//     searchInput.classList.add("show");
//     searchInput.focus();
//   }
// });
// document.getElementById("newSearchInput").addEventListener("blur", function () {
//   let searchInput = document.getElementById("newSearchInput");
//   searchInput.classList.remove("show");
// });

document
  .getElementById("newSearchInput")
  .addEventListener("keyup", newsearchProducts);

function newsearchProducts() {
  const query = document.getElementById("newSearchInput").value;
  fetch(`https://dummyjson.com/products/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      displayProducts(data.products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
}

//Categorization

function categorizeProducts() {
  const category = document.getElementById("category").value;

  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayProducts(data.products))
    .catch((error) => console.error("Error fetching products:", error));
}

//display function
function displayProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
            <img src="${product.thumbnail}">
            <h2>${product.title}</h2>
            <p>${product.description}</p><br>
            <p>Price: $${product.price}</p>
        `;
    productList.appendChild(productDiv);
  });
}

//aside categorization

// document.getElementById("toggle-panel").addEventListener("click", function () {
//   document.querySelector(".side-panel").classList.toggle("active");
// });
// function closeNav() {
//   document.querySelector(".side-panel").classList.toggle("active");
// }

// document.querySelectorAll(".side-panel a").forEach((link) => {
//   link.addEventListener("click", function (event) {
//     event.preventDefault();
//     const category = this.getAttribute("data-category");
//     categorizeProducts(category);
//   });
// });

// function categorizeProducts(category) {
//   fetch(`https://dummyjson.com/products/category/${category}`)
//     .then((res) => res.json())
//     .then((data) => displayProducts(data.products))
//     .catch((error) => console.error("Error fetching products:", error));
//}
