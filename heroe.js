//lee el heroe guardado//

let heroeGuardado = localStorage.getItem("heroeSeleccionado")
if(!heroeGuardado){
   window.location.href="index.html";
}
console.log("heroe.js cargado")
console.log(heroeGuardado)

 let heroe = JSON.parse(heroeGuardado)
 //muestra los datos//
 let nombreLimpio = heroe.name.replace("npc_dota_hero_","")
 let imagen = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${nombreLimpio}.png`;

 //llamarlasimagenesdelaapi//

document.getElementById("imgHeroe").src=imagen;
document.getElementById("nombreHeroe").textContent=heroe.localized_name;
document.getElementById("atributo").textContent=heroe.primary_attr;
document.getElementById("tipoAtaque").textContent=heroe.attack_type;
document.getElementById("roles").textContent=heroe.roles.join(", ");
document.getElementById("vidaBase").textContent=heroe.base_health;
document.getElementById("manaBase").textContent=heroe.base_mana;
document.getElementById("armaduraBase").textContent=heroe.base_armor;

//botoonvolver//
console.log("heroe.js cargado");
console.log(localStorage.getItem("heroeSeleccionado"));

document.getElementById("btnVolver")
.addEventListener("click",()=>{
window.location.href="index.html";


});
