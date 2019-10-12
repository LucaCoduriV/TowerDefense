class Shop {
    _animationCurrentRadius = 0;
    _animationSpeed = 0.1;
    _animationMaxRadius = 0.40 * spritesGroundSize;
    _open = false;
    _isVisible = false;
    _shopItemsSize = 0.5;
    _shopItemsPosition = {
        top: {X: 0, Y: 0},
        right: {X: 0, Y: 0},
        bottom: {X: 0, Y: 0},
        left: {X: 0, Y: 0}
    }

    constructor(x, y, isUpgradeShop = false) {
        this.position = {
            X: x,
            Y: y,
            tile: {X: (x - spritesGroundSize/2)/spritesGroundSize,Y: (y - spritesGroundSize/2)/spritesGroundSize}
        }
        this.isUpgradeShop = isUpgradeShop;
    }

    draw() {
        //si le menu est visible --> _isVisible = true;
        if (this._isVisible) {
            this.drawCircle();
            this.drawBuyableTurret();
        }
    }

    update() {
        this.updateAnimation();
        this.updateVisibleState();

    }

    clicked() {
        //si le menu n'est pas ouvert on l'ouvre
        if (this._open === false) {
            this.openMenu();
        }
        //sinon on check la position de la souris et s'il elle se trouve sur une tourelle, on l'achète
        else {
            //les conditions sont mis de cette manière afin d'éviter des calcules inutiles
            const isTopClicked = this.intersectRectanglePoint(this._shopItemsPosition.top.X, this._shopItemsPosition.top.Y, spritesGroundSize * this._shopItemsSize, spritesGroundSize * this._shopItemsSize, Mouse.position.X, Mouse.position.Y)
            if (isTopClicked) {
                Entity.defense.push(new Turret(levels.level1,this.position.tile.X, this.position.tile.Y));
                return true;
            } else {
                const isRightClicked = this.intersectRectanglePoint(this._shopItemsPosition.right.X, this._shopItemsPosition.right.Y, spritesGroundSize * this._shopItemsSize, spritesGroundSize * this._shopItemsSize, Mouse.position.X, Mouse.position.Y)
                if (isRightClicked) {
                    Entity.defense.push(new Turret(levels.level1,this.position.tile.X, this.position.tile.Y));
                    return true;
                } else {
                    const isBottomClicked = this.intersectRectanglePoint(this._shopItemsPosition.bottom.X, this._shopItemsPosition.bottom.Y, spritesGroundSize * this._shopItemsSize, spritesGroundSize * this._shopItemsSize, Mouse.position.X, Mouse.position.Y)
                    if (isBottomClicked) {
                        Entity.defense.push(new Turret(levels.level1,this.position.tile.X, this.position.tile.Y));
                        return true;
                    } else {
                        const isLeftTopClicked = this.intersectRectanglePoint(this._shopItemsPosition.left.X, this._shopItemsPosition.left.Y, spritesGroundSize * this._shopItemsSize, spritesGroundSize * this._shopItemsSize, Mouse.position.X, Mouse.position.Y)
                        if (isLeftTopClicked) {
                            Entity.defense.push(new Turret(levels.level1,this.position.tile.X, this.position.tile.Y));
                            return true;
                        }else{
                            this.closeMenu();
                            return false;
                        }
                    }
                }
            }
        }
    }

    //dessine le cercle du menu d'achat
    drawCircle() {
        ctx.save();
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.position.X, this.position.Y, this._animationCurrentRadius * spritesGroundSize, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }

    //dessine les tourrelles achetable ou les upgrades
    drawBuyableTurret() {
        let sprite1;
        let sprite2;
        let sprite3;
        let sprite4;

        let positionShift = this._animationCurrentRadius * spritesGroundSize;
        let scaledX = this.position.X - (spritesGroundSize / 2 * this._shopItemsSize);
        let scaledY = this.position.Y - (spritesGroundSize / 2 * this._shopItemsSize);

        this._shopItemsPosition.top.X = scaledX;
        this._shopItemsPosition.top.Y = -positionShift + scaledY;

        this._shopItemsPosition.right.X = positionShift + scaledX;
        this._shopItemsPosition.right.Y = scaledY;

        this._shopItemsPosition.bottom.X = scaledX;
        this._shopItemsPosition.bottom.Y = positionShift + scaledY;

        this._shopItemsPosition.left.X = -positionShift + scaledX;
        this._shopItemsPosition.left.Y = scaledY;

        if (!this.isUpgradeShop) {
            sprite1 = 249;
            sprite2 = 203;
            sprite3 = 205;
            sprite4 = 206;
        } else if (this.isUpgradeShop) {
            sprite1 = 200;
            sprite2 = 200;
            sprite3 = 200;
            sprite4 = 200;
        }
        //top
        ctx.drawImage(sprites[sprite1], this._shopItemsPosition.top.X, this._shopItemsPosition.top.Y, spritesGroundSize * this._shopItemsSize, spritesGroundSize * this._shopItemsSize);
        //right
        ctx.drawImage(sprites[sprite2], this._shopItemsPosition.right.X, this._shopItemsPosition.right.Y, spritesGroundSize * this._shopItemsSize, spritesGroundSize * this._shopItemsSize);
        //bottom
        ctx.drawImage(sprites[sprite3], this._shopItemsPosition.bottom.X, this._shopItemsPosition.bottom.Y, spritesGroundSize * this._shopItemsSize, spritesGroundSize * this._shopItemsSize);
        //left
        ctx.drawImage(sprites[sprite4], this._shopItemsPosition.left.X, this._shopItemsPosition.left.Y, spritesGroundSize * this._shopItemsSize, spritesGroundSize * this._shopItemsSize);
    }

    //met à jour le paramètre visible selon la taille du cercle
    updateVisibleState() {
        if (this._animationCurrentRadius <= 0) {
            this._isVisible = false;
        } else if (this._animationCurrentRadius > 0) {
            this._isVisible = true;
        }
    }

    //met à jour la taille du cercle pour donner l'impression d'une animation
    updateAnimation() {
        if (this._open === true) {
            if (this._animationCurrentRadius * spritesGroundSize < this._animationMaxRadius) {
                this._animationCurrentRadius += this._animationSpeed
            }
        } else {
            if (this._animationCurrentRadius * spritesGroundSize > 0) {
                this._animationCurrentRadius -= this._animationSpeed
            }
        }
    }

    //permet d'ouvrir ou de fermer le menu
    toggleMenu() {
        this._open = !this._open;
    }

    openMenu() {
        this._open = true;
    }

    closeMenu() {
        this._open = false;
    }

    intersectRectanglePoint(x1, y1, w1, h1, x2, y2) {
        if (x2 > x1 + w1 || x2 < x1 || y2 < y1 || y2 > y1 + h1) {
            return false;
        }
        return true;
    }

}