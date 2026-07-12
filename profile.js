// ===============================
// PROFILE.JS - CERITAKU
// ===============================

// Ambil elemen
const username = document.getElementById("username");
const email = document.getElementById("email");
const novelCount = document.getElementById("novelCount");

const editBtn = document.querySelector(".edit-btn");
const myNovelBtn = document.getElementById("myNovelBtn");
const savedBtn = document.getElementById("savedBtn");
const settingBtn = document.getElementById("settingBtn");
const logoutBtn = document.getElementById("logoutBtn");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupText = document.getElementById("popupText");
const popupIcon = document.querySelector(".popup-icon");
const closePopup = document.getElementById("closePopup");

// ===============================
// DATA USER
// ===============================

let loginUser = JSON.parse(localStorage.getItem("loginUser"));

if(loginUser){

    username.textContent = loginUser.nama || "Pengguna Ceritaku";
    email.textContent = loginUser.email || "-";

}else{

    username.textContent = "Mode Tamu";
    email.textContent = "Belum Login";

}

// ===============================
// JUMLAH NOVEL
// ===============================

const novels = JSON.parse(localStorage.getItem("novels")) || [];

novelCount.textContent = novels.length;

// ===============================
// POPUP
// ===============================

function showPopup(icon,judul,pesan){

    popupIcon.className = icon + " popup-icon";

    popupTitle.textContent = judul;

    popupText.textContent = pesan;

    popup.style.display = "flex";

}

function closeMyPopup(){

    popup.style.display = "none";

}

closePopup.onclick = closeMyPopup;

popup.onclick = function(e){

    if(e.target === popup){

        closeMyPopup();

    }

};

// ===============================
// EDIT PROFIL
// ===============================

editBtn.onclick = function(){

    let namaBaru = prompt("Masukkan nama baru", username.textContent);

    if(namaBaru){

        username.textContent = namaBaru;

        if(loginUser){

            loginUser.nama = namaBaru;

            localStorage.setItem("loginUser", JSON.stringify(loginUser));

        }

    }

};

// ===============================
// NOVEL SAYA
// ===============================

myNovelBtn.onclick = function(){

    window.location.href = "mynovel.html";

};

// ===============================
// NOVEL TERSIMPAN
// ===============================

savedBtn.onclick = function(){

    showPopup(

        "fa-solid fa-bookmark",

        "Novel Tersimpan",

        "Belum ada novel yang kamu simpan."

    );

};

// ===============================
// PENGATURAN
// ===============================

settingBtn.onclick = function(){

    showPopup(

        "fa-solid fa-gear",

        "Pengaturan",

        "Menu ini masih dalam tahap pengembangan."

    );

};

// ===============================
// LOGOUT
// ===============================

logoutBtn.onclick = function(){

    let keluar = confirm("Yakin ingin keluar?");

    if(keluar){

        localStorage.removeItem("loginUser");
        localStorage.removeItem("guestMode");

        window.location.href = "login.html";

    }

};