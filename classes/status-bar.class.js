class StatusBar extends DrawableObject {
    width = 200;
    height = 60;
    percentage;
    MAX_PERCENTAGE;
    images;
    x;
    y;

    constructor(path, percentage, MAX_PERCENTAGE, x, y, images) {
        super();
        this.images = images;
        this.loadImage(path);
        this.loadImages(this.images);
        this.y = y;
        this.x = x;
        this.percentage = percentage;
        this.MAX_PERCENTAGE = MAX_PERCENTAGE;
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
        if (this.percentage >= this.MAX_PERCENTAGE) return 5;
        if (this.percentage >= this.MAX_PERCENTAGE * 0.8) return 4;
        if (this.percentage >= this.MAX_PERCENTAGE * 0.6) return 3;
        if (this.percentage >= this.MAX_PERCENTAGE * 0.4) return 2;
        if (this.percentage > this.MAX_PERCENTAGE * 0) return 1;
        return 0;
    }
}