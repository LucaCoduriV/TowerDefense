class Map {
    constructor() {
        this.cords = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];
    }
}
function loadSprites() {
    //Création du tableau contenant les 299 sprites du jeux
    sprites = new Array(300);
    for(var i = 1; i <= 299; i++){
        sprites[i] = new Image();

        if(i % 100 !== i){
            sprites[i].src = "assets/sprites/towerDefense_tile"+i+".png"
        }else if(i % 10 !== i){
            sprites[i].src = "assets/sprites/towerDefense_tile0"+i+".png"
        }else{
            sprites[i].src = "assets/sprites/towerDefense_tile00"+i+".png"
        }
    }
}



