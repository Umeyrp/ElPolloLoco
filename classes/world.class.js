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
        new BackgroundObject("img/5_background/layers/3_third_layer/1.png")
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        addToMap(this.character);
        this.enemies.forEach(enemy => {
            addToMap(enemy);
        });
        this.clouds.forEach(cloud => {
            addToMap(cloud);
        });

        this.backgroundObject.forEach(background => {
            addToMap(background);
        });

        //Draw wird immer wieder aufgerufen jenachdem wie gut der Rechner ist mit requestAnimationFrame()
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


}