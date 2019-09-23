const spritesGroundSize = 100;

class Map {
    constructor() {
        //ce tableau indique quelle sprite doit se trouver à chaque emplacement du cadrillage
        this.cords = [
            [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
            [93, 93, 93, 93,93, 93, 93, 93, 93, 93, 93, 93],
            [116, 116, 116, 116, 116, 116, 116, 116, 116, 116, 116, 116],
            [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
            [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
            [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
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
}

function loadSprites() {
    //Création du tableau contenant les 299 sprites du jeux
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



