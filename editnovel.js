// Ambil index novel yang dipilih
const index = localStorage.getItem("editNovelIndex");

const novels = JSON.parse(localStorage.getItem("novels")) || [];

// Jika data ada
if(index !== null && novels[index]){

    document.getElementById("judul").value = novels[index].judul;
    document.getElementById("genre").value = novels[index].genre;
    document.getElementById("sinopsis").value = novels[index].sinopsis;
    document.getElementById("isiNovel").value = novels[index].isiNovel;

}

// Simpan perubahan
document.getElementById("editForm").addEventListener("submit",function(e){

    e.preventDefault();

    novels[index].judul = document.getElementById("judul").value;
    novels[index].genre = document.getElementById("genre").value;
    novels[index].sinopsis = document.getElementById("sinopsis").value;
    novels[index].isiNovel = document.getElementById("isiNovel").value;

    localStorage.setItem("novels",JSON.stringify(novels));

    alert("Novel berhasil diperbarui!");

    window.location.href="mynovel.html";

});