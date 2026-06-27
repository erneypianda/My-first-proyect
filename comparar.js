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
        console.log("mostrar:", jugadorA);

        fetch(`https://api.opendota.com/api/players/${idB}`)

        .then(response => response.json())
        .then(jugadorB =>{
            console.log("mostrar:" , jugadorB);

        });

    });
  
});
