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
        this.DirectionAngleInRadian;
        this.waypointId = 0;
    }

    //permet de dessiner l'ennemi
    drawEnnemy() {
        ctx.drawImage(this.sprite, this.position.X, this.position.Y, spritesGroundSize, spritesGroundSize);
        this.drawMaxLifePointBar();
        this.drawCurrentLifePointBar();
    }

    drawMaxLifePointBar() {
        ctx.save();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.position.X + spritesGroundSize / 3, this.position.Y + 20, this.lifePointBarSizeWidth * spritesGroundSize, this.lifePointBarSizeHeight * spritesGroundSize);
        ctx.restore();
    }

    drawCurrentLifePointBar() {
        var currentLifeBarSize = this.lifePoint * this.lifePointBarSizeWidth / this.maxLifePoint * spritesGroundSize;
        ctx.save();
        ctx.fillStyle = "#57ff11";
        ctx.fillRect(this.position.X + spritesGroundSize / 3, this.position.Y + 20, currentLifeBarSize, this.lifePointBarSizeHeight * spritesGroundSize);
        ctx.restore();
    }

    distBetweenEnnemyWaypointX(waypointId) {
        return map.waypoints[this.waypointId].position.X - (this.position.X + spritesGroundSize/2);
    }

    distBetweenEnnemyWaypointY(waypointId) {
        return map.waypoints[this.waypointId].position.Y - (this.position.Y + spritesGroundSize/2);
    }

    walk(angle){ //il faut verifier si la distance entre l'ennemi et le waypoint et négatif ou pas
        if(this.position.X < map.waypoints[this.waypointId].position.X){///////////////////////// A MODIFIER LUCA !!
            this.position.X += this.speed * Math.cos(angle);
        }else{
            this.position.X += -this.speed * Math.cos(angle);
        }///////////////////////////////////////////////////////////////////////////////////////////
        this.position.Y += this.speed * Math.sin(angle);
    }

    followWaypoints() {
        this.DirectionAngleInRadian = Math.atan(this.distBetweenEnnemyWaypointY(this.waypointId) / this.distBetweenEnnemyWaypointX(this.waypointId));

        if ((this.position.X + spritesGroundSize/2) !== map.waypoints[this.waypointId].position.X || (this.position.Y + spritesGroundSize/2) !== map.waypoints[this.waypointId].position.Y) {
            this.walk(this.DirectionAngleInRadian);
            //console.log(Math.round(this.position.X),Math.round(this.position.Y) );
        }else{
            console.log("j'ai atteind le waypoint: " + this.waypointId);
            this.waypointId++;
        }
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
            arr.push(new Ennemy(1, 200, ennemyType.GREEN, positionX, positionY, true));
            numberEnnemyCreated++;
        } else {
            clearInterval(inter);
        }
    }, time)
    return arr;
}