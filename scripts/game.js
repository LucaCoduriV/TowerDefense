//tuto https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
//cette fonction dessine sur le canevas
function draw(secondsPassed) {
    map.drawMap();
    //vert.drawEnnemy();
    defense.drawTurret(ennemies);
    defense1.drawTurret(ennemies);
    bullet.drawBullet();
    for (var i = 0; i < ennemies.length; i++) {
        ennemies[i].drawEnnemy();
    }

    drawFPS(secondsPassed);
}

//Cette fonction met à jour les éléments
function update(timestamp) {
    if (key_left) {
        ennemies[0].position.X -= 0.1;
    }
    if (key_right) {
        ennemies[0].position.X += 0.1;
    }
    if (key_up) {
        ennemies[0].position.Y -= 0.1;
    }
    if (key_down) {
        ennemies[0].position.Y += 0.1;
    }

}

//cette fonction représente la gameloop du jeu
function loop(timestamp) {
    //Calculate the number of seconds passed
    //since the last frame
    var secondsPassed = (timestamp - lastRender) / 1000;
    //Calculate fps


    update(timestamp);
    draw(secondsPassed);

    lastRender = timestamp;
    requestAnimationFrame(loop);
}

function drawFPS(secondsPassed){
    var fps = Math.round(1 / secondsPassed);
    //Draw number to the screen
    ctx.font = '25px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText("FPS: " + fps, 10, 30);
}