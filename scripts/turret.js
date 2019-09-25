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
        this.fireRate = 0;
    }

    drawTurret(ennemies) {

        var nearestEnnemy = this.lookForNearestEnnemy(ennemies);

        var angle = this.acquireTarget(ennemies, nearestEnnemy);

        ctx.drawImage(this.turretBaseSprite, spritesGroundSize * this.position.X, spritesGroundSize * this.position.Y, spritesGroundSize, spritesGroundSize);
        ctx.save();
        ctx.translate(spritesGroundSize * this.position.X + spritesGroundSize / 2, spritesGroundSize * this.position.Y + spritesGroundSize / 2);
        // la rotation relative à la position du joueur - 90 degrés pour que le cannon pointe le joueur
        ctx.rotate((Math.atan(this.distBetweenTurretEnnemyY(ennemies, nearestEnnemy) / this.distBetweenTurretEnnemyX(ennemies, nearestEnnemy))) + angle);
        ctx.drawImage(this.sprite, -spritesGroundSize/2, -spritesGroundSize/2, spritesGroundSize, spritesGroundSize);
        ctx.restore();
    }



    acquireTarget(ennemies,id){
        //Est la distance entre la tourrelle et le joueur.
        var angle = (this.position.X - ennemies[id].position.X > 0) ? (-90 * Math.PI / 180) : (90 * Math.PI / 180);
        return angle;
    }

    distBetweenTurretEnnemyX(ennemies,id){
        return this.position.X - ennemies[id].position.X;
    }
    distBetweenTurretEnnemyY(ennemies,id){
        return this.position.Y - ennemies[id].position.Y;
    }

    distBetweenTurretEnnemy(ennemy) {
        var distX = this.position.X - ennemy.position.X;
        var distY = this.position.Y - ennemy.position.Y;

        return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    }

    lookForNearestEnnemy(ennemies) {
        var nearestId;
        var distance = 0;

        for (var i = 0; i < ennemies.length; i++) {
            if(i == 0){
                distance = this.distBetweenTurretEnnemy(ennemies[i]);
                nearestId = i;
            }
            if (this.distBetweenTurretEnnemy(ennemies[i]) < distance){
                distance = this.distBetweenTurretEnnemy(ennemies[i]);
                nearestId = i;
            }
        }
        return nearestId;
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