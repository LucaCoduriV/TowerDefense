let canvas;
let ctx;
let sprites;
var defense = new Turret(levels.level1, 10, 4);
var defense1 = new Turret(levels.level1, 10, 1);
var bullet = new Bullet(79, 2, 600,300);
var map = new Map();
var vert = new Ennemy(1, 200, ennemyType.GREEN);
var turretsPositions = new Array(map.cords.length);
for (var i = 0; i < turretsPositions.length; i++) {
    turretsPositions[i] = new Array(map.cords[0].length)
}





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

    loop();



}