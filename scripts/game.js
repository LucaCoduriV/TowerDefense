//tuto https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
//tuto2 https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
//tuto3 https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#choosing-timestep
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://www.briankoponen.com/html5-javascript-game-tutorial-space-invaders-part-5/
//cette fonction dessine sur le canevas
//todo adapter la vitesse en fonction de la taille du canevas

class Game{
    remainingRefreshes = 3600; //Nombre de refresh restants à effectuer pour 1 minutes
    _UI;
    constructor(){
        this.load();
    }

    load(){
        Entity.turretsPositions.forEach((element) => {element = new Array(Entity.map.cords[0].length);})
        Entity.ennemies = Entity.createEnnemy(20,0 * spritesGroundSize,1 * spritesGroundSize,1500);
        this._UI = new Interface(0,0,50,1600,"rgba(0,0,0,0.3)");
        this._UI.addUIObjects(new Button(1090,5,40,100,"Menu", "rgba(100,100,100,0.8)","rgba(255,255,255,1)","30px Arial","rgb(201,201,201)"));
        this._UI.addUIObjects(new Button(980,5,40,100,"Pause", "rgba(100,100,100,0.8)","rgba(255,255,255,1)","30px Arial","rgb(201,201,201)"));
    }

    start(){
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    draw(secondsPassed) {
        Entity.map.drawMap();
        Entity.bullets.forEach( (element) => element.draw());
        Entity.defense.draw();
        Entity.defense1.draw();

        Entity.ennemies.forEach( (element) => element.draw());

        //dessiner le menu
        //todo fair een sorte que le menu se raffraichisse seuelement quand il y a du changement
        this._UI.draw();
        this.drawFPS(secondsPassed);
    }

//Cette fonction met à jour les éléments
    update(timestamp) {
        Entity.defense.update();
        Entity.defense1.update();
        Entity.bullets.forEach( (element) => element.update());
        this._UI.update();

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

        if (this.remainingRefreshes > 1) {
            this.remainingRefreshes--;
        }
        else {
            this.remainingRefreshes = 3600;
        }

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







