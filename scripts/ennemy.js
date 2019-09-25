//ennemyType est une liste contenant les différents ennemis.
var ennemyType = {
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
        this.sprite = new Image();
        this.sprite.src = type;
        this.position = {X: 0, Y: 0};
        this.lifePointBarSizeWidth = 30;
        this.lifePointBarSizeHeight = 3;
    }

    //permet de dessiner l'ennemi
    drawEnnemy() {
        ctx.drawImage(this.sprite, spritesGroundSize * this.position.X, spritesGroundSize * this.position.Y, 100, 100);
        this.drawMaxLifePointBar();
        this.drawCurrentLifePointBar();
    }

    drawMaxLifePointBar() {

        ctx.save();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(spritesGroundSize * this.position.X + spritesGroundSize / 3, spritesGroundSize * this.position.Y + 20, this.lifePointBarSizeWidth, this.lifePointBarSizeHeight);
        ctx.restore();
    }

    drawCurrentLifePointBar() {
        var currentLifeBarSize = this.lifePoint * this.lifePointBarSizeWidth / this.maxLifePoint;
        ctx.save();
        ctx.fillStyle = "#57ff11";
        ctx.fillRect(spritesGroundSize * this.position.X + spritesGroundSize / 3, spritesGroundSize * this.position.Y + 20, currentLifeBarSize, this.lifePointBarSizeHeight);
        ctx.restore();
    }


}

function ennemyFactory() {

}