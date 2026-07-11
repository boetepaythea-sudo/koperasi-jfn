document.getElementById("root").innerHTML=`

<div class="sidebar">

<h3>KOPERASI</h3>

<button onclick="menu('dashboard')">Dashboard</button>
<button onclick="menu('anggota')">Anggota</button>
<button onclick="menu('simpanan')">Simpanan</button>
<button onclick="menu('pinjaman')">Pinjaman</button>
<button onclick="menu('setoran')">Setoran</button>
<button onclick="menu('neraca')">Neraca</button>

</div>


<div class="content">

<div id="dashboard">
<h2>Dashboard</h2>
<p>Selamat datang di aplikasi koperasi.</p>
</div>


<div id="anggota" style="display:none">
<h2>Data Anggota</h2>
</div>


<div id="simpanan" style="display:none">
<h2>Data Simpanan</h2>
</div>


<div id="pinjaman" style="display:none">
<h2>Data Pinjaman</h2>
</div>


<div id="setoran" style="display:none">
<h2>Setoran Pinjaman</h2>
</div>


<div id="neraca" style="display:none">
<h2>Neraca</h2>
</div>


</div>

`;


window.menu=function(id){

[
"dashboard",
"anggota",
"simpanan",
"pinjaman",
"setoran",
"neraca"
].forEach(x=>{

document.getElementById(x).style.display="none";

});


document.getElementById(id).style.display="block";

}
