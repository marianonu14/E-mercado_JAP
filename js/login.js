const form = document.getElementById('form-container');
const inputEmail = document.getElementById('email-input');
const inputPassword = document.getElementById('password-input');
const messageError = document.getElementById('message-error');

form.addEventListener('submit', formSubmit);

function validForm(){
    if(!inputEmail.value.includes('@')){
        showMessage('Debe Ingresar un Mail Valido');
        return false;
    }
    if(inputPassword.value.length < 6){
        showMessage('La Contraseña Debe Contener Mas de 6 Caracteres');
        return false;
    }
    return true;
}

function formSubmit(e){
    e.preventDefault();
    const validation = validForm();

    if(validation){
        window.location = window.location = "index.html"
    } return;
}

function showMessage(message){
    messageError.classList.remove('d-none')
    messageError.classList.add('d-block')
    messageError.textContent = message;
    setTimeout(()=>{
        messageError.classList.remove('d-block')
        messageError.classList.add('d-none')
    },1500)
}











