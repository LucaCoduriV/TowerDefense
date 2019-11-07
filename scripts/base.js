class Base {
    _maxLifePoint;
    _currentLife;

    constructor(life, position){
        this._maxLifePoint = life;
        this._currentLife = this._maxLifePoint;
        this.position = position;
        this.lifePointBarSizeWidth = 0.5;
        this.lifePointBarSizeHeight = 0.1;

        console.log(this.position);
    }

    update(){

    }

    draw(){
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
        let currentLifeBarSize = this._currentLife * this.lifePointBarSizeWidth / this._maxLifePoint * spritesGroundSize;
        if(currentLifeBarSize <= 0) currentLifeBarSize = 0;
        ctx.save();
        ctx.fillStyle = "#57ff11";
        ctx.fillRect(this.position.X + spritesGroundSize / 3, this.position.Y + 20, currentLifeBarSize, this.lifePointBarSizeHeight * spritesGroundSize);
        ctx.restore();
    }

    looseLife(damage){
        this._currentLife -= damage;
    }

}