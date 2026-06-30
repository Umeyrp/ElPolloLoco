class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObject = [
        new BackgroundObject("img/5_background/layers/air.png", 0),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),
        new BackgroundObject("img/5_background/layers/air.png", 720),
        new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 720),
        new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 720),
        new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 720),
        new BackgroundObject("img/5_background/layers/air.png", 720 * 2),
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 720 * 2),
        new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 720 * 2),
        new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 720 * 2)
    ];
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
    }

    setWorld() {
        this.character.world = this;
    }

    addToMap(movingObject) {
        if (movingObject.otherDirection) {
            this.ctx.save();
            this.ctx.translate(movingObject.width, 0);
            this.ctx.scale(-1, 1);
            movingObject.x = movingObject.x * -1;
        }
        this.ctx.drawImage(movingObject.img, movingObject.x, movingObject.y, movingObject.width, movingObject.height);
        if (movingObject.otherDirection) {
            movingObject.x = movingObject.x * -1;
            this.ctx.restore();
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
        this.addObjectsToMap(this.backgroundObject);
        this.addObjectsToMap(this.clouds);

        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}