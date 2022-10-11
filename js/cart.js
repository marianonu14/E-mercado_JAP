const cartBody = document.getElementById('cart-body');

document.addEventListener('DOMContentLoaded', getData)

async function getData() {
    try {
        const response = await fetch('https://japceibal.github.io/emercado-api/user_cart/25801.json');
        const result = await response.json();
        showData(result.articles[0]);
    } catch (error) {
        console.log(error)
    }
}

function showData(article){
    const { id, name, currency, unitCost, image } = article;

    let value = 1;

    cartBody.innerHTML += `
    <tr>
        <td><img class="thumbnail" src="${image}" alt="Img-Product"></td>
        <td>${name}</td>
        <td>${currency} ${unitCost}</td>
        <td>
            <input 
            class="input-cart"
            value="${value}"
            id="${id}-input" 
            type="number" 
            oninput="myFunction(${id},${unitCost})"
            min="1" 
            />
        </td>
        <td class="fw-bold">${currency} <span id="${id}-subtotal">${unitCost * value}</span></td>
    </tr>`
}

function myFunction(id,unitCost) {
    const inputCurrent = document.getElementById(`${id}-input`);
    const subTotalCurrent = document.getElementById(`${id}-subtotal`);

    subTotalCurrent.textContent = inputCurrent.value * unitCost;
}