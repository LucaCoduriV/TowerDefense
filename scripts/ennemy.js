//ennemyType est une liste contenant les différents ennemis
let ennemyType = {
    GREEN: "assets/sprites/towerDefense_tile245.png",
    RED: "assets/sprites/towerDefense_tile246.png",
    BROWN: "assets/sprites/towerDefense_tile247.png"
};

//cette classe représente les ennemis que les tourelles devront abattre
class Ennemy {
    constructor(speed, maxLifePoint, type) {
        this.speed = speed;
        this.lifePoint = maxLifePoint;
        this.maxLifePoint = maxLifePoint;
        this.type = new Image();
        this.type.src = type;
        this.position = {X: 0, Y: 0};
        this.lifePointBarSize = 30;
    }

    //permet de dessiner l'ennemi
    drawEnnemy() {
        ctx.drawImage(this.type, spritesGroundSize * this.position.X, spritesGroundSize * this.position.Y, 100, 100);
        this.drawMaxLifePointBar();
        this.drawCurrentLifePointBar();
    }

    drawMaxLifePointBar() {

        ctx.save();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(spritesGroundSize * this.position.X + spritesGroundSize/3, spritesGroundSize * this.position.Y + 20, this.lifePointBarSize, 3);
        ctx.restore();
    }

    drawCurrentLifePointBar() {
        var currentLifeBarSize = this.lifePoint * this.lifePointBarSize / this.maxLifePoint;
        ctx.save();
        ctx.fillStyle = "#57ff11";
        ctx.fillRect(spritesGroundSize * this.position.X + spritesGroundSize/3, spritesGroundSize * this.position.Y + 20, currentLifeBarSize, 3);
        ctx.restore();
    }


}

function ennemyFactory() {

}