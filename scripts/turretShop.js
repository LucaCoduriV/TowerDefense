class Shop{
    _animationRadius = 0;
    _animationSpeed = 5;
    _open = false;
    _isVisible = false;
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
        ctx.arc(this.position.X, this.position.Y, this._animationRadius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
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
            if(this._animationRadius < 50){this._animationRadius+= this._animationSpeed}
        }else{
            if(this._animationRadius > 0){this._animationRadius-= this._animationSpeed}
        }
    }

    //permet d'ouvrir ou de fermer le menu
    toggleMenu(){
        this._open = !this._open;
    }


}