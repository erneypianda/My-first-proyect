const botonBuscarJugador = document.querySelector("#btnbuscarJugador");
const inputSteamId = document.querySelector("#inputSteamId");
const perfilJugador = document.querySelector("#perfilJugador");

botonBuscarJugador.addEventListener("click", () => {
    const id = inputSteamId.value.trim();

    if(id === "") {
        alert("Debe introducir un ID");
        return;
    }

    console.log("BuscandoJugador: " + id);

    // DATOS DEL JUGADOR
    fetch(`https://api.opendota.com/api/players/${id}`)
    .then(response => response.json())
    .then(jugador => {
      
   // DATOS DE WIN Y LOSE
    fetch (`https://api.opendota.com/api/players/${id}/wl`)
    .then(response => response.json())
    .then(winLose =>{
      
      let totalPartidas = winLose.win + winLose.lose;
      let porcentajeVictorias = ((winLose.win/totalPartidas)*100).toFixed(2);


        perfilJugador.innerHTML = `
        <img src="${jugador.profile.avatarfull}" alt"avatar">
        <h2>  ${jugador.profile.personaname}</h2>
        <p> Rank Tier: ${jugador.rank_tier}</p>
        <p> LeaderBoard: ${jugador.leaderboard_rank}</p>
        <p> Countrie : ${jugador.loccountrycode}</p>
        <p> Victorias : ${winLose.win}</p>
        <p> Derrotas : ${winLose.lose}</p>
        <p> %Victorias: ${porcentajeVictorias}</p>

        `;
       
      
        });
    });
});