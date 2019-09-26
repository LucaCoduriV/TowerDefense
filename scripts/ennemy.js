//ennemyType est une liste contenant les différents ennemis.
var ennemyType = {
    GREEN: "assets/sprites/towerDefense_tile245.png",
    RED: "assets/sprites/towerDefense_tile246.png",
    BROWN: "assets/sprites/towerDefense_tile247.png"
};

//cette classe représente les ennemis que les tourelles devront abattre
class Ennemy {
    constructor(speed, maxLifePoint, type, positionX = 0, positionY = 0, isReady = false) {
        this.speed = speed;
        this.lifePoint = maxLifePoint;
        this.maxLifePoint = maxLifePoint;
        this.sprite = new Image();
        this.sprite.src = type;
        this.position = {X: positionX, Y: positionY};
        this.lifePointBarSizeWidth = 0.3;
        this.lifePointBarSizeHeight = 0.03;
        this.isReadyToUse = isReady;
        this.angleToWalk;
        this.waypointId = 0;
    }

    //permet de dessiner l'ennemi
    drawEnnemy() {
        ctx.drawImage(this.sprite, spritesGroundSize * this.position.X, spritesGroundSize * this.position.Y, spritesGroundSize, spritesGroundSize);
        this.drawMaxLifePointBar();
        this.drawCurrentLifePointBar();
    }

    drawMaxLifePointBar() {
        ctx.save();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(spritesGroundSize * this.position.X + spritesGroundSize / 3, spritesGroundSize * this.position.Y + 20, this.lifePointBarSizeWidth * spritesGroundSize, this.lifePointBarSizeHeight * spritesGroundSize);
        ctx.restore();
    }

    drawCurrentLifePointBar() {
        var currentLifeBarSize = this.lifePoint * this.lifePointBarSizeWidth / this.maxLifePoint * spritesGroundSize;
        ctx.save();
        ctx.fillStyle = "#57ff11";
        ctx.fillRect(spritesGroundSize * this.position.X + spritesGroundSize / 3, spritesGroundSize * this.position.Y + 20, currentLifeBarSize, this.lifePointBarSizeHeight * spritesGroundSize);
        ctx.restore();
    }

    distBetweenEnnemyWaypointX(waypointId) {
        return this.position.X*spritesGroundSize - map.waypoints[waypointId].position.X;
    }

    distBetweenEnnemyWaypointY(waypointId) {
        return this.position.Y*spritesGroundSize - map.waypoints[waypointId].position.Y;
    }

    followWaypoints() {
        this.angleToWalk = Math.atan(this.distBetweenEnnemyWaypointY(this.waypointId) / this.distBetweenEnnemyWaypointX(this.waypointId));

        if (this.position.X < map.waypoints[this.waypointId].position.X) {
            this.position.X += this.speed * Math.cos(this.angleToWalk * Math.PI / 180);
        }
        if(this.position.Y <= map.waypoints[this.waypointId].position.Y){
            this.position.Y += this.speed * Math.sin(this.angleToWalk * Math.PI / 180);
        }
        if(Math.floor(this.position.X) === Math.floor((map.waypoints[this.waypointId].position.X)/spritesGroundSize) && Math.floor(this.position.Y) === Math.floor((map.waypoints[this.waypointId].position.Y)/spritesGroundSize)){
            this.waypointId++;
        }
        console.log("waypoint X: " + Math.floor((map.waypoints[this.waypointId].position.X)/spritesGroundSize))

    }

    getActualSquare(ActualPositionX, ActualPositionY) {
        var actualSquare = {
            X: Math.ceil(ActualPositionX / spritesGroundSize) - 1,
            Y: Math.ceil(ActualPositionY / spritesGroundSize) - 1
        }
        return actualSquare;
    }


}

function ennemyFactory(ennemyNumber, positionX, positionY, time) {
    var numberEnnemyCreated = 0;
    var arr = [];
    var inter = setInterval(function () {

        if (numberEnnemyCreated < ennemyNumber) {
            arr.push(new Ennemy(0.005, 200, ennemyType.GREEN, positionX, positionY, true));
            numberEnnemyCreated++;
        } else {
            clearInterval(inter);
        }
    }, time)
    return arr;
}