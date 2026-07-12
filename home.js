// ===================================
// HOME.JS - CERITAKU (REVISI)
// ===================================

// Elemen
const novelList = document.getElementById("novelList");
const searchInput = document.getElementById("searchNovel");
const profileBtn = document.getElementById("profileBtn");
const writeBtn = document.getElementById("writeBtn");

// ===========================
// PINDAH HALAMAN
// ===========================

if(profileBtn){
    profileBtn.onclick = function(){
        window.location.href = "profile.html";
    };
}

if(writeBtn){
    writeBtn.onclick = function(){
        window.location.href = "writer.html";
    };
}

// ===========================
// AMBIL DATA NOVEL
// ===========================

let novels = JSON.parse(localStorage.getItem("novels")) || [];

// Jika ada status, tampilkan hanya yang diterbitkan
novels = novels.filter(function(novel){

    if(!novel.status){
        return true;
    }

    return novel.status === "published";

});

// ===========================
// TAMPILKAN NOVEL
// ===========================

function tampilNovel(data){

    novelList.innerHTML = "";

    if(data.length === 0){

        novelList.innerHTML = `
        <div class="empty">
            <i class="fa-solid fa-book-open"></i>
            <h2>Belum Ada Novel</h2>
            <p>Novel yang diterbitkan akan muncul di sini.</p>
        </div>
        `;

        return;
    }

    data.forEach(function(novel,index){

        const card = document.createElement("div");

        card.className = "novel-card";

        card.innerHTML = `

            <h3>${novel.judul}</h3>

            <p><b>Genre :</b> ${novel.genre}</p>

            <p>${novel.sinopsis}</p>

            <small>
            ${novel.penulis || "Penulis Ceritaku"}
            </small>

        `;

        card.onclick = function(){

            localStorage.setItem(
                "selectedNovel",
                JSON.stringify(novel)
            );

            window.location.href = "readnovel.html";

        };

        novelList.appendChild(card);

    });

}

// Tampilkan pertama kali
tampilNovel(novels);

// ===========================
// PENCARIAN
// ===========================

if(searchInput){

searchInput.addEventListener("input", function(){

    const keyword = this.value.toLowerCase();

    const hasil = novels.filter(function(novel){

        return (

            novel.judul.toLowerCase().includes(keyword) ||

            novel.genre.toLowerCase().includes(keyword) ||

            (novel.penulis || "").toLowerCase().includes(keyword)

        );

    });

    tampilNovel(hasil);

});

}

// ===========================
// REFRESH OTOMATIS
// ===========================

window.addEventListener("focus", function(){

    novels = JSON.parse(localStorage.getItem("novels")) || [];

    novels = novels.filter(function(novel){

        if(!novel.status){
            return true;
        }

        return novel.status === "published";

    });

    tampilNovel(novels);

});