//variable pour tester les objets
map = new Map();
vert = new Ennemy(1, 100, ennemyType.GREEN);


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