class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    console.log("Collision energy" + this.character.energy);
                }
            });
        }, 100);
    }

    setWorld() {
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
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