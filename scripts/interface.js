class Interface {
    _UIObjects = [];

    constructor(positionX, positionY, height, width, color = "rgba(0,0,0,1)") {
        this.position = {X: positionX, Y: positionY};
        this.size = {H: height, W: width};
        this.backgroundColor = color;
    }

    draw() {
        this.createBackground();
    }

    update() {
        //this._UIObjects.push();
    }

    createBackground() {
        ctx.save();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(this.position.X, this.position.Y, this.size.W, this.size.H);
        ctx.restore();
    }
    addUIObjects(object){
        object.position.X += this.position.X;
        object.position.Y += this.position.Y;
        object.hitbox.X += this.position.X;
        object.hitbox.Y += this.position.Y;
        this._UIObjects.push(object);
    }
    drawUIobjects(){
        this._UIObjects.forEach((element) => element.draw());
    }


}

class Button {
    constructor(positionX, positionY, height, width, text = "Button", backgroundColor = "rgba(100,100,100,1)", textColor = "rgba(255,255,255,1)",font = "30px Arial") {
        this.position = {X: positionX, Y: positionY};
        this.size = {H: height, W: width};
        this.backgroundColor = backgroundColor;
        this.text = text;
        this.textColor = textColor;
        this.font = font;
        this.hitbox = {X:positionX,Y:positionY,H:height,W:width};
    }

    draw() {

        if(this.isMouseOver()){
            this.backgroundColor = "rgba(255,0,0,1)";
        }else{
            this.backgroundColor = "rgba(100,100,100,1)";
        }
        this.createButton();
    }

    update() {

    }

    createButton() {
        ctx.save();
        ctx.fillStyle = this.backgroundColor
        ctx.fillRect(this.position.X, this.position.Y, this.size.W, this.size.H);
        ctx.font = this.font;
        ctx.textAlign = 'center';
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text, this.position.X + this.size.W/2, this.position.Y + this.size.H/1.5);
        ctx.restore();
    }

    isClicked() {

    }

    isMouseOver() {
        return this.intersectRectanglePoint(this.hitbox.X, this.hitbox.Y, this.hitbox.W, this.hitbox.H, Mouse.position.X, Mouse.position.Y);
    }
    intersectRectanglePoint(x1, y1, w1, h1, x2, y2) {
        if (x2 > x1 + w1 || x2 < x1 || y2 < y1 || y2 > y1 + h1) {
            return false;
        }
        return true;
    }
}

class label {
    constructor() {

    }
}