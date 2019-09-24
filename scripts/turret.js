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
        this.level = new Image();
        this.level.src = level;
        this.position = {X: positionX, Y: positionY};
        this.turretBase = new Image();
        this.turretBase.src = "assets/sprites/towerDefense_tile181.png";
    }

    drawTurret() {
        //Est la distance entre la tourrelle et le joueur
        var distBetweenTurretEnnemy = {
            X: this.position.X - vert.position.X,
            Y: this.position.Y - vert.position.Y
        }
        var angle = (this.position.X - vert.position.X > 0) ? (-90 * Math.PI / 180):(90 * Math.PI / 180);


        ctx.drawImage(this.turretBase, spritesGroundSize * this.position.X, spritesGroundSize * this.position.Y, spritesGroundSize, spritesGroundSize);
        ctx.save();
        ctx.translate(spritesGroundSize * this.position.X + spritesGroundSize / 2, spritesGroundSize * this.position.Y + spritesGroundSize / 2);
        // la rotation relative à la position du joueur - 90 degrés pour que le cannon pointe le joueur
        ctx.rotate((Math.atan(distBetweenTurretEnnemy.Y / distBetweenTurretEnnemy.X)) + angle);
        ctx.drawImage(this.level, -50, -50, spritesGroundSize, spritesGroundSize);
        ctx.restore();
    }

    shoot() {

    }

    getDestroyed() {

    }

}