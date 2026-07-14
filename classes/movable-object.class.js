class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (this instanceof Character && this.y - this.speedY > 155) {
                    this.y = this.GROUND_Y;
                } else {
                    this.y -= this.speedY;
                }
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 60);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { return true }
        return this.y < this.GROUND_Y;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        return i;
    }

    jump() {
        this.speedY = 30;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isColliding(mo) {
        return this.x + this.offset.left + this.width - this.offset.right - this.offset.left > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.left - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.top - mo.offset.bottom;
    }

    hit(damage) {
        if (Date.now() - this.lastHit < 350) return;
        this.lastHit = Date.now();
        if (!this.isDead()) {
            this.playHurtSound();
            this.energy -= damage;
            if (this.isDead()) {
                this.deadTime = Date.now();
                this.energy = 0;
            }
        }
    }

    isHurt() {
        let timepassed = Date.now() - this.lastHit;
        let seconds = timepassed / 1000;
        return seconds < 0.5;
    }

    isDead() {
        return this.energy <= 0;
    }
}