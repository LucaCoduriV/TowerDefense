var canvas;
var ctx;
var sprites;

//quand la page à chargé tous ses fichiers
$(window).bind("load", function() {
    main();
});

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




}