let canvas = document.getElementById("canvas");
let ctx;
let sprites;
let lastRender = 0;
let game = new Game();
let raf;


//quand la page à chargé tous ses fichiers.
window.onload = function () {
    init();
}

//Function qui se chargera d'executer toutes les autres fonctions
function init() {
    ctx = canvas.getContext("2d");

    initListener();

    loadSprites();
    console.log("sprites loaded");

    game.start();

}