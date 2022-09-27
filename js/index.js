const userId = document.getElementById('userId')

document.addEventListener("DOMContentLoaded", function(){
    let isLogin = localStorage.getItem('Auth');

    if(isLogin === 'false' || !isLogin){
        window.location = "/login.html"
        return;
    }
    
    // userId.textContent = localStorage.getItem("userID")

    // document.getElementById("logout").addEventListener("click", function() {
    //     localStorage.setItem('Auth', false);
    //     window.location = "login.html"
    // });
    
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

