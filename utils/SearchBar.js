<<<<<<< HEAD
=======
//Searching
>>>>>>> 0ec206c4c21ee06b1a88d8b029f490016c1fb27d
document.getElementById('searchIcon').addEventListener('click', function() {
    let searchInput = document.getElementById('newSearchInput');
    if (searchInput.classList.contains('show')) {
        searchInput.classList.remove('show');
    } else {
        searchInput.classList.add('show');
        searchInput.focus();
    }
});
document.getElementById('newSearchInput').addEventListener('blur', function() {
    let searchInput = document.getElementById('newSearchInput');
    searchInput.classList.remove('show');
});

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

<<<<<<< HEAD
=======

//Categorization
const dropdownToggle = document.getElementById("dropdowntoggle");
const dropdownMenu = document.getElementById('dropdownmenu');

function categorizeProducts() {
    const category = document.getElementById('category').value;

    fetch(`https://dummyjson.com/products/category/${category}`)
        .then(res => res.json())
        .then(data => displayProducts(data.products))
        .catch(error => console.error('Error fetching products:', error));
}


//display function
>>>>>>> 0ec206c4c21ee06b1a88d8b029f490016c1fb27d
function displayProducts(products){
    const productList = document.getElementById('product-list');
    productList.innerHTML= '';

    products.forEach(product => {
        const productDiv=document.createElement('div');
        productDiv.className='product'
        productDiv.innerHTML = `
            <img src="${product.thumbnail}">
            <h2>${product.title}</h2>
            <p>${product.description}</p><br>
            <p>Price: $${product.price}</p>
        `;
        productList.appendChild(productDiv);
    });
}