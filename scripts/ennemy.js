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
        this.lifePointBarSizeWidth = 0.3;
        this.lifePointBarSizeHeight = 0.03;
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


}

function ennemyFactory() {

}