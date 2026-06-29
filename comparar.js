const inputJugadorA = document.querySelector("#inputJugadorA");
const inputJugadorB = document.querySelector("#inputJugadorB");
const botonComparar = document.querySelector("#btnComparar");
const ResultadoComparacion = document.querySelector("resultadoComparacion");
botonComparar.addEventListener("click",()=> {
    const idA = inputJugadorA.value.trim();
    const idB = inputJugadorB.value.trim();
    if(idA === "" || idB ===""){
        alert("Debes ingresar ambos ID");

        return;
    }
    console.log(`comparando ${idA} y ${idB}`);
fetch(`https://api.opendota.com/api/players/${idA}`)
.then(response => response.json())
.then(jugadorA => {

    fetch(`https://api.opendota.com/api/players/${idB}`)
    .then(response => response.json())
    .then(jugadorB => {

        // FETCH WIN/LOSE DE AMBOS
        fetch(`https://api.opendota.com/api/players/${idA}/wl`)
        .then(response => response.json())
        .then(wlA => {

            fetch(`https://api.opendota.com/api/players/${idB}/wl`)
            .then(response => response.json())
            .then(wlB => {

                let porcentajeA = ((wlA.win / (wlA.win + wlA.lose)) * 100).toFixed(1);
                let porcentajeB = ((wlB.win / (wlB.win + wlB.lose)) * 100).toFixed(1);

                resultadoComparacion.innerHTML = `
                    <div class="comparacion-container">
                        <div class="jugador-comparar">
                            <img src="${jugadorA.profile.avatarfull}" alt="avatar">
                            <h3>${jugadorA.profile.personaname || "Anónimo"}</h3>
                            <p>Rank: ${jugadorA.rank_tier}</p>
                            <p>Victorias: ${wlA.win}</p>
                            <p>% Victorias: ${porcentajeA}%</p>
                        </div>

                        <div class="vs-text">VS</div>

                        <div class="jugador-comparar">
                            <img src="${jugadorB.profile.avatarfull}" alt="avatar">
                            <h3>${jugadorB.profile.personaname || "Anónimo"}</h3>
                            <p>Rank: ${jugadorB.rank_tier}</p>
                            <p>Victorias: ${wlB.win}</p>
                            <p>% Victorias: ${porcentajeB}%</p>
                        </div>
                    </div>
                `;
            });
        });
    });
});
            

 });
