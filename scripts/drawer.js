const spritesGroundSize = 100;

function draw() {

    ctx.drawImage(sprites[1], 10, 10, spritesGroundSize, spritesGroundSize);


}

function update() {
    draw();
    requestAnimationFrame(draw);
}