// ===============================
// LOGIN.JS - CERITAKU
// ===============================

// Form
const loginForm = document.getElementById("loginForm");

// Tombol
const guestBtn = document.getElementById("guestBtn");
const backBtn = document.getElementById("backBtn");

// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function(data){

        return data.email === email &&
               data.password === password;

    });

    if(user){

        localStorage.setItem("loginUser", JSON.stringify(user));

        alert("Login berhasil!");

        window.location.href = "writer.html";

    }else{

        alert("Email atau Password salah!");

    }

});

// ===============================
// MODE TAMU
// ===============================

guestBtn.addEventListener("click", function(){

    localStorage.setItem("guestMode","true");

    localStorage.removeItem("loginUser");

    window.location.href = "home.html";

});

// ===============================
// KEMBALI
// ===============================

backBtn.addEventListener("click", function(){

    window.location.href = "index.html";

});