import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRrAkZUSaN2J0B6kLVAMmH-KF4Jdd7BbU",
    authDomain: "e-mercadojap.firebaseapp.com",
    projectId: "e-mercadojap",
    storageBucket: "e-mercadojap.appspot.com",
    messagingSenderId: "898607530006",
    appId: "1:898607530006:web:e1081c8dfee00afdc7f537"
    };

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default function isAuth() {
    let value;
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            return false;
        } 
        value = true;
      });
      return value;
}


