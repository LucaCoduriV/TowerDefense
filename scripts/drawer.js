//variable pour tester les objets
map = new Map();
vert = new Ennemy(1, 100, ennemyType.GREEN);

//cette fonction dessine sur le canevas
function draw() {
    map.drawMap();
    vert.drawEnnemy();

}

//Cette fonction met à jour les éléments
function update() {


}

//cette fonction représente la gameloop du jeu
function loop(){

    if(key_left){
        vert.position.X -= 10;
    }
    if(key_right){
        vert.position.X += 10;
    }
    if(key_up){
        vert.position.Y -= 10;
    }
    if(key_down){
        vert.position.Y += 10;
    }

    update();
    draw();
    requestAnimationFrame(loop);
}