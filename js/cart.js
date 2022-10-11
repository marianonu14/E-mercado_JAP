const cartBody = document.getElementById('cart-body');
let cartArray = [];

document.addEventListener('DOMContentLoaded', () => {
  const arrayId = JSON.parse(localStorage.getItem('cart'));

  if (!arrayId) return;

  getData(arrayId);
});

async function getData(arrayId) {
  try {
    for (let id of arrayId) {
      const response = await fetch(`https://japceibal.github.io/emercado-api/products/${id}.json`);
      const result = await response.json();
      cartArray.push(result);
    }
  } catch (error) {
    console.log(error);
  }
  showData(cartArray)
}

function showData(cartArray) {
 for(let article of cartArray){
    const { id, name, currency, cost, images } = article;

    cartBody.innerHTML += `
      <tr>
          <td><img class="thumbnail" src="${images[0]}" alt="Img-Product"></td>
          <td>${name}</td>
          <td>${currency} ${cost}</td>
          <td>
              <input 
              class="input-cart"
              value="1"
              id="${id}-input" 
              type="number" 
              oninput="setQuantity(${id},${cost})"
              min="1" 
              />
          </td>
          <td class="fw-bold">${currency} <span id="${id}-subtotal">${cost * 1}</span></td>
      </tr>`;
 }
}

function setQuantity(id, unitCost) {
  const inputCurrent = document.getElementById(`${id}-input`);
  const subTotalCurrent = document.getElementById(`${id}-subtotal`);

  subTotalCurrent.textContent = inputCurrent.value * unitCost;
}
