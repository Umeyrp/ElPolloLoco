class Level {
    enemies;
    clouds;
    backgroundObjects;
    thrownBottles;
    collectableObjects;
    level_end_x = 1500;

    constructor(enemies, clouds, backgroundObjects, thrownBottles, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.thrownBottles = thrownBottles;
        this.collectableObjects = collectableObjects;
    }
}