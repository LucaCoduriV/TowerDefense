let levels = {
    level1: "assets/sprites/towerDefense_tile249.png",
    level2: "assets/sprites/towerDefense_tile250.png"
}

class Bullet {
    constructor(angle, speed, positionX, positionY) {
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/towerDefense_tile297.png";
        this.position = {X: positionX, Y: positionY};
        this.speed = speed;
        this.angle = angle - Math.PI / 2;
    }

    draw() {
        this.drawBullet();

    }

    update() {
        this.move();
    }


    drawBullet() {
        ctx.save();
        ctx.translate(this.position.X, this.position.Y);
        ctx.rotate(this.angle - Math.PI / 2);
        ctx.drawImage(this.sprite, -spritesGroundSize / 2, -spritesGroundSize / 2, spritesGroundSize, spritesGroundSize); //-spritesGroudSize / 2 permet de placer le sprite en gardant l'origine au milieu de l'image
        ctx.restore();
    }

    move() {
        this.position.X += this.speed * Math.cos(this.angle);
        this.position.Y += this.speed * Math.sin(this.angle);
    }

    hitTarget() {

    }
}

class Turret {
    _distanceBetweenTurretEnnemy;
    _nearestEnnemy;
    _hitbox;

    constructor(level, positionX, positionY) {
        this.sprite = new Image();
        this.sprite.src = level;
        this.position = {X: positionX, Y: positionY};
        this.turretBaseSprite = new Image();
        this.turretBaseSprite.src = "assets/sprites/towerDefense_tile181.png";
        this.angle = 0;
        this.fireRate = 15;
        this.range = 2.5 * spritesGroundSize;
        this._hitbox = {
            X: positionX * spritesGroundSize,
            Y: positionY * spritesGroundSize,
            W: spritesGroundSize,
            H: spritesGroundSize
        };
    }

    draw() {
        //quand la souris est sur la tourelle
        if(this.isMouseOnTurret()){
            this.drawRange();
        }

        this.drawTurret(Entity.ennemies);
    }

    update() {

        //vérifier si un ennemis se trouve sur la map
        if (Entity.ennemies.length > 0) {
            this.angle = this.acquireTargetAngle(Entity.ennemies);
        }
        this.shoot();
    }

    drawTurret(ennemies) {
        ctx.drawImage(this.turretBaseSprite, spritesGroundSize * this.position.X, spritesGroundSize * this.position.Y, spritesGroundSize, spritesGroundSize);
        ctx.save();
        ctx.translate(spritesGroundSize * this.position.X + spritesGroundSize / 2, spritesGroundSize * this.position.Y + spritesGroundSize / 2);
        //ces lignes de codes sont appliqué seulement quand un ennemis se trouve sur la map
        // la rotation relative à la position du joueur - 90 degrés pour que le cannon pointe le joueur
        ctx.rotate(this.angle);
        ctx.drawImage(this.sprite, -spritesGroundSize / 2, -spritesGroundSize / 2, spritesGroundSize, spritesGroundSize);
        ctx.restore();
    }

    drawRange() {
        ctx.save();
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.strokeStyle = "rgba(0,0,0)";
        ctx.beginPath();
        ctx.arc(this.position.X * spritesGroundSize + spritesGroundSize / 2, this.position.Y * spritesGroundSize + spritesGroundSize / 2, this.range, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    intersectRectanglePoint(x1, y1, w1, h1, x2, y2) {
        if (x2 > x1 + w1 || x2 < x1 || y2 < y1 || y2 > y1 + h1) {
            return false;
        }
        return true;
    }

    isMouseOnTurret() {
        return this.intersectRectanglePoint(this._hitbox.X, this._hitbox.Y, this._hitbox.W, this._hitbox.H, Mouse.position.X, Mouse.position.Y);
    }




    //Trouve l'angle que la tourrelle doit prendre pour viser l'ennemi le plus proche
    acquireTargetAngle(ennemies) {
        this._nearestEnnemy = this.lookForNearestEnnemy(ennemies);
        let angleCorrection = (-90 * Math.PI / 180);
        let angle = ((Math.atan2(this.distBetweenTurretEnnemyY(ennemies, this._nearestEnnemy), this.distBetweenTurretEnnemyX(ennemies, this._nearestEnnemy))) + angleCorrection);
        return angle;
    }

    //Est la distance entre la tourrelle et le joueur sur l'axe X
    distBetweenTurretEnnemyX(ennemies, id) {
        return this.position.X * spritesGroundSize - ennemies[id].position.X;
    }

    //Est la distance entre la tourrelle et le joueur sur l'axe Y
    distBetweenTurretEnnemyY(ennemies, id) {
        return this.position.Y * spritesGroundSize - ennemies[id].position.Y;
    }

    //Est la distance entre la tourrelle et le joueur.
    distBetweenTurretEnnemy(ennemy) {
        let distX = this.position.X * spritesGroundSize - ennemy.position.X;
        let distY = this.position.Y * spritesGroundSize - ennemy.position.Y;

        return Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2));
    }

    //Cherche l'id de l'ennemi le plus proche de la tourrelle en question
    lookForNearestEnnemy(ennemies) {
        let nearestId;

        for (let i = 0; i < ennemies.length; i++) {
            if (ennemies[i] !== undefined) {
                if (i === 0) {
                    this._distanceBetweenTurretEnnemy = this.distBetweenTurretEnnemy(ennemies[i]);
                    nearestId = i;
                }
                if (this.distBetweenTurretEnnemy(ennemies[i]) < this._distanceBetweenTurretEnnemy) {
                    this._distanceBetweenTurretEnnemy = this.distBetweenTurretEnnemy(ennemies[i]);
                    nearestId = i;
                }
            }
        }
        return nearestId;
    }

    //Tir
    shoot() {
        //on verifie si l'ennemi se trouve dans le range de la tourelle
        if (this._distanceBetweenTurretEnnemy < this.range) {
            //À la fin des 60 refresh, on crée une balle (Ici, une balle est créée chaque seconde)
            if (game.remainingRefreshes % this.fireRate === 0) {
                Entity.createBullet(this.angle, 5, spritesGroundSize * this.position.X + spritesGroundSize / 2, spritesGroundSize * this.position.Y + spritesGroundSize / 2);
            }
        }


    }

    getDestroyed() {

    }

}
