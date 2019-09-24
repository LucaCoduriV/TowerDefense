let levels = {
    level1: "assets/sprites/towerDefense_tile249.png",
    level2: "assets/sprites/towerDefense_tile250.png"
}

var turretsPositions = new Array(map.cords.length);
for (var i = 0; i < turretsPositions.length; i++) {
    turretsPositions[i] = new Array(map.cords[0].length)
}

class Turret {
    constructor(level, positionX, positionY) {
        this.level = level;
        this.position = {X: positionX, Y: positionY};
        this.turretBase= new Image();
        this.turretBase.src = "assets/sprites/towerDefense_tile181.png";
    }

    drawTurret(){
        ctx.drawImage(this.turretBase,100 * this.position.X, 100 * this.position.Y, spritesGroundSize, spritesGroundSize);
        ctx.drawImage(this.level,100 * this.position.X, 100 * this.position.Y, spritesGroundSize, spritesGroundSize);
    }

    shoot() {

    }

    getDestroyed() {

    }

    followEnnemy() {

    }
}