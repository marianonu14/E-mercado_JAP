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
    const { name, currency, unitCost } = article;

    const result = 15210;

    cartBody.innerHTML += `
    <tr>
        <th scope="row">1</th>
        <td>${name}</td>
        <td>${currency} ${unitCost}</td>
        <td><input type="number" value="1"></td>
        <td class="fw-bold">${currency} ${result}</td>
    </tr>`
    console.log(article)
}