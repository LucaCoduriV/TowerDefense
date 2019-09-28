//tuto https://www.sitepoint.com/quick-tip-game-loop-in-javascript/
//tuto2 https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics
//tuto3 https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing#choosing-timestep
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
//https://www.briankoponen.com/html5-javascript-game-tutorial-space-invaders-part-5/
//cette fonction dessine sur le canevas

class Game{
    static map = new Map();
    static defense = new Turret(levels.level1, 9, 2);
    static defense1 = new Turret(levels.level1, 5, 2);
    static ennemies = ennemyFactory(20,0 * spritesGroundSize,1 * spritesGroundSize,1000);
    static bullet = new Bullet(79, 2, 600,300);
    static turretsPositions = new Array(Game.map.cords.length);

    constructor(){
        for (var i = 0; i < Game.turretsPositions.length; i++) {
            Game.turretsPositions[i] = new Array(Game.map.cords[0].length);
        }
    }

    static start(){
        requestAnimationFrame(this.loop);
    }

    static draw(secondsPassed) {
        Game.map.drawMap();
        Game.defense.drawTurret(Game.ennemies);
        Game.defense1.drawTurret(Game.ennemies);

        Game.bullet.drawBullet();

        for (var i = 0; i < Game.ennemies.length; i++) {
            if (Game.ennemies[i]!== undefined) Game.ennemies[i].drawEnnemy();
        }

        this.drawFPS(secondsPassed);
    }

//Cette fonction met à jour les éléments
    static update() {
        if (key_left) {
            Game.ennemies[0].position.X -= 10;
        }
        if (key_right) {
            Game.ennemies[0].position.X += 10;
        }
        if (key_up) {
            Game.ennemies[0].position.Y -= 10;
        }
        if (key_down) {
            Game.ennemies[0].position.Y += 10;
        }
        for (var i = 0; i < Game.ennemies.length; i++) {
            if (Game.ennemies[i]!== undefined) {
                Game.ennemies[i].updateHitbox();
                Game.ennemies[i].checkColisionEnnemyWaypoint();
                Game.ennemies[i].followWaypoints();

            }

            //ennemies[0].checkColisionEnnemyWaypoint();
        }
        try {
            //console.log(ennemies[0].position);
            //console.log(Math.floor(ennemies[0].position.X), Math.floor(ennemies[0].position.Y));
            //console.log("waypoint: " + ennemies[0].waypointId);
        } catch (e) {

        }
        Game.bullet.move();

    }

//cette fonction représente la gameloop du jeu
    static loop(timestamp) {
        //Calculate the number of seconds passed
        //since the last frame
        var secondsPassed = (timestamp - lastRender) / 1000;
        //Calculate fps


        Game.update();
        Game.draw(secondsPassed);

        lastRender = timestamp;
        requestAnimationFrame(Game.loop);
    }

    static drawFPS(secondsPassed) {
        var fps = Math.round(1 / secondsPassed);
        //Draw number to the screen
        ctx.font = '25px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText("FPS: " + fps, 10, 30);
    }

}







