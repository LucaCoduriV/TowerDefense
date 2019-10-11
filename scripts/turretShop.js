class Shop{
    _animationRadius = 0;
    _open = false;
    constructor(x,y) {
        this.position = {
            X: x,
            Y: y
        }
    }

    draw(){
        ctx.save();
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this._animationRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

    update(){
        if(this._open === true){
            if(this._animationRadius < 50){this._animationRadius+= 5}
        }else{
            if(this._animationRadius > 0){this._animationRadius-= 5}
        }

    }

    toggleMenu(){
        this._open = !this._open;
    }


}