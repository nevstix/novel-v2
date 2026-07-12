// ============================
// MYNOVEL.JS - CERITAKU
// ============================

const novelList=document.getElementById("novelList");
const search=document.getElementById("searchNovel");
const filter=document.getElementById("filterNovel");

let novels=JSON.parse(localStorage.getItem("novels"))||[];

// ============================
// TAMPILKAN NOVEL
// ============================

function tampilNovel(data){

    novelList.innerHTML="";

    if(data.length===0){

        novelList.innerHTML=`

        <div class="empty">

            <i class="fa-solid fa-book-open"></i>

            <h3>Belum Ada Novel</h3>

            <p>Silakan tulis novel terlebih dahulu.</p>

        </div>

        `;

        return;

    }

    data.forEach(function(novel,index){

        const card=document.createElement("div");

        card.className="novel-card";

        card.innerHTML=`

        <h3>${novel.judul}</h3>

        <p><b>Genre :</b> ${novel.genre}</p>

        <p>${novel.sinopsis.substring(0,100)}...</p>

        <small>Status : ${novel.status}</small>

        <div class="button-group">

        <button class="readBtn">📖 Baca</button>

        <button class="editBtn">✏ Edit</button>

        <button class="deleteBtn">🗑 Hapus</button>

        </div>

        `;

        // Baca
        card.querySelector(".readBtn").onclick=function(){

            localStorage.setItem("selectedNovel",JSON.stringify(novel));

            window.location.href="readnovel.html";

        };

        // Edit
        card.querySelector(".editBtn").onclick=function(){

            localStorage.setItem("editIndex",index);

            window.location.href="editnovel.html";

        };

        // Hapus
        card.querySelector(".deleteBtn").onclick=function(){

            if(confirm("Hapus novel ini?")){

                novels.splice(index,1);

                localStorage.setItem("novels",JSON.stringify(novels));

                tampilNovel(novels);

            }

        };

        novelList.appendChild(card);

    });

}

tampilNovel(novels);

// ============================
// SEARCH
// ============================

if(search){

search.addEventListener("input",function(){

    const key=this.value.toLowerCase();

    const hasil=novels.filter(function(novel){

        return novel.judul.toLowerCase().includes(key);

    });

    tampilNovel(hasil);

});

}

// ============================
// FILTER
// ============================

if(filter){

filter.addEventListener("change",function(){

    if(this.value==="all"){

        tampilNovel(novels);

    }else{

        tampilNovel(

            novels.filter(function(novel){

                return novel.status===filter.value;

            })

        );

    }

});

}