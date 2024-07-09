let currentPage = 1;
const itemsPerPage = 10;

const fetchData = async (page, limit) => {
    const response = await fetch(`https://dummyjson.com/products?skip=${(page-1) * limit}&limit=${limit}`);
    const data = await response.json();
    return data;
};

const renderData = (data) => {
    let products = document.querySelector('.product');
    products.innerHTML = data.map(item => `  <div class="card">    
    <img src="${item.thumbnail}" alt="thumbnail" class="perent">
    <div class="banner-content">
      ${item.description}
    </div>
    <div class="container">
      <h4>"${item.title}"</h4>
      <p>${item.price} L.E.</p>
    </div>
    </div>
`).join('');
};

const updatePaginationControls = (page, totalPages) => {
    document.getElementById('page-info').innerText = `Page ${page} of ${totalPages}`;
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = page === totalPages;
};

const loadData = async (page) => {
    const { products, total } = await fetchData(page, itemsPerPage);
    const totalPages = Math.ceil(total / itemsPerPage);
    renderData(products);
    updatePaginationControls(page, totalPages);
};

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadData(currentPage);
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentPage++;
    loadData(currentPage);
});

// Initial load
loadData(currentPage);
document.addEventListener("DOMContentLoaded", function () {
  let products = document.querySelector(".product");
  async function fetchProducts(url) {
    let data = await fetch(url);
    let response = await data.json();

    for (let i = 0; i < response.products.length; i++) {
      products.innerHTML += `  
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
  fetchProducts("https://dummyjson.com/products/");
});
