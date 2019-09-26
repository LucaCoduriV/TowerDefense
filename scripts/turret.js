let levels = {
    level1: "assets/sprites/towerDefense_tile249.png",
    level2: "assets/sprites/towerDefense_tile250.png"
}

class Bullet {
    constructor(angle, speed, positionX, positionY) {
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/towerDefense_tile297.png";
        this.position = {X: positionX, Y:positionY};
        this.speed = speed;
        this.angle = angle;
    }

    drawBullet() {
        ctx.save();
        ctx.translate(this.position.X, this.position.Y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.drawImage(this.sprite, -spritesGroundSize / 2, -spritesGroundSize / 2, spritesGroundSize, spritesGroundSize); //-spritesGroudSize / 2 permet de placer le sprite en gardant l'origine au milieu de l'image
        ctx.restore();
    }

    move() {
        this.position.X += this.speed * Math.sin(this.angle * Math.PI / -180);
        this.position.Y += this.speed * Math.cos(this.angle * Math.PI / -180);
    }

    hitTarget() {

    }
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
        //ces lignes de codes sont appliqué seulement quand un ennemis se trouve sur la map
        try{
            var nearestEnnemy = this.lookForNearestEnnemy(ennemies);

            var angle = this.acquireTarget(ennemies, nearestEnnemy);
        }catch(e){
            console.log("aucun ennemis détecté");
            angle = 0;
        }


        ctx.drawImage(this.turretBaseSprite, spritesGroundSize * this.position.X, spritesGroundSize * this.position.Y, spritesGroundSize, spritesGroundSize);
        ctx.save();
        ctx.translate(spritesGroundSize * this.position.X + spritesGroundSize / 2, spritesGroundSize * this.position.Y + spritesGroundSize / 2);
        //ces lignes de codes sont appliqué seulement quand un ennemis se trouve sur la map
        // la rotation relative à la position du joueur - 90 degrés pour que le cannon pointe le joueur
        try{
            ctx.rotate((Math.atan(this.distBetweenTurretEnnemyY(ennemies, nearestEnnemy) / this.distBetweenTurretEnnemyX(ennemies, nearestEnnemy))) + angle);
        }catch(e){
            console.log("aucun ennemis détecté");
        }

        ctx.drawImage(this.sprite, -spritesGroundSize/2, -spritesGroundSize/2, spritesGroundSize, spritesGroundSize);
        ctx.restore();
    }



    acquireTarget(ennemies,id){
        //Est la distance entre la tourrelle et le joueur.
        var angle = (this.position.X * spritesGroundSize - ennemies[id].position.X > 0) ? (-90 * Math.PI / 180) : (90 * Math.PI / 180);
        return angle;
    }

    distBetweenTurretEnnemyX(ennemies,id){
        return this.position.X * spritesGroundSize - ennemies[id].position.X;
    }
    distBetweenTurretEnnemyY(ennemies,id){
        return this.position.Y * spritesGroundSize - ennemies[id].position.Y;
    }

    distBetweenTurretEnnemy(ennemy) {
        var distX = this.position.X * spritesGroundSize - ennemy.position.X;
        var distY = this.position.Y * spritesGroundSize - ennemy.position.Y;

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
