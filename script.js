// ==========================
// CERITAKU V2
// script.js - Bagian 1
// ==========================

// Ambil semua elemen
const splash = document.getElementById("splash");
const welcome = document.querySelector(".welcome");
const dashboard = document.querySelector(".dashboard");

const guestBtn = document.getElementById("guestBtn");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

const newNovelBtn = document.getElementById("newNovel");

const novelForm = document.getElementById("novelForm");

const novelContainer = document.getElementById("novelContainer");
const emptyState = document.getElementById("emptyState");

const toast = document.getElementById("toast");

const search = document.getElementById("search");

// Array Novel
let novels = JSON.parse(localStorage.getItem("novels")) || [];

// ==========================
// Splash Screen
// ==========================

window.addEventListener("load", () => {

    setTimeout(() => {

        splash.style.display = "none";

    }, 3000);

});

// ==========================
// Masuk Sebagai Tamu
// ==========================

guestBtn.addEventListener("click", () => {

    welcome.classList.add("hidden");

    dashboard.classList.remove("hidden");

    renderNovel();

});

// ==========================
// Login & Daftar
// ==========================

loginBtn.addEventListener("click", () => {

    alert("Halaman Login akan dibuat nanti.");

});

registerBtn.addEventListener("click", () => {

    alert("Halaman Daftar akan dibuat nanti.");

});

// ==========================
// Popup
// ==========================

newNovelBtn.addEventListener("click", () => {

    popup.classList.add("active");

});

closePopup.addEventListener("click", () => {

    popup.classList.remove("active");

});

window.addEventListener("click", (e) => {

    if (e.target === popup) {

        popup.classList.remove("active");

    }

});

// ==========================
// Toast
// ==========================

function showToast(text){

    toast.innerHTML = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2500);

}
// ==========================
// SIMPAN NOVEL
// ==========================

novelForm.addEventListener("submit", function(e){

    e.preventDefault();

    const judul = document.getElementById("judul").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const sinopsis = document.getElementById("sinopsis").value.trim();
    const isiNovel = document.getElementById("isiNovel").value.trim();

    const novel = {

        id: Date.now(),

        judul,

        genre,

        sinopsis,

        isiNovel,

        favorit:false,

        tanggal:new Date().toLocaleDateString("id-ID")

    };

    novels.push(novel);

    localStorage.setItem("novels",JSON.stringify(novels));

    novelForm.reset();

    popup.classList.remove("active");

    showToast("Novel berhasil disimpan 🎉");

    renderNovel();

});

// ==========================
// TAMPILKAN NOVEL
// ==========================

function renderNovel(){

    novelContainer.innerHTML="";

    if(novels.length===0){

        emptyState.style.display="block";

        return;

    }

    emptyState.style.display="none";

    novels.forEach(novel=>{

        const card=document.createElement("div");

        card.className="novel-card";

        card.innerHTML=`

            <img
            src="https://picsum.photos/400/250?random=${novel.id}"
            class="novel-cover">

            <div class="novel-info">

                <h3 class="novel-title">${novel.judul}</h3>

                <span class="novel-genre">${novel.genre||"Tanpa Genre"}</span>

                <p class="novel-desc">

                    ${novel.sinopsis||"Belum ada sinopsis."}

                </p>

                <small>

                    Dibuat :
                    ${novel.tanggal}

                </small>

                <div class="card-actions">

                    <button
                    class="readBtn"
                    onclick="bacaNovel(${novel.id})">

                    📖

                    </button>

                    <button
                    class="editBtn"
                    onclick="editNovel(${novel.id})">

                    ✏️

                    </button>

                    <button
                    class="favoriteBtn"
                    onclick="favoriteNovel(${novel.id})">

                    ❤️

                    </button>

                    <button
                    class="deleteBtn"
                    onclick="deleteNovel(${novel.id})">

                    🗑

                    </button>

                </div>

            </div>

        `;

        novelContainer.appendChild(card);

    });

}

// ==========================
// PENCARIAN
// ==========================

search.addEventListener("keyup",()=>{

    const keyword=search.value.toLowerCase();

    const cards=document.querySelectorAll(".novel-card");

    cards.forEach(card=>{

        const judul=card.querySelector(".novel-title").innerText.toLowerCase();

        if(judul.includes(keyword)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

});

// ==========================
// LOAD
// ==========================

renderNovel();
// ==========================
// HAPUS NOVEL
// ==========================

function deleteNovel(id){

    if(confirm("Yakin ingin menghapus novel ini?")){

        novels = novels.filter(novel => novel.id !== id);

        localStorage.setItem("novels", JSON.stringify(novels));

        renderNovel();

        showToast("Novel berhasil dihapus 🗑");

    }

}

// ==========================
// FAVORIT
// ==========================

function favoriteNovel(id){

    novels = novels.map(novel=>{

        if(novel.id===id){

            novel.favorit=!novel.favorit;

        }

        return novel;

    });

    localStorage.setItem("novels",JSON.stringify(novels));

    renderNovel();

    showToast("Status favorit diperbarui ❤️");

}

// ==========================
// BACA NOVEL
// ==========================

function bacaNovel(id){

    const novel = novels.find(n=>n.id===id);

    if(!novel) return;

    alert(
`Judul : ${novel.judul}

Genre : ${novel.genre}

Sinopsis :
${novel.sinopsis}

==================

${novel.isiNovel}`
    );

}

// ==========================
// EDIT NOVEL
// ==========================

function editNovel(id){

    const novel = novels.find(n=>n.id===id);

    if(!novel) return;

    document.getElementById("judul").value = novel.judul;
    document.getElementById("genre").value = novel.genre;
    document.getElementById("sinopsis").value = novel.sinopsis;
    document.getElementById("isiNovel").value = novel.isiNovel;

    popup.classList.add("active");

    novelForm.onsubmit=function(e){

        e.preventDefault();

        novel.judul=document.getElementById("judul").value;
        novel.genre=document.getElementById("genre").value;
        novel.sinopsis=document.getElementById("sinopsis").value;
        novel.isiNovel=document.getElementById("isiNovel").value;

        localStorage.setItem("novels",JSON.stringify(novels));

        popup.classList.remove("active");

        novelForm.reset();

        novelForm.onsubmit=null;

        renderNovel();

        showToast("Novel berhasil diperbarui ✏️");

    };

}
// Tombol kembali ke halaman utama
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function(){

    // Tutup popup jika masih terbuka
    popup.classList.remove("active");

    // Kembali ke halaman welcome
    dashboard.classList.add("hidden");

    welcome.classList.remove("hidden");

});
