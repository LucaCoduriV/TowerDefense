class Entity{
    static map = new Map();
    static defense = new Turret(levels.level1, 9, 2);
    static defense1 = new Turret(levels.level1, 5, 2);
    static ennemies = []//Entity.ennemyFactory(20,0 * spritesGroundSize,1 * spritesGroundSize,1000);
    static bullets = []//
    static turretsPositions = new Array(Entity.map.cords.length);
    constructor(){
    }


    static destroyBullet(bulletID){
        Entity.bullets.splice(bulletID, 1);
    }
    static destroyEnnemy(ennemyID){
        Entity.ennemies.splice(ennemyID,1);
    }


    static bulletFactory(angle, speed, positionX, positionY,time) {
        let numberBulletCreated = 0;
        let arr = [];
        let inter = setInterval(function () {
            if (numberBulletCreated < ennemyNumber) {
                arr.push(new Bullet(angle, speed, positionX,positionY));
                numberBulletCreated++;
            } else {
                clearInterval(inter);
            }
        }, time);
        return arr;
    }


    static ennemyFactory(ennemyNumber, positionX, positionY, time) {
        let numberEnnemyCreated = 0;
        let arr = [];
        let inter = setInterval(function () {

            if (numberEnnemyCreated < ennemyNumber) {
                arr.push(new Ennemy(numberEnnemyCreated,2, 200, ennemyType.GREEN, positionX, positionY, true));
                numberEnnemyCreated++;
            } else {
                clearInterval(inter);
            }
        }, time);
        return arr;
    }


}