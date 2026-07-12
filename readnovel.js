// ==========================
// CERITAKU - READNOVEL.JS
// ==========================

// Ambil novel yang dipilih
const novel = JSON.parse(localStorage.getItem("selectedNovel"));

// Elemen
const cover = document.getElementById("coverNovel");
const judul = document.getElementById("judulNovel");
const genre = document.getElementById("genreNovel");
const penulis = document.getElementById("penulisNovel");
const sinopsis = document.getElementById("sinopsisNovel");
const isi = document.getElementById("isiNovel");

const likeBtn = document.getElementById("likeBtn");
const saveBtn = document.getElementById("saveBtn");
const shareBtn = document.getElementById("shareBtn");

const commentInput = document.getElementById("commentInput");
const commentList = document.getElementById("commentList");
const sendComment = document.getElementById("sendComment");

// ==========================
// TAMPILKAN NOVEL
// ==========================

if(novel){

    judul.textContent = novel.judul;

    genre.textContent = novel.genre;

    penulis.textContent = novel.penulis || "Penulis Ceritaku";

    sinopsis.textContent = novel.sinopsis;

    isi.textContent = novel.isiNovel;

    if(novel.cover){

        cover.src = novel.cover;

    }

}else{

    alert("Novel tidak ditemukan.");

    window.location.href = "home.html";

}

// ==========================
// LIKE
// ==========================

likeBtn.onclick = function(){

    alert("❤️ Terima kasih sudah menyukai novel ini.");

};

// ==========================
// SIMPAN
// ==========================

saveBtn.onclick = function(){

    let saved = JSON.parse(localStorage.getItem("savedNovel")) || [];

    const sudahAda = saved.find(item => item.judul === novel.judul);

    if(!sudahAda){

        saved.push(novel);

        localStorage.setItem("savedNovel", JSON.stringify(saved));

        alert("⭐ Novel berhasil disimpan.");

    }else{

        alert("Novel sudah tersimpan.");

    }

};

// ==========================
// BAGIKAN
// ==========================

shareBtn.onclick = function(){

    if(navigator.share){

        navigator.share({

            title: novel.judul,

            text: novel.sinopsis

        });

    }else{

        alert("Bagikan fitur belum didukung di perangkat ini.");

    }

};

// ==========================
// KOMENTAR
// ==========================

let comments = JSON.parse(localStorage.getItem("comments")) || [];

function tampilKomentar(){

    commentList.innerHTML = "";

    const dataNovel = comments.filter(function(item){

        return item.judul === novel.judul;

    });

    if(dataNovel.length === 0){

        commentList.innerHTML =

        "<p class='empty'>Belum ada komentar.</p>";

        return;

    }

    dataNovel.forEach(function(item){

        commentList.innerHTML += `

        <div style="background:#f5f5f5;padding:12px;border-radius:10px;margin-bottom:10px;">

            <strong>${item.user}</strong>

            <p style="margin-top:6px;">${item.text}</p>

        </div>

        `;

    });

}

tampilKomentar();

// ==========================
// KIRIM KOMENTAR
// ==========================

sendComment.onclick = function(){

    const isiKomentar = commentInput.value.trim();

    if(isiKomentar==""){

        alert("Komentar masih kosong.");

        return;

    }

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    comments.push({

        judul:novel.judul,

        user:loginUser ? loginUser.nama : "Guest",

        text:isiKomentar

    });

    localStorage.setItem("comments", JSON.stringify(comments));

    commentInput.value="";

    tampilKomentar();

};