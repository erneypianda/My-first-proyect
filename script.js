const contenedorBuscar =  document.querySelector(".contenedor-buscar");
const botonBuscar =  document.querySelector(".btn-buscar");
const buscadorInput =  document.querySelector(".buscador-input");

const linkApi = "https://api.opendota.com/api/heroStats";
botonBuscar.addEventListener("click",()=>{
    const heroeBuscado = buscadorInput.value.trim().toLowerCase();

    if(heroeBuscado===""){
        alert("Debe introducir el nombre de un heroe")
    }
    console.log("buscando="+heroeBuscado);
    fetch(linkApi)
    .then(response=>response.json())
    .then(heroes=>{
        const heroeEncontrado = heroes.filter(heroe=>
            heroe.localized_name.toLowerCase().includes(heroeBuscado)
        )
    })


});





