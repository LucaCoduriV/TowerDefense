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

    loadSprites();
    console.log("sprites loaded");

    loop();


}