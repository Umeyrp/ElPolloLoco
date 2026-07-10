class StatusBar extends DrawableObject {
    percentage;
    width = 200;
    height = 60;
    fullPercentage;
    images;
    x;
    y;

    constructor(path, percentage, x, y, images) {
        super();
        this.images = images;
        this.loadImage(path);
        this.loadImages(this.images);
        this.y = y;
        this.x = x;
        this.percentage = percentage;
        this.fullPercentage = percentage;
        this.setPercentage(percentage);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        const images = this.images;
        if (!images || images.length === 0) return;

        const index = this.resolveImageIndex();
        const path = images[index];
        const cachedImage = this.imageCache[path];
        this.img = cachedImage || this.img;

        if (!this.img) {
            this.loadImage(path);
        }
    }

    resolveImageIndex() {
        if (this.percentage >= this.fullPercentage) return 5;
        if (this.percentage >= this.fullPercentage * 0.8) return 4;
        if (this.percentage >= this.fullPercentage * 0.6) return 3;
        if (this.percentage >= this.fullPercentage * 0.4) return 2;
        if (this.percentage > this.fullPercentage * 0) return 1;
        return 0;
    }
}