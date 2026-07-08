class ThrowableObject extends MovableObject {
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10
    }

    constructor(x, y) {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }
}