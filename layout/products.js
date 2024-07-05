document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.product');
    async function fetchProducts(url) {
      let data = await fetch(url);
      let response =  await data.json();
  
      for (let i = 0; i < response.products.length; i++) {
        products.innerHTML +=  `  
        <div class="card">    
        <img src="${response.products[i].thumbnail}" alt="thumbnail">
        <div class="container">
          <h4>"${response.products[i].title}"</h4>
          <p>${response.products[i].price} L.E.</p>
        </div>
        </div>
    `;
      }
    }
    fetchProducts('https://dummyjson.com/products/');
  });
  