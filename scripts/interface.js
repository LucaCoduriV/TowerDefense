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
    }

    draw() {
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

    }
}

class label {
    constructor() {

    }
}