class StatusBar extends DrawableObject {
    percentage;
    width = 200;
    height = 60;
    x = 50;
    images;
    y;

    constructor(path, y, percentage, images) {
        super();
        this.images = images;
        this.loadImage(path);
        this.loadImages(this.images);
        this.y = y;
        this.percentage = percentage;
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
        if (this.percentage >= 100) return 5;
        if (this.percentage > 80) return 4;
        if (this.percentage > 60) return 3;
        if (this.percentage > 40) return 2;
        if (this.percentage > 20) return 1;
        return 0;
    }
}