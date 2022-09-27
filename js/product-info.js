const productContainer = document.getElementById('product');
const commentsContainer = document.getElementById('comments');
const relatedProductsContainer = document.getElementById('relacionados-container');
const form = document.getElementById('form');
const textAreaInput = document.getElementById('opinion');
const selectInput = document.getElementById('selectPuntación');
const btnForm = document.getElementById('btn-enviar');
let commentsArray = [];

document.addEventListener('DOMContentLoaded', () => {
    const isLogin = localStorage.getItem('Auth');

    if(isLogin === 'false' || !isLogin){
        window.location = "login.html"
    }
    
    const productId = localStorage.getItem('ProductID');

    getProductData(productId);
    getComments(productId);
})

document.getElementById("logout").addEventListener("click", function() {
    localStorage.setItem('Auth', false);
    window.location = "login.html"
});

async function getProductData(params) {
    try {
        const response = await fetch(`https://japceibal.github.io/emercado-api/products/${params}.json`);
        const result = await response.json();
        showProduct(result);
        showRelatedProducts(result.relatedProducts);
    } catch (error) {
        console.log(error);
    }
}

async function getComments(params) {
    try {
        const response = await fetch(`https://japceibal.github.io/emercado-api/products_comments/${params}.json`);
        const result = await response.json();

        commentsArray=[...result]

        showComments(commentsArray);
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
    <!-- Carrousel -->
    <div id="carouselExampleIndicators" class="carousel slide px-5 py-2" data-ride="carousel">
        <ol class="carousel-indicators" id="indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        </ol>
        <div class="carousel-inner" id="img-container">
            <div class="carousel-item active">
                <img class="d-block w-100" src="${images[0]}" alt="Img Product">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>`

    const imgContainer = document.getElementById('img-container');
    
    for(let i = 1; i < images.length; i++){
        imgContainer.innerHTML += `
        <div class="carousel-item">
            <img class="d-block w-100" src="${images[i]}" alt="Img Product">
        </div>
        `
    }

    const indicatorsCarrousel = document.getElementById('indicators');
    
    for(let i = 1; i < images.length; i++){
        indicatorsCarrousel.innerHTML += `
        <li data-target="#carouselExampleIndicators" data-slide-to="${i}"></li>
        `
    }
}

function showRelatedProducts(related){
    relatedProductsContainer.innerHTML = '';

    related.forEach(elem => {
        relatedProductsContainer.innerHTML += `
        <div class="card card-related mr-5" style="width: 18rem;" onClick="redirectPage(${elem.id})">
            <img class="card-img-top" src="${elem.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title text-center pt-2">${elem.name}</h5>
            </div>
        </div>`
    })
}

const rating = {
    1: '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    2: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    3: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
    4: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>',
    5: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
}

function showComments(comments){

    if(!comments.length) return commentsContainer.innerHTML = '<p class="p-3">No Hay Comentarios...</p>'

    commentsContainer.innerHTML = ''

    comments.forEach(comment => {
        const {user, dateTime, score, description} = comment

        commentsContainer.innerHTML += `
        <div class="p-2 border">
            <div class="d-flex align-items-center mb-2">
                <span class="fw-bold">${user}</span> - ${dateTime} - ${rating[score]}
            </div>    
            <div>${description}</div>
        </div>`    
    });
}

btnForm.addEventListener('click', (e) =>{
    e.preventDefault();

    const date = new Date();

    const newComment = {
        product: parseInt(localStorage.getItem('ProductID')),
        score: parseInt(selectInput.value),
        description: textAreaInput.value,
        user: localStorage.getItem('userID'),
        dateTime: (`${date.toISOString().split('T')[0]} ${date.toLocaleTimeString()}`),
    }

    commentsArray = [newComment, ...commentsArray]

    showComments(commentsArray);

    form.reset()
})

function redirectPage(id){
    localStorage.setItem('ProductID', id);

    window.location = "product-info.html"
}

