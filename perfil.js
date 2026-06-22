const botonBuscarJugador = document.querySelector("#btnbuscarJugador");
const inputSteamId = document.querySelector("#inputSteamId");
const perfilJugador = document.querySelector("#perfilugador");

botonBuscarJugador.addEventListener("click", () => {

 const id = inputSteamId.value.trim();

 if(id===""){
    alert("Debe introducir un Id ");
    return ;
 }
 fetch(`https://api.opendota.com/api/players/${id}`)
 .then(response=>response.json())
 .then(jugador =>{
    console.log("jugador")
 })
 
 console.log("BuscandoJugador: " + id);

});
