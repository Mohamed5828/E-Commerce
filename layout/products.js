let currentPage = 1;
const itemsPerPage = 10;

const fetchData = async (page, limit) => {
    const response = await fetch(`https://dummyjson.com/products?skip=${(page-1) * limit}&limit=${limit}`);
    const data = await response.json();
    return data;
};

const renderData = (data) => {
    let products = document.querySelector('.product');
    products.innerHTML = data.map(item => `  
    <div class="cards">    
        
        
    <p class="card-desc">${item.description}</p>
        <img class="card-img" src="${item.thumbnail}" alt="thumbnail" >
        

        <div class="container">
            <h4 class="card-title">"${item.title}"</h4>
            <p class="card-title">${item.price} L.E.</p>
        </div>

        <button class="addtocart">
            <div class="pretext">
                 ADD TO CART
            </div>
        </button>

    </div>
`).join('');
};

const updatePaginationControls = (page, totalPages) => {
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = page === totalPages;

    const pageButtonsContainer = document.getElementById('page-buttons');
    pageButtonsContainer.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('page-button');
        if (i === page) {
            button.classList.add('active');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            loadData(currentPage);
        });
        pageButtonsContainer.appendChild(button);
    }

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
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
}
