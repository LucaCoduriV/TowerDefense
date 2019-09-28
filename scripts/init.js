let canvas;
let ctx;
let sprites;
var lastRender = 0;
var game = new Game();












//quand la page à chargé tous ses fichiers.
window.onload = function () {
    init();
}

//Function qui se chargera d'executer toutes les autres fonctions
function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    loadSprites();
    console.log("sprites loaded");

    game.start();

}