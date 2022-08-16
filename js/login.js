const form = document.getElementById('form-container');
const inputEmail = document.getElementById('email-input');
const inputPassword = document.getElementById('password-input');

form.addEventListener('submit', formSubmit);

function validForm(){
    if(!inputEmail.value.includes('@')){
        return false;
    }
    if(inputPassword.value.length < 6){
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