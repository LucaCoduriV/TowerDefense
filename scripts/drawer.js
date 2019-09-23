//variable pour tester les objets
var map = new Map();
var vert = new Ennemy(1, 100, ennemyType.GREEN);

function draw() {

    map.drawMap();
    vert.drawEnnemy();



}

function update() {
    draw();
    requestAnimationFrame(update);
}