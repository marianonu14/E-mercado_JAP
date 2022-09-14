const productContainer = document.getElementById('product');
const commentsContainer = document.getElementById('comments');

document.addEventListener('DOMContentLoaded', () => {
    const productId = localStorage.getItem('ProductID');

    getProductData(productId);
    getComments(productId);
})

async function getProductData(params) {
    try {
        const response = await fetch(`https://japceibal.github.io/emercado-api/products/${params}.json`);
        const result = await response.json();
        showProduct(result);
    } catch (error) {
        console.log(error);
    }
}

async function getComments(params) {
    try {
        const response = await fetch(`https://japceibal.github.io/emercado-api/products_comments/${params}.json`);
        const result = await response.json();
        showComments(result);
    } catch (error) {
        console.log(error);
    }
}
function showProduct(product){
    const {name, cost, currency, description, category, soldCount, images} = product

    productContainer.innerHTML += `      
    <h1 class="mt-3 py-4">${name}</h1>
    <hr>
    <h3 class="fw-bold fs-4">Precio</h3>
    <p>${currency} ${cost}</p>
    <h3 class="fw-bold fs-4">Descripción</h3>
    <p>${description}</p>
    <h3 class="fw-bold fs-4">Categoria</h3>
    <p>${category}</p>
    <h3 class="fw-bold fs-4">Cantidad de Vendidos</h3>
    <p>${soldCount}</p>
    <h3 class="fw-bold fs-4">Imagenes Ilustrativas</h3>
    <div class="img-container d-flex justify-content-between py-3">
        <img class="img-fluid" src="${images[0]}" alt="Img Product">
        <img class="img-fluid" src="${images[1]}" alt="Img Product">
        <img class="img-fluid" src="${images[2]}" alt="Img Product">
        <img class="img-fluid" src="${images[3]}" alt="Img Product">
    </div>`
}

const rate = {
    1: '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    2: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    3: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    4: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>',
    5: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
}

function showComments(comments){
    comments.forEach(comment => {
        const {user, dateTime, score, description} = comment

        commentsContainer.innerHTML += `
        <div class="p-2 border">
            <div class="d-flex align-items-center mb-2">
                <span class="fw-bold">${user}</span> - ${dateTime} - ${rate[score]}
            </div>    
            <div>${description}</div>
        </div>`    
    });
}

