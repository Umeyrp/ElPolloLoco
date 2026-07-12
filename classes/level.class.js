class Level {
    enemies;
    clouds;
    backgroundObjects;
    throwableObjects;
    collectableObjects;
    level_end_x = 1500;

    constructor(enemies, clouds, backgroundObjects, throwableObjects, collectableObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.throwableObjects = throwableObjects;
        this.collectableObjects = collectableObjects;
    }
}