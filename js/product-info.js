const productContainer = document.getElementById('product');
const commentsContainer = document.getElementById('comments');
const relatedProductsContainer = document.getElementById('relacionados-container');
const form = document.getElementById('form');
const textAreaInput = document.getElementById('opinion');
const selectInput = document.getElementById('selectPuntación');
const btnForm = document.getElementById('btn-enviar');
let commentsArray = [];

document.addEventListener('DOMContentLoaded', () => {
  const productId = localStorage.getItem('ProductID');

  getProductData(productId);
  getComments(productId);
});

document.getElementById('logout').addEventListener('click', function () {
  localStorage.setItem('Auth', false);
  window.location = 'login.html';
});

async function getProductData(params) {
  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/products/${params}.json`
    );
    const result = await response.json();
    showProduct(result);
    showRelatedProducts(result.relatedProducts);
  } catch (error) {
    console.log(error);
  }
}

async function getComments(params) {
  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/products_comments/${params}.json`
    );
    const result = await response.json();

    commentsArray = [...result];

    showComments(commentsArray);
  } catch (error) {
    console.log(error);
  }
}

function showProduct(product) {
  const { id, name, cost, currency, description, category, soldCount, images } = product;

  console.log(product);

  productContainer.innerHTML += `      
    <div class="d-flex justify-content-between align-items-center">
        <h1 class="mt-3 py-4">${name}</h1>
        <button class="btn btn-success h-25 me-5" onclick="addToCart(${id})">Comprar</button>
    </div>
    <hr>
    <div class="text-center"><p id="message-container"></p></div>
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
    <div id="carouselExampleControls" class="carousel slide pt-3 px-5" data-bs-ride="carousel">
        <div class="carousel-inner" id="img-container">
            <div class="carousel-item active">
                <img src="${images[0]}" class="d-block w-100" alt="...">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>`;

  const imgContainer = document.getElementById('img-container');

  for (let i = 1; i < images.length; i++) {
    imgContainer.innerHTML += `
        <div class="carousel-item">
            <img class="d-block w-100" src="${images[i]}" alt="Img Product">
        </div>
        `;
  }
}

function addToCart(id) {
  console.log(id);
  // const cart = JSON.parse(localStorage.getItem('cart'));

  // if (!cart) {
  //   localStorage.setItem('cart', JSON.stringify([id]));
  //   return showMessage('Producto Agregado Correctamente', 200);
  // }

  // const verifyExist = cart.find((elem) => elem === id);

  // if (verifyExist)
  //   return showMessage('Este Producto ya fue agregado al carrito', 400);

  // const newCart = [...cart, id];

  // localStorage.setItem('cart', JSON.stringify(newCart));

  // showMessage('Producto Agregado Correctamente', 200);
}

function showMessage(message, status) {
  const messageContainer = document.getElementById('message-container');

  messageContainer.textContent = message;
  if (status === 200)
    messageContainer.classList =
      'bg-success w-50 m-auto text-light rounded py-1';
  if (status === 400)
    messageContainer.classList =
      'bg-danger w-50 m-auto text-light rounded py-1';

  setTimeout(() => {
    messageContainer.textContent = '';
    messageContainer.classList = '';
  }, 1500);
}

function showRelatedProducts(related) {
  relatedProductsContainer.innerHTML = '';

  related.forEach((elem) => {
    relatedProductsContainer.innerHTML += `
        <div class="card card-related mr-5" style="width: 18rem;" onClick="redirectPage(${elem.id})">
            <img class="card-img-top" src="${elem.image}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title text-center pt-2">${elem.name}</h5>
            </div>
        </div>`;
  });
}

const rating = {
  1: '<span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
  2: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
  3: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span><span class="fa fa-star"></span>',
  4: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star"></span>',
  5: '<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>',
};

function showComments(comments) {
  if (!comments.length)
    return (commentsContainer.innerHTML =
      '<p class="p-3">No Hay Comentarios...</p>');

  commentsContainer.innerHTML = '';

  comments.forEach((comment) => {
    const { user, dateTime, score, description } = comment;

    commentsContainer.innerHTML += `
        <div class="p-2 border">
            <div class="d-flex align-items-center mb-2">
                <span class="fw-bold">${user}</span> - ${dateTime} - ${rating[score]}
            </div>    
            <div>${description}</div>
        </div>`;
  });
}

btnForm.addEventListener('click', (e) => {
  e.preventDefault();

  const date = new Date();

  const newComment = {
    product: parseInt(localStorage.getItem('ProductID')),
    score: parseInt(selectInput.value),
    description: textAreaInput.value,
    user: localStorage.getItem('userID'),
    dateTime: `${
      date.toISOString().split('T')[0]
    } ${date.toLocaleTimeString()}`,
  };

  commentsArray = [newComment, ...commentsArray];

  showComments(commentsArray);

  form.reset();
});

function redirectPage(id) {
  localStorage.setItem('ProductID', id);

  window.location = 'product-info.html';
}
