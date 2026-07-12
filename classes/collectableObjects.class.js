class CollectableObject extends DrawableObject {
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10
    }
    x = 300 + Math.random() * 600;

    constructor() {
        super();
    }
}