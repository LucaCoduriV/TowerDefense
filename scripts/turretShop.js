class Shop{
    _animationRadius = 0;
    _animationSpeed = 0.1;
    _open = false;
    _isVisible = false;
    _shopItemSize = 0.5;
    constructor(x,y) {
        this.position = {
            X: x,
            Y: y
        }
    }

    draw(){
        //si le menu est visible --> _isVisible = true;
        if(this._isVisible){
            this.drawCircle();
            this.drawBuyableTurret();
        }
    }

    update(){
        this.updateAnimation();
        this.updateVisibleState();

    }

    //dessine le cercle du menu d'achat
    drawCircle(){
        ctx.save();
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this._animationRadius * spritesGroundSize, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

    //dessine les tourrelles achetable
    drawBuyableTurret(){
        let positionShift = this._animationRadius * spritesGroundSize;

        let scaledX = this.position.X - (spritesGroundSize/2 * this._shopItemSize);
        let scaledY = this.position.Y - (spritesGroundSize/2 * this._shopItemSize);

        //top
        ctx.drawImage(sprites[249], scaledX, -positionShift + scaledY, spritesGroundSize * this._shopItemSize, spritesGroundSize * this._shopItemSize);
        //right
        ctx.drawImage(sprites[249], positionShift + scaledX,  scaledY, spritesGroundSize * this._shopItemSize, spritesGroundSize * this._shopItemSize);
        //bottom
        ctx.drawImage(sprites[249], scaledX, positionShift + scaledY, spritesGroundSize * this._shopItemSize, spritesGroundSize * this._shopItemSize);
        //left
        ctx.drawImage(sprites[249],-positionShift + scaledX, scaledY, spritesGroundSize * this._shopItemSize, spritesGroundSize * this._shopItemSize);
    }

    //met à jour le paramètre visible selon la taille du cercle
    updateVisibleState(){
        if(this._animationRadius <= 0){
            this._isVisible = false;
        }
        else if(this._animationRadius > 0){
            this._isVisible = true;
        }
    }

    //met à jour la taille du cercle pour donner l'impression d'une animation
    updateAnimation(){
        if(this._open === true){
            if(this._animationRadius * spritesGroundSize < spritesGroundSize/2){this._animationRadius+= this._animationSpeed}
        }else{
            if(this._animationRadius * spritesGroundSize > 0){this._animationRadius-= this._animationSpeed}
        }
    }

    //permet d'ouvrir ou de fermer le menu
    toggleMenu(){
        this._open = !this._open;
    }


}