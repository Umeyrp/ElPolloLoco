class ThrowableObject extends MovableObject {
    IMAGES_FLYING = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
    ];

    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ];
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10
    }
    acceleration = 1.6;
    speedY = 25;
    splashed = false;

    constructor(x, y, otherDirection) {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_FLYING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;
        this.height = 60;
        this.width = 50;
        this.applyGravity();
        this.throw();
        this.animate();
        this.checkThrownBottlesHitGround();
    }

    checkThrownBottlesHitGround() {
        setInterval(() => {
            if (!this.splashed && this.y >= 300) {
                this.splashed = true;
                Sound.playSound(Sound.BOTTLE_HIT);
            }
        }, 1000 / 25);
    }

    animate() {
        setInterval(() => {
            if (!this.splashed) {
                this.playAnimation(this.IMAGES_FLYING);
            } else {
                this.playAnimation(this.IMAGES_SPLASH);
            }
        }, 1000 / 15);
    }

    throw() {
        setInterval(() => {
            this.x += this.otherDirection ? -18 : 18;
        }, 1000 / 30);
    }
}