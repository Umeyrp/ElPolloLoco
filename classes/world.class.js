class World {
    character = new Character();
    level = level1;
    endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBarCharacter = new HealthBar(this.character.energy, this.character.MAX_ENERGY);
    healthBarEndboss = new HealthBar(this.endboss.energy, this.endboss.MAX_ENERGY, this.endboss.x + 55, undefined, HealthBar.IMAGES_ENDBOSS);
    coinBar = new CoinBar(START_COINS, MAX_COINS);
    bottleBar = new BottleBar(this.character.bottles, MAX_BOTTLES);
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.drawWorld();
        this.linkWorldToCharacter();
        this.run();
    }

    run() {
        setInterval(() => {
            this.healthBarEndboss.x = this.endboss.x + 55;
            this.checkCollisions();
            this.removeOutOfWindowBottles();
            this.removeDeadEnemies();
        }, 1000 / 60);
    }

    removeOutOfWindowBottles() {
        this.level.throwableObjects = this.level.throwableObjects.filter(bottle => {
            return bottle.y <= 500;
        });
    }

    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => {
            if (!enemy.isDead()) {
                return true;
            }
            return Date.now() - enemy.deadTime < 382;
        });
    }

    checkCollisions() {
        this.checkCharacterEnemyCollisions();
        this.checkBottleCollisions();
    }

    checkCharacterEnemyCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.speedY <= 0) {
                    this.character.jumpOnEnemy(enemy);
                    this.character.jump();
                } else {
                    this.character.hit(5);
                    this.healthBarCharacter.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkBottleCollisions() {
        this.level.enemies.forEach(enemy => {
            this.level.throwableObjects.forEach(bottle => {
                if (bottle.isColliding(enemy)) {
                    this.character.bottleHitEnemy(enemy);
                    if (enemy instanceof Endboss) {
                        this.healthBarEndboss.setPercentage(this.endboss.energy);
                    }
                }
            });
        });
    }

    linkWorldToCharacter() {
        this.character.world = this;
    }

    addToMap(movingObject) {
        if (movingObject.otherDirection) {
            this.flipImage(movingObject);
        }
        movingObject.draw(this.ctx);
        movingObject.drawFrame(this.ctx);
        if (movingObject.otherDirection) {
            this.flipImageBack(movingObject);
        }
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    drawWorld() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.healthBarEndboss);
        this.ctx.translate(-this.camera_x, 0); //Fix Back
        // ----- Fixed Objects here ---- //
        this.addToMap(this.healthBarCharacter);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        // ----- Fixed Objects here ---- //
        this.ctx.translate(this.camera_x, 0); //Fix Forward
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.drawWorld();
        });
    }

    flipImage(movingObject) {
        this.ctx.save();
        this.ctx.translate(movingObject.width, 0);
        this.ctx.scale(-1, 1);
        movingObject.x = movingObject.x * -1;
    }

    flipImageBack(movingObject) {
        movingObject.x = movingObject.x * -1;
        this.ctx.restore();
    }
}