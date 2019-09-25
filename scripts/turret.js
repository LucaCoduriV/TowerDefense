let levels = {
    level1: "assets/sprites/towerDefense_tile249.png",
    level2: "assets/sprites/towerDefense_tile250.png"
}

class Turret {
    constructor(level, positionX, positionY) {
        this.sprite = new Image();
        this.sprite.src = level;
        this.position = {X: positionX, Y: positionY};
        this.turretBaseSprite = new Image();
        this.turretBaseSprite.src = "assets/sprites/towerDefense_tile181.png";
        this.fireRate;
        this
    }

    drawTurret() {
        //Est la distance entre la tourrelle et le joueur.
        var distBetweenTurretEnnemy = {
            X: this.position.X - vert.position.X,
            Y: this.position.Y - vert.position.Y
        }
        var angle = (this.position.X - vert.position.X > 0) ? (-90 * Math.PI / 180):(90 * Math.PI / 180);


        ctx.drawImage(this.turretBaseSprite, spritesGroundSize * this.position.X, spritesGroundSize * this.position.Y, spritesGroundSize, spritesGroundSize);
        ctx.save();
        ctx.translate(spritesGroundSize * this.position.X + spritesGroundSize / 2, spritesGroundSize * this.position.Y + spritesGroundSize / 2);
        // la rotation relative à la position du joueur - 90 degrés pour que le cannon pointe le joueur
        ctx.rotate((Math.atan(distBetweenTurretEnnemy.Y / distBetweenTurretEnnemy.X)) + angle);
        ctx.drawImage(this.sprite, -50, -50, spritesGroundSize, spritesGroundSize);
        ctx.restore();
    }

    shoot() {

    }

    getDestroyed() {

    }

}
class Bullet {
    constructor() {

    }
}