document.addEventListener("keydown", handleKeyDown, true);
document.addEventListener("keyup", handleKeyUp, true);
var key_left = false;
var key_up = false;
var key_down = false;
var key_right = false;

//permet de détecter quand une touche est appuyée
function handleKeyDown(event){
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