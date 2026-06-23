
const botonBuscarJugador = document.querySelector("#btnbuscarJugador");
const inputSteamId = document.querySelector("#inputSteamId");
const perfilJugador = document.querySelector("#perfilJugador");

botonBuscarJugador.addEventListener("click", () => {
    const id = inputSteamId.value.trim();

    if(id === "") {
        alert("Debe introducir un ID");
        return;
    }

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
        <img src="${jugador.profile.avatarfull}" alt="avatar">
        <h2>  ${jugador.profile.personaname}</h2>
        <p> Rank Tier: ${jugador.rank_tier}</p>
        <p> LeaderBoard: ${jugador.leaderboard_rank}</p>
        <p> Countrie : ${jugador.profile.loccountrycode}</p>
        <p> Victorias : ${winLose.win}</p>
        <p> Derrotas : ${winLose.lose}</p>
        <p> %Victorias: ${porcentajeVictorias}</p>

        `;
        //fetch de los heroes top5

      fetch("https://api.opendota.com/api/heroStats")
      .then(response=> response.json())
      .then(todosHeroes =>{
        
        fetch(`https://api.opendota.com/api/players/${id}/heroes`)
        .then(response=> response.json())
        .then(topHeroesJugador =>{

            const top5 = topHeroesJugador.slice(0,5);
             let htmlHeroes = "<h3>🦸 Top 5 Héroes</h3>";

            top5.forEach(heroeJugador => {
                const heroeInfo = todosHeroes.find(h => h.id === heroeJugador.hero_id);
                htmlHeroes += `
                <p> ${heroeInfo.localized_name} : ${heroeJugador.games} partidas, ${heroeJugador.win} victorias</p>
                `;
                   });
                 perfilJugador.innerHTML += htmlHeroes;

                });
            });
        });    
    });
});


