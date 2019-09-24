let canvas;
let ctx;
let sprites;
var defense = new Turret(levels.level1, 10, 4);
var defense1 = new Turret(levels.level1, 10, 1);





//quand la page à chargé tous ses fichiers
window.onload = function () {
    main();
}

//Function qui se chargera d'executer toutes les autres fonctions
function main() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    loadSprites();
    console.log("sprites loaded");

    loop();


}