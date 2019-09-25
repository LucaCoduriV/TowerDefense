//variable pour tester les objets.
map = new Map();
vert = new Ennemy(1, 200, ennemyType.GREEN);
var turretsPositions = new Array(map.cords.length);
for (var i = 0; i < turretsPositions.length; i++) {
    turretsPositions[i] = new Array(map.cords[0].length)
}


//cette fonction dessine sur le canevas
function draw() {
    map.drawMap();
    vert.drawEnnemy();
    defense.drawTurret();
    defense1.drawTurret();


}

//Cette fonction met à jour les éléments
function update() {
    if(key_left){
        vert.position.X -= 0.1;
    }
    if(key_right){
        vert.position.X += 0.1;
    }
    if(key_up){
        vert.position.Y -= 0.1;
    }
    if(key_down){
        vert.position.Y += 0.1;
    }

}

//cette fonction représente la gameloop du jeu
function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}