// ===============================
// REGISTER.JS - CERITAKU
// ===============================

// Form
const registerForm = document.getElementById("registerForm");

// Tombol Kembali
const backBtn = document.getElementById("backBtn");

// ===============================
// DAFTAR AKUN
// ===============================

registerForm.addEventListener("submit", function(e){

    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if(password !== confirmPassword){

        alert("Konfirmasi password tidak cocok!");

        return;

    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const cekEmail = users.find(user => user.email === email);

    if(cekEmail){

        alert("Email sudah terdaftar!");

        return;

    }

    users.push({

        nama: nama,

        email: email,

        password: password

    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Pendaftaran berhasil!");

    window.location.href = "login.html";

});

// ===============================
// KEMBALI
// ===============================

backBtn.addEventListener("click", function(){

    window.location.href = "index.html";

});