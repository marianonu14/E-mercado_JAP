// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const form = document.getElementById('form-container');
const inputEmail = document.getElementById('email-input');
const inputPassword = document.getElementById('password-input');
const messageError = document.getElementById('message-error');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCRrAkZUSaN2J0B6kLVAMmH-KF4Jdd7BbU",
    authDomain: "e-mercadojap.firebaseapp.com",
    projectId: "e-mercadojap",
    storageBucket: "e-mercadojap.appspot.com",
    messagingSenderId: "898607530006",
    appId: "1:898607530006:web:e1081c8dfee00afdc7f537"
    };
    
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);

//Form Validation

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
        form.reset();
        window.location = "mainpage.html" 
    } return;
}

function showMessage(message){
    const classError = 'd-block w-50 m-auto text-center bg-danger p-3 text-white'
    messageError.className = classError
    messageError.textContent = message;
    setTimeout(()=>{
        messageError.className = '';
        messageError.textContent = '';
    },1500)
}

// Auth with Google

document.getElementById('login-auth').addEventListener('click', () => {
signInWithPopup(auth, provider)
.then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    if(user.emailVerified){
        window.location = "mainpage.html";
    }
}).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
});

})











