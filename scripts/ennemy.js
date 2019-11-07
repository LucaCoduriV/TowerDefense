//ennemyType est une liste contenant les différents ennemis.
let ennemyType = {
    GREEN: "assets/sprites/towerDefense_tile245.png",
    RED: "assets/sprites/towerDefense_tile246.png",
    BROWN: "assets/sprites/towerDefense_tile247.png"
};

//cette classe représente les ennemis que les tourelles devront abattre
class Ennemy {
    constructor(id, speed, maxLifePoint, type, positionX = 0, positionY = 0, isReady = false) {
        this.id = id;
        this.speed = speed;
        this.lifePoint = maxLifePoint;
        this.maxLifePoint = maxLifePoint;
        this.sprite = new Image();
        this.sprite.src = type;
        this.position = {X: positionX, Y: positionY};
        this.lifePointBarSizeWidth = 0.3;
        this.lifePointBarSizeHeight = 0.03;
        this.isReadyToUse = isReady;
        this.DirectionAngleInRadian = 0;
        this.waypointId = 0;
        this.circleHitbox = {centerPosition: {X: 0, Y: 0}, radius: 0.18 * spritesGroundSize};
        this.velocity = {X:0, Y:0 }
    }
    //draw est appelé en boucle par la fonction draw de la classe game
    draw(){
        this.drawEnnemy();
        this.drawHitbox();
        this.drawMaxLifePointBar();
        this.drawCurrentLifePointBar();
    }

    //update est appelé en boucle par la fonction update de la classe game
    update(){
        this.updateHitbox();
        this.checkColisionEnnemyWaypoint();
        this.followWaypoints();
        this.checkIfDead();
    }


    drawHitbox() {
        ctx.save();
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.beginPath();
        ctx.arc(this.circleHitbox.centerPosition.X, this.circleHitbox.centerPosition.Y, this.circleHitbox.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    //permet de dessiner l'ennemi
    drawEnnemy() {
        ctx.save();
        ctx.translate(this.position.X + spritesGroundSize / 2, this.position.Y + spritesGroundSize / 2);
        ctx.rotate(this.DirectionAngleInRadian);
        ctx.translate(-(this.position.X + spritesGroundSize / 2), -(this.position.Y + spritesGroundSize / 2));
        ctx.drawImage(this.sprite, this.position.X, this.position.Y, spritesGroundSize, spritesGroundSize);
        ctx.restore();
    }

    drawMaxLifePointBar() {
        ctx.save();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.position.X + spritesGroundSize / 3, this.position.Y + 20, this.lifePointBarSizeWidth * spritesGroundSize, this.lifePointBarSizeHeight * spritesGroundSize);
        ctx.restore();
    }

    drawCurrentLifePointBar() {
        let currentLifeBarSize = this.lifePoint * this.lifePointBarSizeWidth / this.maxLifePoint * spritesGroundSize;
        ctx.save();
        ctx.fillStyle = "#57ff11";
        ctx.fillRect(this.position.X + spritesGroundSize / 3, this.position.Y + 20, currentLifeBarSize, this.lifePointBarSizeHeight * spritesGroundSize);
        ctx.restore();
    }

    //va mettre à jour les coordonnées de la hitbox
    updateHitbox() {
        this.circleHitbox.centerPosition.X = this.position.X + spritesGroundSize / 2;
        this.circleHitbox.centerPosition.Y = this.position.Y + spritesGroundSize / 2;

    }

    //intersection entre un rectangle et un point
    intersectRectanglePoint(x1, y1, w1, h1, x2, y2) {
        if (x2 > x1 + w1 || x2 < x1 || y2 < y1 || y2 > y1 + h1) {
            return false;
        }
        return true;
    }

    getDistanceBetweenTwoPoints(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    //intersection entre un cercle et un point
    intersectCirclePoint(x1, y1, radius, x2, y2) {
        if (this.getDistanceBetweenTwoPoints(x1, y1, x2, y2) < radius) {
            return true;
        }
        return false;
    }

    checkColisionEnnemyWaypoint() {
        for (let i = 0; i < Entity.map.waypoints.length; i++) {
            if (this.intersectCirclePoint(this.circleHitbox.centerPosition.X, this.circleHitbox.centerPosition.Y, this.circleHitbox.radius, Entity.map.waypoints[i].position.X, Entity.map.waypoints[i].position.Y)) {
                return i;
            }
        }
        return -1;
    }

    distBetweenEnnemyWaypointX(waypointId) {
        return Entity.map.waypoints[this.waypointId].position.X - (this.position.X + spritesGroundSize / 2);
    }

    distBetweenEnnemyWaypointY(waypointId) {
        return Entity.map.waypoints[this.waypointId].position.Y - (this.position.Y + spritesGroundSize / 2);
    }

    walk(angle) { //il faut verifier si la distance entre l'ennemi et le waypoint et négatif ou pas
        this.velocity.X = this.speed * Math.cos(angle);
        this.velocity.Y = this.speed * Math.sin(angle);
        this.position.X += this.velocity.X;
        this.position.Y += this.velocity.Y;
    }

    followWaypoints() {
        if(this.waypointId < Entity.map.waypoints.length){
            this.DirectionAngleInRadian = Math.atan2(this.distBetweenEnnemyWaypointY(this.waypointId), this.distBetweenEnnemyWaypointX(this.waypointId));
            // if ((this.position.X + spritesGroundSize/2) !== map.waypoints[this.waypointId].position.X || (this.position.Y + spritesGroundSize/2) !== map.waypoints[this.waypointId].position.Y) {
            if (this.checkColisionEnnemyWaypoint() !== this.waypointId) {
                this.walk(this.DirectionAngleInRadian);
            } else {
                this.waypointId++;
            }
        }else{
            Entity.map.base.looseLife(100);
            Entity.ennemies.splice(0,1);
        }

    }

    checkIfDead(){
        if(this.lifePoint <= 0) this.die();
    }

    die(){
        Entity.ennemies.forEach((ennemy, id)=>{
            if(ennemy === this){
                Entity.ennemies.splice(id,1);
            }
        });
    }


}