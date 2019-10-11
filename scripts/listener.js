function initListener(){
    canvas.addEventListener("keydown", handleKeyDown, true);
    canvas.addEventListener("keyup", handleKeyUp, true);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousedown", handleMouseDown);
}


var key_left = false;
var key_up = false;
var key_down = false;
var key_right = false;


//permet de détecter quand une touche est appuyée.
function handleKeyDown(event) {
    switch (event.code) {
        default:
            break;
        case "ArrowUp":
            key_up = true;
            break;
        case "ArrowDown":
            key_down = true;
            break;
        case "ArrowLeft":
            key_left = true;
            break;
        case "ArrowRight":
            key_right = true;
            break;
    }
}

//permet de détecter quand une touche est relachée
function handleKeyUp(event) {
    switch (event.code) {
        default:
            break;
        case "ArrowUp":
            key_up = false;
            break;
        case "ArrowDown":
            key_down = false;
            break;
        case "ArrowLeft":
            key_left = false;
            break;
        case "ArrowRight":
            key_right = false;
            break;
    }
}

function handleMouseUp(event) {
    Mouse.isClicked = false;
    Mouse.isUp = true;
    Mouse.isDown = false;
}
function handleMouseDown(event) {
    Mouse.isClicked = true;
    Mouse.isUp = false;
    Mouse.isDown = true;
}


function handleMouseMove(event) {
    var rect = canvas.getBoundingClientRect();
    Mouse.position.X = event.clientX - rect.left;
    Mouse.position.Y = event.clientY - rect.top;
}

class Mouse{
    static position = {X: 0, Y:0};
    static isClicked = false;
    static isUp = true;
    static isDown = false;
    constructor(){
    }
}