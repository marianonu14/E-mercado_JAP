const productoContainer = document.getElementById('car-list-container');
const categoryName = document.getElementById('categoryName');
const categories = {
  101: 'autos',
  102: 'juguetes',
  103: 'muebles',
  104: 'herramientas',
  105: 'computadoras',
  106: 'vestimenta',
  107: 'electrodomesticos',
  108: 'deporte',
  109: 'celulares',
};

let products = [];

document.addEventListener('DOMContentLoaded', () => {
  categoryName.textContent = categories[localStorage.getItem('catID')];

  getProductData();
});

// Fetch a los Productos Según su ID

async function getProductData() {
  const categoriesId = localStorage.getItem('catID');
  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/cats_products/${categoriesId}.json`
    );
    const result = await response.json();
    products = result.products;
    showProduct(result.products);
  } catch (error) {
    console.log(error);
  }
}

function showProduct(products) {
  productoContainer.innerHTML = '';

  for (items of products) {
    productoContainer.innerHTML += `
    <div onclick="handleClick(${items.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${items.image}" alt="${items.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${items.name} - ${items.currency} ${items.cost}</h4>
                    <small class="text-muted">${items.soldCount} vendidos</small>
                </div>
                <p class="mb-1">${items.description}</p>
            </div>
        </div>
    </div>`;
  }
}

function handleClick(params) {
  localStorage.setItem('ProductID', params);
  window.location = 'product-info.html';
}

//Filtrar por Precio y Articulos Vendidos

document.getElementById('sortAsc').addEventListener('click', () => {
  const productsAsc = products.sort((a, b) => {
    if (a.cost > b.cost) {
      return -1;
    }
    if (a.cost < b.cost) {
      return 1;
    }
    return 0;
  });
  showProduct(productsAsc);
});

document.getElementById('sortDesc').addEventListener('click', () => {
  const productsAsc = products.sort((a, b) => {
    if (a.cost > b.cost) {
      return 1;
    }
    if (a.cost < b.cost) {
      return -1;
    }
    return 0;
  });
  showProduct(productsAsc);
});

document.getElementById('sortByCount').addEventListener('click', () => {
  const productsAsc = products.sort((a, b) => {
    if (a.soldCount > b.soldCount) {
      return -1;
    }
    if (a.soldCount < b.soldCount) {
      return 1;
    }
    return 0;
  });
  showProduct(productsAsc);
});

//Filtrar por Precio Max y Min por medio de los Inputs

const inputMin = document.getElementById('rangeFilterCountMin');
const inputMax = document.getElementById('rangeFilterCountMax');

document.getElementById('rangeFilterCount').addEventListener('click', () => {
  valMin = inputMin.value;
  valMax = inputMax.value;

  if (!valMin || !valMax) return;

  const arrayFilter = products.filter(
    (item) => item.cost > valMin && item.cost < valMax
  );
  showProduct(arrayFilter);
});

document.getElementById('clearRangeFilter').addEventListener('click', () => {
  inputMin.value = '';
  inputMax.value = '';
  showProduct(products);
});

// Filtro en Tiempo Real

document.getElementById('inputFilter').addEventListener('input', (e) => {
  const inputValue = e.target.value.toLowerCase();

  const arrayFilter = products.filter(
    (item) => item.name.toLowerCase().indexOf(inputValue) === 0
  );

  showProduct(arrayFilter);
});
