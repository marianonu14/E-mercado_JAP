const productoContainer = document.getElementById('car-list-container');

document.addEventListener('DOMContentLoaded',() => {
    const isLogin = localStorage.getItem('Auth');

    if(isLogin === 'false' || !isLogin){
        window.location = "/login.html"
    }
    
    getProductData()})

document.getElementById("logout").addEventListener("click", function() {
    localStorage.setItem('Auth', false);
    window.location = "login.html"
});

async function getProductData(){
    const categoriesId = localStorage.getItem('catID');
    try {
        const response = await fetch(`https://japceibal.github.io/emercado-api/cats_products/${categoriesId}.json`);
        const result = await response.json();
        showProduct(result.products);  
    } catch (error) {
        console.log(error);
    }
}

function showProduct(products){
    for(items of products){
        productoContainer.innerHTML += `<div onclick="setCatID(${items.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${items.image}" alt="${items.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${items.name}</h4>
                    <small class="text-muted">${items.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${items.description}</p>
            </div>
        </div>
    </div>`
    }
}

