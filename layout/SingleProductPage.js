import { fetchData } from "../utils/FetchData.js";
import { initCart } from "./cart.js";

const body = document.body;
let params = new URLSearchParams(location.search);
let mainDiv = document.getElementById("main");
let navbar = document.getElementById("navbar-container");
let cart = document.getElementById("cart-container");
async function main() {
  try {
    const { data, isLoading, isError } = await fetchData(
      `https://dummyjson.com/products/${params.get("product")}`
    );

    if (isLoading) {
      mainDiv.innerHTML = "<p>Loading...</p>";
      return;
    }

    if (isError) {
      mainDiv.innerHTML = "<p>Error loading product data.</p>";
      return;
    }

    let currentImage = data.thumbnail;

    const reviewsHtml = data.reviews
      .map(
        (review) => `
      <div class="review">
      <div class="review-info">
      <p>Date: ${review.date.slice(0, 10)}</p>
        <p>Rating: ${review.rating}</p>
      </div>
      <p><strong>${review.reviewerName}:</strong> ${review.comment}</p>
      </div>
    `
      )
      .join("");
    const dataImages = data.images
      .map(
        (image) => `
       <li
                class=${
                  currentImage == image
                    ? "small-img-container active"
                    : "small-img-container"
                }
              >
                <img class="small-img" src=${image} />
              </li>
    `
      )
      .join("");

    mainDiv.innerHTML = `
      <div class="single-product-container">
        <div class="all-img-container">
          <div class="normal-img-container">
            <img src="${currentImage}" id="currentImage" alt="Current Image"/>
          </div>
          <div class="alt-img-container">
            <ul class="image-ul">
              ${dataImages}
            </ul>
          </div>
          <div class="title">
            <div class="border-element">
              <h2 class="font-semibold">${data.title}</h2>
            </div>
            <div class="border-element">
              <ul class="lite-info-ul">
              <li class="lite-info-li">Brand: ${data.brand}</li>
              <li class="lite-info-li">SKU: ${data.sku}</li>
              <li class="lite-info-li">Rating: ${data.rating}</li>
              <li class="lite-info-li"> Available: ${
                data.availabilityStatus
              }</li>
                <li class="lite-info-li">Package Dimensions: 
                <span class="small-dimen">
                width: ${data.dimensions.width}, height:  ${
      data.dimensions.height
    }, depth:  ${data.dimensions.depth}
                    </span>
                  </li>
                <li class="lite-info-li">Shipping Weight: ${
                  data.weight
                } Grams</li>
              </ul>
            </div>
            <div class="price font-bold">Price: ${data.price} L.E.</div>
            <button class="add-to-cart-btn" id="addToCartBtn" data-id=${params.get(
              "product"
            )}>Add to cart</button>
          </div>
        </div>
        <div class="product-overview">
          <div class="overview-title">
            <h2>Product Overview</h2>
          </div>
          <div class="overview-info">
            <div class="item-row">
              <h2 class="info-title">Description </h2>
              <div class="description">${data.description}</div>
              <h2 class="info-title">Return Policy</h2>
              <div class="description">${data.returnPolicy}</div>
              <h2 class="info-title">Warranty</h2>
              <div class="description">${data.warrantyInformation}</div>
              <h2 class="info-title">Reviews</h2>
              <div class="reviews">${reviewsHtml}</div>
            </div>
          </div>
        </div>
      </div>`;

    document.querySelectorAll(".small-img-container").forEach((item) => {
      item.addEventListener("click", (event) => {
        currentImage = event.currentTarget.children[0].getAttribute("src");
        document.getElementById("currentImage").src = currentImage;
        document.querySelectorAll(".small-img-container").forEach((imgItem) => {
          imgItem.classList.remove("active");
        });
        event.currentTarget.classList.add("active");
      });
    });

    initCart();
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}
