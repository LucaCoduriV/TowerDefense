class Base {
    _spriteLocation;
    _maxLifePoint;
    _currentLife;

    constructor(life){
        this._maxLifePoint = life;
        this._currentLife = this._maxLifePoint;
    }

    update(){

    }

    draw(){
        //ctx.fillStyle = "rgb(186,80,165)";
        //ctx.fillRect(0,0,spritesGroundSize,spritesGroundSize);
    }



}