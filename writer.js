// =====================================
// WRITER.JS - CERITAKU (REVISI)
// =====================================

const form = document.getElementById("writerForm");

const judul = document.getElementById("judul");
const genre = document.getElementById("genre");
const sinopsis = document.getElementById("sinopsis");
const isiNovel = document.getElementById("isiNovel");
const cover = document.getElementById("cover");

const draftBtn = document.getElementById("draftBtn");
const publishBtn = document.getElementById("publishBtn");

// ===============================
// AMBIL DATA
// ===============================

let novels = JSON.parse(localStorage.getItem("novels")) || [];

const loginUser = JSON.parse(localStorage.getItem("loginUser"));

// ===============================
// KONVERSI COVER
// ===============================

function simpanNovel(status){

    if(judul.value.trim()==="" ||
       genre.value.trim()==="" ||
       sinopsis.value.trim()==="" ||
       isiNovel.value.trim()===""){

        alert("Lengkapi semua data terlebih dahulu.");

        return;

    }

    const reader = new FileReader();

    if(cover.files.length>0){

        reader.readAsDataURL(cover.files[0]);

        reader.onload=function(){

            simpanData(reader.result,status);

        };

    }else{

        simpanData("",status);

    }

}

// ===============================
// SIMPAN DATA
// ===============================

function simpanData(coverImage,status){

    const novel = {

        id: Date.now(),

        judul: judul.value.trim(),

        genre: genre.value.trim(),

        sinopsis: sinopsis.value.trim(),

        isiNovel: isiNovel.value.trim(),

        cover: coverImage,

        penulis: loginUser ? loginUser.nama : "Guest",

        email: loginUser ? loginUser.email : "",

        tanggal: new Date().toLocaleString(),

        status: status

    };

    novels.push(novel);

    localStorage.setItem("novels",JSON.stringify(novels));

    if(status==="draft"){

        alert("Draft berhasil disimpan.");

    }else{

        alert("Novel berhasil diterbitkan.");

    }

    window.location.href="home.html";

}

// ===============================
// DRAFT
// ===============================

draftBtn.onclick=function(e){

    e.preventDefault();

    simpanNovel("draft");

};

// ===============================
// TERBITKAN
// ===============================

publishBtn.onclick=function(e){

    e.preventDefault();

    simpanNovel("published");

};