class Character extends MovableObject {
    IMAGES_WALKING = [
        "img/2_character_pepe/2_walk/W-21.png",
        "img/2_character_pepe/2_walk/W-22.png",
        "img/2_character_pepe/2_walk/W-23.png",
        "img/2_character_pepe/2_walk/W-24.png",
        "img/2_character_pepe/2_walk/W-25.png",
        "img/2_character_pepe/2_walk/W-26.png",
    ];

    IMAGES_JUMPING = [
        "img/2_character_pepe/3_jump/J-31.png",
        "img/2_character_pepe/3_jump/J-32.png",
        "img/2_character_pepe/3_jump/J-33.png",
        "img/2_character_pepe/3_jump/J-34.png",
        "img/2_character_pepe/3_jump/J-35.png",
        "img/2_character_pepe/3_jump/J-36.png",
        "img/2_character_pepe/3_jump/J-37.png",
        "img/2_character_pepe/3_jump/J-38.png",
        "img/2_character_pepe/3_jump/J-39.png",
    ];

    IMAGES_DEAD = [
        "img/2_character_pepe/5_dead/D-51.png",
        "img/2_character_pepe/5_dead/D-52.png",
        "img/2_character_pepe/5_dead/D-53.png",
        "img/2_character_pepe/5_dead/D-54.png",
        "img/2_character_pepe/5_dead/D-55.png",
        "img/2_character_pepe/5_dead/D-56.png",
        "img/2_character_pepe/5_dead/D-57.png",
    ];

    IMAGES_HURT = [
        "img/2_character_pepe/4_hurt/H-41.png",
        "img/2_character_pepe/4_hurt/H-42.png",
        "img/2_character_pepe/4_hurt/H-43.png",
    ];

    IMAGES_SLEEPING = [
        "img/2_character_pepe/1_idle/idle/I-1.png",
        "img/2_character_pepe/1_idle/idle/I-2.png",
        "img/2_character_pepe/1_idle/idle/I-3.png",
        "img/2_character_pepe/1_idle/idle/I-4.png",
        "img/2_character_pepe/1_idle/idle/I-5.png",
        "img/2_character_pepe/1_idle/idle/I-6.png",
        "img/2_character_pepe/1_idle/idle/I-7.png",
        "img/2_character_pepe/1_idle/idle/I-8.png",
        "img/2_character_pepe/1_idle/idle/I-9.png",
        "img/2_character_pepe/1_idle/idle/I-10.png",
        "img/2_character_pepe/1_idle/long_idle/I-11.png",
        "img/2_character_pepe/1_idle/long_idle/I-12.png",
        "img/2_character_pepe/1_idle/long_idle/I-13.png",
        "img/2_character_pepe/1_idle/long_idle/I-14.png",
        "img/2_character_pepe/1_idle/long_idle/I-15.png",
    ];

    height = 280;
    y = 155;
    world;
    energy = 100;
    bottles = 100;
    offset = {
        top: 115,
        right: 20,
        bottom: 10,
        left: 20
    };

    isSleeping = false;
    sleepingFrameIndex = 0;
    lastSleepingFrameTime = 0;

    constructor() {
        super();
        this.loadImage("img/2_character_pepe/2_walk/W-21.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
        this.speed = 5;
    }

    animate() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }

            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            if (this.world.keyboard.DOWN) {
                this.throwBottle();
                this.resetSleepingState();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.resetSleepingState();
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.resetSleepingState();
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.resetSleepingState();
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.resetSleepingState();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playSleepingAnimation();
            }
        }, 50);
    }

    throwBottle() {
        if (this.bottles <= 0) return;
        if (Date.now() - this.lastThrow < 1000) return;
        this.lastThrow = Date.now();
        let bottle = new ThrowableObject(this.x + 100, this.y + 100);
        bottle.throw();
        this.world.level.throwableObjects.push(bottle);
        this.bottles -= 20;
        this.world.bottleBar.setPercentage(this.bottles);
    }

    resetSleepingState() {
        this.isSleeping = false;
        this.sleepingFrameIndex = 0;
        this.lastSleepingFrameTime = 0;
    }

    playSleepingAnimation() {
        if (!this.isSleeping) {
            this.isSleeping = true;
            this.sleepingFrameIndex = 0;
            this.lastSleepingFrameTime = new Date().getTime();
            this.loadImage(this.IMAGES_SLEEPING[0]);
            return;
        }

        const now = new Date().getTime();
        if (now - this.lastSleepingFrameTime >= 1000) {
            this.sleepingFrameIndex++;
            if (this.sleepingFrameIndex < this.IMAGES_SLEEPING.length) {
                this.loadImage(this.IMAGES_SLEEPING[this.sleepingFrameIndex]);
            } else {
                this.sleepingFrameIndex = this.IMAGES_SLEEPING.length - 1;
                this.loadImage(this.IMAGES_SLEEPING[this.sleepingFrameIndex]);
            }
            this.lastSleepingFrameTime = now;
        }
    }

    killEnemy(enemy) {
        enemy.energy = 0;
        enemy.deadTime = Date.now();
    }
}