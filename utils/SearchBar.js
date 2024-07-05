document.getElementById('search-button').addEventListener('click', searchProducts);

function searchProducts() {
    const query = document.getElementById('search-input').value;
    fetch(`https://dummyjson.com/products/search?q=${query}`)
        .then(res => res.json())
        .then(data => {
            displayProducts(data.products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.thumbnail}">
            <h2>${product.title}</h2>
            <p>${product.description}</p><br>
            <p>Price: $${product.price}</p>
        `;
        productList.appendChild(productDiv);
    });
}
