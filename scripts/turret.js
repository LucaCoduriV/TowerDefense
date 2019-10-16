let levels = {
    level1: "assets/sprites/towerDefense_tile249.png",
    level2: "assets/sprites/towerDefense_tile250.png"
}

class Bullet {
    constructor(id, angle, speed, positionX, positionY) {
        this.id = id;
        this.sprite = new Image();
        this.sprite.src = "assets/sprites/towerDefense_tile297.png";
        this.position = {X: positionX, Y: positionY};
        this.hitPoint = {X: this.position.X, Y: this.position.Y}; //Permet d'obtenir les coordonnées centrale de l'image
        this.speed = speed;
        this.angle = angle - Math.PI / 2;
    }

    draw() {
        this.drawBullet();
        ctx.save();
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.fillRect(this.hitPoint.X, this.hitPoint.Y, 10, 10); //Repère visuel pour la hitbox des balles
        ctx.restore();
    }

    update() {
        this.move();
        this.hasHitEnnemy();
        this.isBulletOutOfBundle();
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

        this.hitPoint.X += this.speed * Math.cos(this.angle);
        this.hitPoint.Y += this.speed * Math.sin(this.angle);
    }

    getDistanceBetweenTwoPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    intersectCirclePoint(x1, y1, radius, x2, y2) {
        if (this.getDistanceBetweenTwoPoints(x1, y1, x2, y2) < radius) {
            return true;
        }
        return false;
    }

    hasHitEnnemy() {
        for (let i = 0; i < Entity.ennemies.length; i++) {
            if (this.intersectCirclePoint(Entity.ennemies[i].circleHitbox.centerPosition.X, Entity.ennemies[i].circleHitbox.centerPosition.Y, Entity.ennemies[i].circleHitbox.radius, this.hitPoint.X, this.hitPoint.Y)) {
                //remove ennemy life
                if (Entity.ennemies[i].lifePoint >= 0) Entity.ennemies[i].lifePoint -= 5;
                //destroy bullet
                this.selfDestroy();
                return true;
            }
        }
    }

    //checker si la balle est sorti de l'écran, si oui la détruire
    isBulletOutOfBundle(){
        if(this.position.X < 0 ||  this.position.X > canvas.width || this.position.Y > canvas.height || this.position.Y < 0){
            this.selfDestroy();
        }
    }

    //Supprime du tableau toutes les balles entrées en collision avec un ennemi
    selfDestroy() {
        for (let i = 0; i < Entity.bullets.length; i++) {
            if (this === Entity.bullets[i]) {
                Entity.destroyBullet(i);
                return;
            }
        }
    }
}

class Turret {
    _distanceBetweenTurretEnnemy;
    _nearestEnnemyID;
    _hitbox;
    _bulletId;
    _bulletSpeed = 5;
    _updateMenu;

    constructor(level, positionX, positionY) {
        this.sprite = new Image();
        this.sprite.src = level;
        this.position = {X: positionX, Y: positionY};
        this.turretBaseSprite = new Image();
        this.turretBaseSprite.src = "assets/sprites/towerDefense_tile181.png";
        this.angle = 0;
        this.fireRate = 5;
        this.range = 2.5 * spritesGroundSize;
        this._hitbox = {
            X: positionX * spritesGroundSize,
            Y: positionY * spritesGroundSize,
            W: spritesGroundSize,
            H: spritesGroundSize
        };
        this._updateMenu = new Shop(this.position.X * spritesGroundSize + spritesGroundSize/2, this.position.Y * spritesGroundSize + spritesGroundSize/2, true);
    }

    draw() {
        //quand la souris est sur la tourelle
        if (this.isMouseOnTurret()) {
            this.drawRange();
        }

        this.drawTurret(Entity.ennemies);
        this._updateMenu.draw();
    }

    update() {

        //vérifier si un ennemis se trouve sur la map
        if (Entity.ennemies.length > 0) {
            this._nearestEnnemyID = this.lookForNearestEnnemy(Entity.ennemies);
            this.angle = this.acquireTargetAngle();
            this.shoot();
        }
        this._updateMenu.update();
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


    //prédire la postion de l'ennemy le plus proche
    predictPositionOfNearestEnnemy() {
        const bulletSpeed = this._bulletSpeed;
        const distance = this.distBetweenTurretEnnemy(Entity.ennemies[this._nearestEnnemyID]);
        const travelTime = Math.abs(distance / bulletSpeed);
        const predictedPostion = {
            X: Entity.ennemies[this._nearestEnnemyID].position.X + Entity.ennemies[this._nearestEnnemyID].velocity.X * travelTime,
            Y: Entity.ennemies[this._nearestEnnemyID].position.Y + Entity.ennemies[this._nearestEnnemyID].velocity.Y * travelTime
        }
        return predictedPostion;

    }


    //Trouve l'angle que la tourrelle doit prendre pour viser l'ennemi le plus proche
    acquireTargetAngle() {
        const angleCorrection = (-90 * Math.PI / 180);
        const angle = ((Math.atan2(this.distanceBetweenTurretAndPredictedPositionY(), this.distanceBetweenTurretAndPredictedPositionX())) + angleCorrection);
        return angle;
    }

    //donne la prochaine position de l'ennemi basé sur ça vitesse, ça distance de la tourelle ainsi que la vitesse des balles
    distanceBetweenTurretAndPredictedPositionX() {
        const position = this.predictPositionOfNearestEnnemy();
        return this.position.X * spritesGroundSize - position.X;
    }

    distanceBetweenTurretAndPredictedPositionY() {
        const position = this.predictPositionOfNearestEnnemy();
        return this.position.Y * spritesGroundSize - position.Y;
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
            //À la fin des 60 refresh, on crée une balle qu'on inscrit dans un tableau
            if (game.remainingRefreshes % this.fireRate === 0) {
                Entity.createBullet(this._bulletId, this.angle, this._bulletSpeed, spritesGroundSize * this.position.X + spritesGroundSize / 2, spritesGroundSize * this.position.Y + spritesGroundSize / 2);
                this._bulletId++;
            }
        }


    }
}
