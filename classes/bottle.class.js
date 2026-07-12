class Bottle extends CollectableObject {
    offset = {
        top: 10,
        right: 10,
        bottom: 7,
        left: 10
    }
    y = 360;
    height = 60;
    width = 50;

    constructor() {
        super();
        this.loadImage("img/6_salsa_bottle/salsa_bottle.png");

    }
}