let ennemyType = {
    GREEN: "assets/sprites/towerDefense_tile245.png",
    RED: "assets/sprites/towerDefense_tile246.png",
    BROWN: "assets/sprites/towerDefense_tile247.png"
};

class Ennemy {
    constructor(speed, lifePoint, type) {
        this.speed = speed;
        this.lifePoint = lifePoint;
        this.type = new Image();
        this.type.src = type;
        this.position = {X: 0, Y: 0};
    }

    drawEnnemy() {
        ctx.drawImage(this.type, this.position.X, this.position.Y, 100, 100)
    }


}