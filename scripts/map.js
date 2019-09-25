class Map {
    constructor() {
        //ce tableau indique quelle sprite doit se trouver à chaque emplacement du cadrillage.
        this.cords = [
            [70, 70, 70, 70, 70, 70, 70, 70, 70, 71, 24, 24],
            [93, 93, 93, 93,93, 93, 93, 93, 93, 94, 24, 24],
            [116, 116, 116, 116, 116, 116, 116, 73, 93, 94, 24, 24],
            [24, 24, 24, 24, 24, 24, 24, 92, 93, 94, 24, 24],
            [24, 24, 45, 24, 24, 24, 24, 92, 93, 94, 24, 24],
            [24, 24, 24, 24, 24, 24, 24, 92, 93, 94, 24, 24]
        ];
    }

    //cette méthode affiche la map sur le canvas
    drawMap() {
        for (var i = 0; i < this.cords.length; i++) {
            for (var j = 0; j < this.cords[i].length; j++) {
                ctx.drawImage(sprites[this.cords[i][j]], j * spritesGroundSize, i * spritesGroundSize, spritesGroundSize, spritesGroundSize);
            }
        }
    }
    //cette méthode indequera la direction à prendre pour suivre le chemin
    getRoadDirection(ActualPositionX, ActualPositionY){
        var directionToTake = [];
        var roadId = 93;
        var actualSquare = {
            X: Math.ceil(ActualPositionX/100)-1,
            Y: Math.ceil(ActualPositionY/100)-1
        }
        console.log(actualSquare);
        //check si la route continue à droite on envoie 0
        if(this.cords[actualSquare.Y][actualSquare.X+1] == roadId) directionToTake.push(0);
        //check si la route continue en bas on envoie 1
        if(this.cords[actualSquare.Y+1][actualSquare.X] == roadId) directionToTake.push(1);
        //check si la route continue à gauche on envoie 2
        if(this.cords[actualSquare.Y][actualSquare.X-1] == roadId) directionToTake.push(2);
        //check si la route continue en haut on envoie 3
        if(this.cords[actualSquare.Y-1][actualSquare.X] == roadId) directionToTake.push(3);



        return directionToTake;
    }
}

//Création du tableau contenant les 299 sprites du jeux
function loadSprites() {
    sprites = new Array(300);
    for (var i = 1; i <= 299; i++) {
        sprites[i] = new Image();

        if (i % 100 !== i) {
            sprites[i].src = "assets/sprites/towerDefense_tile" + i + ".png"
        } else if (i % 10 !== i) {
            sprites[i].src = "assets/sprites/towerDefense_tile0" + i + ".png"
        } else {
            sprites[i].src = "assets/sprites/towerDefense_tile00" + i + ".png"
        }
    }
}



