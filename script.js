let filtroAtributoActual = "all";
let todosLosHeroes=[];

const contenedorBuscar = document.querySelector(".contenedor-buscar");
const botonBuscar = document.querySelector(".btn-buscar");
const buscadorInput = document.querySelector(".buscador-input");
const contenedorCards = document.querySelector(".contenedor-cards");

const linkApi = "https://api.opendota.com/api/heroStats";

// ← FUNCIÓN que muestra héroes (nueva)
function mostrarHeroes(listaHeroes) {
    contenedorCards.innerHTML = "";

    listaHeroes.forEach(heroe => {
        let nombreLimpio = heroe.name.replace("npc_dota_hero_", "");
        let imagen = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${nombreLimpio}.png`;

        let div = document.createElement("div");
        div.classList.add("card-heroe");
        div.innerHTML = `
            <img src="${imagen}" alt="${heroe.localized_name}">
            <p>${heroe.localized_name}</p>
        `;

        div.addEventListener("click", () => {
            localStorage.setItem("heroeSeleccionado", JSON.stringify(heroe));
            window.location.href = "heroe.html";
        });

        contenedorCards.appendChild(div);
    });
}
function filtrarYMostrar (){
    const textoBuscado = buscadorInput.value.trim().toLowerCase();
    //REUBICADO FILTRO ANTIGUO//

    const heroesFiltrados = todosLosHeroes.filter(heroe=>{
        const coincideNombre = heroe.localized_name.toLowerCase().includes(textoBuscado);

        const coincideAtributo = (filtroAtributoActual==="all")||(heroe.primary_attr === filtroAtributoActual)

        return coincideNombre &&  coincideAtributo ;
    });

 if(heroesFiltrados.length === 0) {
    alert("Héroe no encontrado");
    return;
}
mostrarHeroes(heroesFiltrados);

}
// ← CARGA TODOS AL INICIO (nuevo)
fetch(linkApi)
.then(response => response.json())
.then(heroes => {
    mostrarHeroes(heroes);
    todosLosHeroes = heroes;
});

// ← BUSCADOR FILTRA
botonBuscar.addEventListener("click", () => {
    const textoBuscado = buscadorInput.value.trim().toLowerCase();

    if(textoBuscado === "") {
        alert("Debe introducir el nombre de un heroe");
        return;
    }
filtrarYMostrar();
});

document.querySelectorAll(".btn-filtro").forEach(boton=>{
    boton.addEventListener("click",(e)=>{
        document.querySelectorAll(".btn-filtro").forEach(b=>
            b.classList.remove("activo")
        );
        e.target.classList.add("activo");
        
        filtroAtributoActual = e.target.getAttribute("data-atri");

        filtrarYMostrar();
    });

});














