// document.addEventListener("DOMContentLoaded", async function () {
//   const sidePanelContainer = document.getElementById("side-panel-container");
//   try {
//     const response = await fetch("https://dummyjson.com/products/categories");
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Error loading product data.");
//     }

//     const catLi = data
//       .map(
//         (cat) => `
//       <li><a href="#" data-category="${cat.slug}">${cat.name}</a></li>
//     `
//       )
//       .join(""); // Join the array to form a single string

//     let sidePanelHTML = `
//       <aside class="side-panel">
//         <ul>
//           ${catLi}
//         </ul>
//       </aside>
//     `;

//     sidePanelContainer.innerHTML = sidePanelHTML;
//   } catch (error) {
//     console.error(error);
//     sidePanelContainer.innerHTML = "<p>Error loading product data.</p>";
//   }
// });

// //display function
// function displayProducts(products) {
//   const productList = document.getElementById("product-list");
//   productList.innerHTML = "";

//   products.forEach((product) => {
//     const productDiv = document.createElement("div");
//     productDiv.className = "product";
//     productDiv.innerHTML = `
//               <img src="${product.thumbnail}">
//               <h2>${product.title}</h2>
//               <p>${product.description}</p><br>
//               <p>Price: $${product.price}</p>
//           `;
//     productList.appendChild(productDiv);
//   });
// }

// //aside categorization

// document.getElementById("toggle-panel").addEventListener("click", function () {
//   document.querySelector(".side-panel").classList.toggle("active");
//   document.querySelector(".toggle-panel-btn ").classList.toggle("active");
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
// }

// //searching
// document
//   .getElementById("newSearchInput")
//   .addEventListener("keyup", newsearchProducts);

// function newsearchProducts() {
//   const query = document.getElementById("newSearchInput").value;
//   fetch(`https://dummyjson.com/products/search?q=${query}`)
//     .then((res) => res.json())
//     .then((data) => {
//       displayProducts(data.products);
//     })
//     .catch((error) => {
//       console.error("Error fetching products:", error);
//     });
// }
