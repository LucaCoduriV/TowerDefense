let canvas;
let ctx;
let sprites;

//quand la page à chargé tous ses fichiers
window.onload = function () {
    main();
}

//Function qui se chargera d'executer toutes les autres fonctions
function main() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    try{
        loadSprites();
        console.log("sprites loaded")
    }catch (e) {
        console.log(e)
    }

    update();

    //Test sans aucun rapport avec le jeu :)/////
    document.addEventListener('keydown', (e) => {
        if (e.code === "ArrowUp")        vert.position.Y -= 10
        else if (e.code === "ArrowDown") vert.position.Y += 10
    });
    /////////////////////////////////////////////




}