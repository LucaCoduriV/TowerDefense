//tuto https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
//tuto2 https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
//tuto3 https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#choosing-timestep
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://www.briankoponen.com/html5-javascript-game-tutorial-space-invaders-part-5/
//cette fonction dessine sur le canevas

class Game{
    constructor(){
        let that = this;
        for (let i = 0; i < Entity.turretsPositions.length; i++) {
            Entity.turretsPositions[i] = new Array(Entity.map.cords[0].length);
        }
        Entity.ennemies = Entity.createEnnemy(20,0 * spritesGroundSize,1 * spritesGroundSize,1000);
    }

    start(){
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    draw(secondsPassed) {
        Entity.map.drawMap();
        Entity.defense.draw();
        Entity.defense1.draw();



        // for (let i = 0; i < Entity.bullets.length; i++) {
        //     if (Entity.bullets[i]!== undefined) Entity.bullets[i].drawBullet();
        // }
        for (let i = 0; i < Entity.ennemies.length; i++) {
            if (Entity.ennemies[i]!== undefined) Entity.ennemies[i].draw();
        }

        this.drawFPS(secondsPassed);
    }

//Cette fonction met à jour les éléments
    update(timestamp) {
        Entity.defense.update();
        Entity.defense1.update();

        if (key_left) {
            Entity.ennemies[0].position.X -= 10;
        }
        if (key_right) {
            Entity.ennemies[0].position.X += 10;
        }
        if (key_up) {
            Entity.ennemies[0].position.Y -= 10;
        }
        if (key_down) {
            Entity.ennemies[0].position.Y += 10;
        }
        for (let i = 0; i < Entity.ennemies.length; i++) {
            if (Entity.ennemies[i]!== undefined) {
                Entity.ennemies[i].update();
            }
        }
    }



//cette fonction représente la gameloop du jeu
    loop(timestamp) {
        //Calculate the number of seconds passed
        //since the last frame
        let secondsPassed = (timestamp - lastRender) / 1000;
        //Calculate fps


        this.update(timestamp);
        this.draw(secondsPassed);

        lastRender = timestamp;
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    drawFPS(secondsPassed) {
        let fps = Math.round(1 / secondsPassed);
        //Draw number to the screen
        ctx.font = '25px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText("FPS: " + fps, 10, 30);
    }

}







