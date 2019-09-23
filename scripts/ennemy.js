//ennemyType est une liste contenant les différents ennemis
let ennemyType = {
    GREEN: "assets/sprites/towerDefense_tile245.png",
    RED: "assets/sprites/towerDefense_tile246.png",
    BROWN: "assets/sprites/towerDefense_tile247.png"
};
//cette classe représente les ennemis que les tourelles devront abattre
class Ennemy {
    constructor(speed, lifePoint, type) {
        this.speed = speed;
        this.lifePoint = lifePoint;
        this.type = new Image();
        this.type.src = type;
        this.position = {X: 0, Y: 0};
    }

    //permet de dessiner l'ennemi
    drawEnnemy() {
        ctx.drawImage(this.type, this.position.X, this.position.Y, 100, 100)
    }


}