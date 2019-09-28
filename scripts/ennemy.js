//todo faire tourner la hitbox avec le personnage
// X' = (X - Xc) * cos(A) - (Y - Yc) * sin(A) + Xc
// Y' = (Y - Yc) * cos(A) + (X - Xc) * sin(A) + Yc
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
        this.circleHitbox = {centerPosition: {X: 0, Y: 0}, radius: 18};
    }

    //va mettre à jour les coordonnées de la hitbox
    updateHitbox() {
        this.circleHitbox.centerPosition.X = this.position.X + spritesGroundSize / 2;
        this.circleHitbox.centerPosition.Y = this.position.Y + spritesGroundSize / 2;

    }

    drawHitbox() {
        ctx.save();
        ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
        ctx.beginPath();
        ctx.arc(this.circleHitbox.centerPosition.X, this.circleHitbox.centerPosition.Y, this.circleHitbox.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
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
        for (let i = 0; i < Game.map.waypoints.length; i++) {
            if (this.intersectCirclePoint(this.circleHitbox.centerPosition.X, this.circleHitbox.centerPosition.Y, this.circleHitbox.radius, Game.map.waypoints[i].position.X, Game.map.waypoints[i].position.Y)) {
                return i;
            }
        }
        return -1;
    }

    //permet de dessiner l'ennemi
    drawEnnemy() {
        ctx.save();
        ctx.translate(this.position.X + spritesGroundSize / 2, this.position.Y + spritesGroundSize / 2);
        ctx.rotate(this.DirectionAngleInRadian);
        ctx.translate(-(this.position.X + spritesGroundSize / 2), -(this.position.Y + spritesGroundSize / 2));

        ctx.drawImage(this.sprite, this.position.X, this.position.Y, spritesGroundSize, spritesGroundSize);
        this.drawHitbox()
        this.drawMaxLifePointBar();
        this.drawCurrentLifePointBar();
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

    distBetweenEnnemyWaypointX(waypointId) {
        return Game.map.waypoints[this.waypointId].position.X - (this.position.X + spritesGroundSize / 2);
    }

    distBetweenEnnemyWaypointY(waypointId) {
        return Game.map.waypoints[this.waypointId].position.Y - (this.position.Y + spritesGroundSize / 2);
    }

    walk(angle) { //il faut verifier si la distance entre l'ennemi et le waypoint et négatif ou pas
        this.position.X += this.speed * Math.cos(angle);
        this.position.Y += this.speed * Math.sin(angle);
    }

    followWaypoints() {
        if(this.waypointId < Game.map.waypoints.length){
            this.DirectionAngleInRadian = Math.atan2(this.distBetweenEnnemyWaypointY(this.waypointId), this.distBetweenEnnemyWaypointX(this.waypointId));
            // if ((this.position.X + spritesGroundSize/2) !== map.waypoints[this.waypointId].position.X || (this.position.Y + spritesGroundSize/2) !== map.waypoints[this.waypointId].position.Y) {
            if (this.checkColisionEnnemyWaypoint() !== this.waypointId) {
                this.walk(this.DirectionAngleInRadian);
            } else {
                this.waypointId++;
            }
        }else{
            Game.ennemies.splice(0,1);
        }

    }
    killMe(){
        Game.ennemies.splice(this.id,1);
    }


}

function ennemyFactory(ennemyNumber, positionX, positionY, time) {
    let numberEnnemyCreated = 0;
    let arr = [];
    let inter = setInterval(function () {

        if (numberEnnemyCreated < ennemyNumber) {
            arr.push(new Ennemy(numberEnnemyCreated,2, 200, ennemyType.GREEN, positionX, positionY, true));
            numberEnnemyCreated++;
        } else {
            clearInterval(inter);
        }
    }, time);
    return arr;
}