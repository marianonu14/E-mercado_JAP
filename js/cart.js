const cartBody = document.getElementById('cart-body');

document.addEventListener('DOMContentLoaded', () => {

  const arrayStorage = JSON.parse(localStorage.getItem('cart'));

  if(arrayStorage) return showData(arrayStorage);

  getData();
});

async function getData() {
  try {
    const response = await fetch(`https://japceibal.github.io/emercado-api/user_cart/25801.json`);
    const result = await response.json();
    showData(result.articles);
  } catch (error) {
    console.log(error);
  }
}

function showData(articles) {

  for(let item of articles) {
    const { id, name, currency, unitCost, image, count } = item;
  
    cartBody.innerHTML += `
        <tr>
            <td><img class="thumbnail" src="${image}" alt="Img-Product"></td>
            <td>${name}</td>
            <td>${currency} ${unitCost}</td>
            <td>
                <input 
                class="input-cart"
                value="${count}"
                id="${id}-input"
                type="number" 
                oninput="setQuantity(${id},${unitCost})"
                min="1" 
                />
            </td>
            <td class="fw-bold">${currency} <span id="${id}-subtotal">${unitCost * 1}</span></td>
            <!-- <td><button class="btn btn-danger" onClick="deleteProduct(${id})">Eliminar Producto</button></td> -->
        </tr>`;

  }
}

function setQuantity(id, unitCost) {
  const inputCurrent = document.getElementById(`${id}-input`);
  const subTotalCurrent = document.getElementById(`${id}-subtotal`);

  subTotalCurrent.textContent = inputCurrent.value * unitCost;
}

// function deleteProduct(id) {
//   if (!confirm('¿Seguro Quieres Eliminar Este Producto del Carrito?')) return;

//   cartArray = cartArray.filter((item) => item.id !== id);

//   const arrayStorage = JSON.parse(localStorage.getItem('cart'));
//   const filterArrayStorage = arrayStorage.filter((elem) => elem !== id);
//   localStorage.setItem('cart', JSON.stringify(filterArrayStorage));

//   cartBody.innerHTML = '';

//   if (!cartArray.length) return;

//   showData(cartArray);
// }
