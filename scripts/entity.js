class Entity {
    static map = new LevelMap();
    static defense = [];
    static defense1 = new Turret(levels.level1, 5, 2);
    static ennemies = []//
    static bullets = []//
    static turretsPositions = new Array(Entity.map.cords.length);
    static UI = [];
    constructor() {
    }


    static destroyBullet(bulletID) {
        Entity.bullets.splice(bulletID, 1);
    }

    static destroyEnnemy(ennemyID) {
        Entity.ennemies.splice(ennemyID, 1);
    }


    static createBullet(id, angle, speed, positionX, positionY) {
        Entity.bullets.push(new Bullet(id, angle, speed, positionX, positionY));
    }


    static createEnnemy(ennemyNumber, positionX, positionY, time) {
        let numberEnnemyCreated = 0;
        let arr = [];
        let inter = setInterval(function () {

            if (numberEnnemyCreated < ennemyNumber) {
                arr.push(new Ennemy(numberEnnemyCreated, 0.5, 200, ennemyType.GREEN, positionX, positionY, true));
                numberEnnemyCreated++;
            } else {
                clearInterval(inter);
            }
        }, time);
        return arr;
    }


}