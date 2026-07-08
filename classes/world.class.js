class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthBar = new HealthBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar(undefined, this.character.bottles);

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
            this.checkCollisions();
        }, 100);
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            // console.log(this.character.y + this.character.offset.top + this.character.height - this.character.offset.top, "char y+height");
            // console.log(enemy.y + enemy.offset.top, "enemy y");
            if (this.character.isColliding(enemy)) {
                if (this.character.isCollidingTop(enemy)) {
                    console.log("top");

                    return;
                }
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
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
        this.ctx.translate(-this.camera_x, 0); //Fix Back
        // ----- Fixed Objects here ---- //
        this.addToMap(this.healthBar);
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