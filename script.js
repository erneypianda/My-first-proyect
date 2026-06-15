const contenedorBuscar =  document.querySelector(".contenedor-buscar");
const botonBuscar =  document.querySelector(".btn-buscar");
const buscadorInput =  document.querySelector(".buscador-input");
const contenedorCards = document.querySelector(".contenedor-cards")

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
        console.log(Object.keys(heroes[0]));
        const heroeEncontrado = heroes.filter(heroe=>
            heroe.localized_name.toLowerCase().includes(heroeBuscado)
        );
        //si no encuentro nada//
        if(heroeEncontrado.length===0){
            alert("Heroe no encontrado");
            return;
        }
        //limpio el contenedor//
        contenedorCards.innerHTML= "";
        //por cada heroe encontrado//
         heroeEncontrado.forEach(heroe => {
            //saca la imagen//
            let nombreLimpio = heroe.name.replace("npc_dota_hero_","")
            let imagen = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${nombreLimpio}.png`;
       
            let div = document.createElement("div");
            div.classList.add("card-heroe");
            div.innerHTML=` <img src="${imagen}" alt="${heroe.localized_name}">
                <p>${heroe.localized_name}</p>`;
         

            div.addEventListener("click",() => {
                localStorage.setItem("heroeSeleccionado",JSON.stringify(heroe));
                window.location.href ="heroe.html";
            })
               
             contenedorCards.appendChild(div);
         });
    })


});








