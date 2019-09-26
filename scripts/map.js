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
        this.startCords = {X:0,Y:1};
        this.endCords = {X:0,Y:1};
        this.waypoints = [];
        this.setWaypoints();
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
        /*var actualSquare = {
            X: Math.ceil(ActualPositionX/spritesGroundSize)-1,
            Y: Math.ceil(ActualPositionY/spritesGroundSize)-1
        }*/
        console.log(actualSquare);
        //check si la route continue à droite on envoie 0
        if(this.cords[ActualPositionY][ActualPositionX+1] === roadId) directionToTake.push(0);
        //check si la route continue en bas on envoie 1
        if(this.cords[ActualPositionY+1][ActualPositionX] === roadId) directionToTake.push(1);
        //check si la route continue à gauche on envoie 2
        if(this.cords[ActualPositionY][ActualPositionX-1] === roadId) directionToTake.push(2);
        //check si la route continue en haut on envoie 3
        if(this.cords[ActualPositionY-1][ActualPositionX] === roadId) directionToTake.push(3);



        return directionToTake;
    }
    setWaypoints(){
        var numberOfWaypoint = 0;
        console.log("coucou");
        for(var i = 0; i < this.cords.length; i++){
            for(var j = 0; j<this.cords[i].length;j++){
                if(this.cords[i][j] === 93){
                    this.waypoints.push(new Waypoint(numberOfWaypoint,j*spritesGroundSize+spritesGroundSize/2,i*spritesGroundSize+spritesGroundSize/2));
                    console.log(numberOfWaypoint);
                    numberOfWaypoint++;
                }
            }
        }
    }
}

class Waypoint{
    constructor(id, positionX, positionY){
        this.id = id;
        this.position = {X: positionX, Y:positionY};
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



