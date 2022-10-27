const cartBody = document.getElementById('cart-body');
const forms = document.querySelectorAll('.needs-validation');
const methodPayment = document.querySelectorAll('input[name="methodPayment"]');
const methodInformation = document.getElementById('methodInformation');
const creditCardMethod = document.getElementById('creditCardMethod');
const accountNumberMethod = document.getElementById('accountNumberMethod');
const messageSuccess = document.getElementById('message-success');

document.addEventListener('DOMContentLoaded', () => {
  const arrayStorage = JSON.parse(localStorage.getItem('cart'));

  if (arrayStorage) return showData(arrayStorage);

  getData();
});

async function getData() {
  try {
    const response = await fetch(
      `https://japceibal.github.io/emercado-api/user_cart/25801.json`
    );
    const result = await response.json();
    localStorage.setItem('cart', JSON.stringify(result.articles));
    showData(result.articles);
  } catch (error) {
    console.log(error);
  }
}

function showData(articles) {
  for (let item of articles) {
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
            <td class="fw-bold">${currency} <span id="${id}-subtotal">${
      unitCost * 1
    }</span></td>
            <td><button class="btn btn-danger" onClick="deleteProduct(${id})">Eliminar</button></td>
        </tr>`;
  }
}

function setQuantity(id, unitCost) {
  const inputCurrent = document.getElementById(`${id}-input`);
  const subTotalCurrent = document.getElementById(`${id}-subtotal`);

  const arrayStorage = JSON.parse(localStorage.getItem('cart'));

  const article = arrayStorage.find((elem) => elem.id === id);
  article.count = Number(inputCurrent.value);

  const newArray = arrayStorage.map((elem) =>
    elem.id === id ? article : elem
  );

  localStorage.setItem('cart', JSON.stringify(newArray));

  subTotalCurrent.textContent = inputCurrent.value * unitCost;
}

function deleteProduct(id) {
  if (!confirm('¿Seguro Quieres Eliminar Este Producto del Carrito?')) return;

  const arrayStorage = JSON.parse(localStorage.getItem('cart'));

  const filterArray = arrayStorage.filter((items) => items.id !== id);

  localStorage.setItem('cart', JSON.stringify(filterArray));

  cartBody.innerHTML = '';

  if (!filterArray.length) {
    localStorage.removeItem('cart');
    return getData();
  }

  showData(filterArray);
}

// Validation
Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener('submit', e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      if(form.checkValidity()){
        messageAlert()
      }
      e.preventDefault();
      form.classList.add('was-validated');
    },
    false
  );
});

for(const elem of methodPayment){
  elem.addEventListener('change', selectRadioInput);
}

function selectRadioInput() {
  const methodPayment = document.querySelector('input[name="methodPayment"]:checked').value;

  methodInformation.textContent = methodPayment === 'BankTransfer' ? 'Transferencia Bancaria' : 'Tarjeta de Credito'

  if(methodPayment === 'CreditCard') {
    creditCardMethod.removeAttribute('disabled','')
    creditCardMethod.setAttribute('required','')

    accountNumberMethod.removeAttribute('required','')
    accountNumberMethod.setAttribute('disabled','')
  }

  if(methodPayment === 'BankTransfer') {
    accountNumberMethod.removeAttribute('disabled','')
    accountNumberMethod.setAttribute('required','')

    creditCardMethod.removeAttribute('required','')
    creditCardMethod.setAttribute('disabled','')
  }

}

function messageAlert(){
  messageSuccess.classList.remove('d-none')
  setTimeout(() => {
    messageSuccess.classList.add('d-none')
  } , 2000)
}
