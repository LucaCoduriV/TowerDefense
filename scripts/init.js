let canvas;
let ctx;
let sprites;
var lastRender = 0;
var defense = new Turret(levels.level1, 10, 2);
var defense1 = new Turret(levels.level1, 5, 2);
var bullet = new Bullet(79, 2, 600,300);
var map = new Map();

//var vert = new Ennemy(1, 200, ennemyType.GREEN);
//var vert2 = new Ennemy(1, 200, ennemyType.GREEN);

//vert.position.X =  1;
//vert.position.Y =  1;

var ennemies = ennemyFactory(10,0,1,1000);



var turretsPositions = new Array(map.cords.length);


for (var i = 0; i < turretsPositions.length; i++) {
    turretsPositions[i] = new Array(map.cords[0].length);
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

    requestAnimationFrame(loop);

}