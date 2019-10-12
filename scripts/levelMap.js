class LevelMap {
    _shops = [];
    _shopsPosition = [];
    constructor() {
        //ce tableau indique quelle sprite doit se trouver à chaque emplacement du cadrillage.
        this.cords = [
            [24, 24, 45, 24, 24, 24, 24, 24, 24, 24, 93, 93, 24, 24, 24, 24, 24, 24],
            [93, 93, 93, 93, 24, 24, 24, 24, 24, 45, 93, 24, 24, 24, 24, 24, 45, 24],
            [24, 24, 24, 93, 24, 24, 24, 24, 24, 24, 93, 93, 24, 24, 24, 24, 24, 24],
            [24, 24, 24, 93, 24, 24, 93, 93, 93, 93, 24, 93, 24, 24, 24, 24, 24, 24],
            [24, 24, 45, 93, 24, 24, 93, 24, 24, 93, 24, 93, 24, 24, 24, 24, 24, 24],
            [24, 24, 24, 93, 93, 93, 93, 24, 24, 93, 93, 93, 24, 24, 24, 24, 24, 24],
            [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
            [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24],
            [24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24]
        ];
        this.startCords = {X: 0, Y: 1};
        this.waypoints = [];
        this.setWaypoints();
        this._shopsPosition = this.getShopTilesPositions(45);
        this.addShopForEachTile(45);
    }

    draw() {
        this.drawMap();
        this.drawWaypoint();
        this.drawShops();
    }

    update() {
        this.updateShops();
        this.checkMouseClickedShopTile(45);
    }

    drawShops(){
        this._shops.forEach((shop) =>{
            shop.draw();
        });
    }

    updateShops(){
        this._shops.forEach((shop) =>{
            shop.update();
        });
    }

    checkMouseClickedShopTile(tileID){
        this._shopsPosition.forEach((shopPosition, id) =>{
            if(this.intersectRectanglePoint(shopPosition.X * spritesGroundSize,shopPosition.Y * spritesGroundSize,spritesGroundSize,spritesGroundSize,Mouse.position.X,Mouse.position.Y)){
                if(Mouse.isClicked){
                    this._shops[id].clicked();
                    this._shops.forEach(shop =>{
                        if(this._shops[id] !== shop){
                            shop.closeMenu();
                        }
                    });
                    Mouse.isClicked = false;
                }
            }
        });
    }

    intersectRectanglePoint(x1, y1, w1, h1, x2, y2) {
        if (x2 > x1 + w1 || x2 < x1 || y2 < y1 || y2 > y1 + h1) {
            return false;
        }
        return true;
    }

    getShopTilesPositions(tileID){
        let tilesPositions = [];
        this.cords.forEach((array, indexY) => {
            array.forEach((tile, indexX) =>{
                if(tile === tileID){
                    tilesPositions.push({X:indexX, Y:indexY});
                }
            });
        });
        return tilesPositions;
    }

    addShopForEachTile(tileID){
        this._shopsPosition.forEach((tileShop, id) => {
                   this._shops.push(new Shop(tileShop.X * spritesGroundSize + spritesGroundSize/2,tileShop.Y * spritesGroundSize + spritesGroundSize/2));
        });

    }

    //cette méthode affiche la map sur le canvas
    drawMap() {
        for (let i = 0; i < this.cords.length; i++) {
            for (let j = 0; j < this.cords[i].length; j++) {
                ctx.drawImage(sprites[this.cords[i][j]], j * spritesGroundSize, i * spritesGroundSize, spritesGroundSize, spritesGroundSize);
            }
        }
    }

    //cette méthode affiche le waypoints sur le canvas
    drawWaypoint() {
        try {
            this.waypoints.forEach(function (element) {
                element.drawWaypoints();
            })
        } catch (e) {
            console.log(e);
        }
    }


    //permet de compter le nombre d'élément egaux se trouvent dans un tableau
    countNumberElementIn2DTable(table2D, element) {
        let count = 0;
        for (let i = 0; i < table2D.length; i++) {
            for (let j = 0; j < table2D[0].length; j++) {
                if (table2D[i][j] === 93) {
                    count++;
                }
            }
        }
        return count;
    }

    //cette méthode permet vérifier si x et y existe déjà dans le tableau des waypoints
    checkPointExistInWaypointsTable(x, y) {

        for (let i = 0; i < this.waypoints.length; i++) {
            if (this.waypoints[i].position.X === x && this.waypoints[i].position.Y === y) {
                return true;
            }
        }
        return false;
    }

    //place les waypoint de la map en vérifiant ou se trouve les chemins du tableau coords
    setWaypoints() {
        let numberOfWaypoint = 0;
        let totalNumberOfWayPoint = this.countNumberElementIn2DTable(this.cords, 93);
        let currentPositionX = this.startCords.X;
        let currentPositionY = this.startCords.Y;

        let stop = false;
        let next = true;

        this.waypoints.push(new Waypoint(numberOfWaypoint, this.startCords.X * spritesGroundSize + spritesGroundSize / 2, this.startCords.Y * spritesGroundSize + spritesGroundSize / 2));

        while (!stop) {
            next = true;
            //93 représente le numéro de l'image route en terre
            //on check à droite

            //vérifie s'il y a un chemin disponible à droite(x+1)
            if (currentPositionX + 1 < this.cords[0].length && next === true) {//verifie s'il l'on sort des limite du tableau et grace au next si l'on a pas déjà ajouter une valeur au tableau
                if (this.cords[currentPositionY][currentPositionX + 1] === 93) {//verifie si c'est un chemin
                    if (this.checkPointExistInWaypointsTable((currentPositionX + 1) * spritesGroundSize + spritesGroundSize / 2, currentPositionY * spritesGroundSize + spritesGroundSize / 2) === false) {//verifie s'il y a pas déjà un waypoint avec les même coordonnées
                        this.waypoints.push(new Waypoint(numberOfWaypoint, (currentPositionX + 1) * spritesGroundSize + spritesGroundSize / 2, currentPositionY * spritesGroundSize + spritesGroundSize / 2));//on ajoute le waypoint dans le tableau de waypoint
                        currentPositionX += 1;//mettre à jour la valeur pour les prochains tests
                        next = false;
                    }
                }
            }
            //vérifie s'il y a un chemin disponible en bas(y+1)
            if (currentPositionY + 1 < this.cords.length && next === true) {//verifie s'il l'on sort des limite du tableau et grace au next si l'on a pas déjà ajouter une valeur au tableau
                if (this.cords[currentPositionY + 1][currentPositionX] === 93) {//verifie si c'est un chemin
                    if (this.checkPointExistInWaypointsTable(currentPositionX * spritesGroundSize + spritesGroundSize / 2, (currentPositionY + 1) * spritesGroundSize + spritesGroundSize / 2) === false) {//verifie s'il y a pas déjà un waypoint avec les même coordonnées
                        this.waypoints.push(new Waypoint(numberOfWaypoint, currentPositionX * spritesGroundSize + spritesGroundSize / 2, (currentPositionY + 1) * spritesGroundSize + spritesGroundSize / 2));//on ajoute le waypoint dans le tableau de waypoint
                        currentPositionY += 1;//mettre à jour la valeur pour les prochains tests
                        next = false;
                    }
                }
            }
            //vérifie s'il y a un chemin disponible à gauche(x-1)
            if (currentPositionX - 1 >= 0 && next === true) { //verifie s'il l'on sort des limite du tableau et grace au next si l'on a pas déjà ajouter une valeur au tableau
                if (this.cords[currentPositionY][currentPositionX - 1] === 93) {//verifie si c'est un chemin
                    if (this.checkPointExistInWaypointsTable((currentPositionX - 1) * spritesGroundSize + spritesGroundSize / 2, currentPositionY * spritesGroundSize + spritesGroundSize / 2) === false) {//verifie s'il y a pas déjà un waypoint avec les même coordonnées
                        this.waypoints.push(new Waypoint(numberOfWaypoint, (currentPositionX - 1) * spritesGroundSize + spritesGroundSize / 2, currentPositionY * spritesGroundSize + spritesGroundSize / 2));//on ajoute le waypoint dans le tableau de waypoint
                        currentPositionX -= 1;//mettre à jour la valeur pour les prochains tests
                        next = false;
                    }
                }
            }
            //vérifie s'il y a un chemin disponible en haut(y-1)
            if (currentPositionY - 1 >= 0 && next === true) {//verifie s'il l'on sort des limite du tableau et grace au next si l'on a pas déjà ajouter une valeur au tableau
                if (this.cords[currentPositionY - 1][currentPositionX] === 93) {//verifie si c'est un chemin
                    if (this.checkPointExistInWaypointsTable(currentPositionX * spritesGroundSize + spritesGroundSize / 2, (currentPositionY - 1) * spritesGroundSize + spritesGroundSize / 2) === false) {//verifie s'il y a pas déjà un waypoint avec les même coordonnées
                        this.waypoints.push(new Waypoint(numberOfWaypoint, currentPositionX * spritesGroundSize + spritesGroundSize / 2, (currentPositionY - 1) * spritesGroundSize + spritesGroundSize / 2));//on ajoute le waypoint dans le tableau de waypoint
                        currentPositionY -= 1;//mettre à jour la valeur pour les prochains tests
                        next = false;
                    }
                }
            }
            //vérifie si tout les waypoint on été trouvé, si oui on sort de la boucle en mettant la valeur stop à true
            if (this.waypoints.length === totalNumberOfWayPoint) {
                stop = true;
            }


        }
    }
}

class Waypoint {
    constructor(id, positionX, positionY) {
        this.id = id;
        this.position = {X: positionX, Y: positionY};
    }

    drawWaypoints() {
        ctx.save();
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(this.position.X, this.position.Y, 5, 5);
        ctx.restore();
    }
}

//Création du tableau contenant les 299 sprites du jeux
function loadSprites() {
    sprites = new Array(300);
    for (let i = 1; i <= 299; i++) {
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



