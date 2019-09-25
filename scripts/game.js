//cette fonction dessine sur le canevas
function draw() {
    map.drawMap();
    vert.drawEnnemy();
    vert2.drawEnnemy();
    defense.drawTurret(ennemies);
    defense1.drawTurret(ennemies);
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
    console.log(defense.lookForNearestEnnemy(ennemies));

}

//cette fonction représente la gameloop du jeu
function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}