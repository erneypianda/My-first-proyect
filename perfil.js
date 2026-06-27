
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
       <div class="perfil-card">
       
       <img src="${jugador.profile.avatarfull}" alt="avatar" class="avatar-jugador">
       <h2>${ jugador.profile.personame || "Jugador Anónimo"}</h2>

       <div class=" stats.jugador">
       <p> Rank Tier: ${jugador.rank_tier}</p>
       <p> LeaderBoard: ${jugador.leaderboard_rank}</p>
       <p> Pais : ${jugador.profile.loccountrycode}</p>
       </div>
       <divclass="winlose-jugador">
            <p>✅ Victorias: ${winLose.win}</p>
            <p>❌ Derrotas: ${winLose.lose}</p>
            <p>📈 % Victorias: ${porcentajeVictorias}%</p>>
       </div>
       </div>
      
        `;
        //fetch de los heroes top5

      fetch("https://api.opendota.com/api/heroStats")
      .then(response=> response.json())
        .then(todosHeroes =>{
        
        fetch(`https://api.opendota.com/api/players/${id}/heroes`)
        .then(response=> response.json())
        .then(topHeroesJugador =>{

            const top5 = topHeroesJugador.slice(0,5);
             let htmlHeroes = `<h3>🦸 Top 5 Héroes</h3><div class="top-heroes-container">`;


            top5.forEach(heroeJugador => {
    const heroeInfo = todosHeroes.find(h => h.id === heroeJugador.hero_id);
    let nombreLimpio = heroeInfo.name.replace("npc_dota_hero_", "");
    let imagenHeroe = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${nombreLimpio}.png`;

    htmlHeroes += `
        <div class="mini-card-heroe">
            <img src="${imagenHeroe}" alt="${heroeInfo.localized_name}">
            <p>${heroeInfo.localized_name}</p>
            <small>${heroeJugador.games} partidas | ${heroeJugador.win} victorias</small>
        </div>
    `;

                   });

                 htmlHeroes += `</div>`;
                 perfilJugador.innerHTML += htmlHeroes;
                 fetch(`https://api.opendota.com/api/players/${id}/recentMatches`)
                    .then(response => response.json())
                    .then(partidas => {

                        const ultimas10 = partidas.slice(0, 10);
                        let htmlPartidas = `<h3>📜 Últimas 10 Partidas</h3><div class="partidas-container">`;

                        ultimas10.forEach(partida => {
                            const heroeInfoPartida = todosHeroes.find(h => h.id === partida.hero_id);

                            let esRadiant = partida.player_slot < 128;
                            let ganaste = (esRadiant && partida.radiant_win) || (!esRadiant && !partida.radiant_win);

                            let minutos = Math.floor(partida.duration / 60);
                            let segundos = partida.duration % 60;

                            htmlPartidas += `
                                <div class="card-partida ${ganaste ? 'victoria' : 'derrota'}">
                                    <p class="resultado">${ganaste ? '✅ Victoria' : '❌ Derrota'}</p>
                                    <p>${heroeInfoPartida.localized_name}</p>
                                    <p>⏱️ ${minutos}:${segundos.toString().padStart(2, '0')}</p>
                                    <p>⚔️ ${partida.kills}/${partida.deaths}/${partida.assists}</p>
                                </div>
                            `;
                        });

                        htmlPartidas += `</div>`;
                        perfilJugador.innerHTML += htmlPartidas;
                    });

                });

            });
        });    
    });
});


