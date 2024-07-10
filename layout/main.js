document.addEventListener('DOMContentLoaded', function() {
    const sidePanelContainer = document.getElementById('side-panel-container');
    
    const sidePanelHTML = `
        <aside class="side-panel">
            <ul>
                <li><a href="#" data-category="smartphones">smartphones</a></li>
                <li><a href="#" data-category="beauty">beauty</a></li>
                <li><a href="#" data-category="fragrances">fragrances</a></li>
                <li><a href="#" data-category="furniture">furniture</a></li>
                <li><a href="#" data-category="groceries">groceries</a></li>
                <li><a href="#" data-category="home-decoration">home-decoration</a></li>
                <li><a href="#" data-category="kitchen-accessories">kitchen-accessories</a></li>
                <li><a href="#" data-category="laptops">laptops</a></li>
                <li><a href="#" data-category="mens-shirts">mens-shirts</a></li>
                <li><a href="#" data-category="mens-shoes">mens-shoes</a></li>
                <li><a href="#" data-category="mens-watches">mens-watches</a></li>
                <li><a href="#" data-category="mobile-accessories">mobile-accessories</a></li>
                <li><a href="#" data-category="motorcycle">motorcycle</a></li>
                <li><a href="#" data-category="skin-care">skin-care</a></li>
                <li><a href="#" data-category="sports-accessories">sports-accessories</a></li>
                <li><a href="#" data-category="sunglasses">sunglasses</a></li>
                <li><a href="#" data-category="tablets">tablets</a></li>
                <li><a href="#" data-category="tops">tops</a></li>
                <li><a href="#" data-category="vehicles">vehicles</a></li>
                <li><a href="#" data-category="womens-bags">womens-bags</a></li>
                <li><a href="#" data-category="womens-dresses">womens-dresses</a></li>
                <li><a href="#" data-category="womens-shoes">womens-shoes</a></li>
                <li><a href="#" data-category="womens-watches">womens-watches</a></li>
            </ul>
        </aside>
    `;

    sidePanelContainer.innerHTML = sidePanelHTML;
});

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
  
  document.getElementById('toggle-panel').addEventListener('click', function() {
      document.querySelector('.side-panel').classList.toggle('active');
      document.querySelector('.toggle-panel-btn ').classList.toggle('active');
    });
  function closeNav() {
      document.querySelector('.side-panel').classList.toggle('active');
    }
  
    document.querySelectorAll('.side-panel a').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const category = this.getAttribute('data-category');
        categorizeProducts(category);
      });
    });
    
    function categorizeProducts(category) {
      fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => displayProducts(data.products))
        .catch(error => console.error('Error fetching products:', error));
    }
    

//searching 
document.getElementById('newSearchInput').addEventListener('keyup',newsearchProducts)

function newsearchProducts(){
    const query=document.getElementById('newSearchInput').value;
    fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}