class MovableObject {
    x = 120;
    y = 290;
    img;
    height= 150;
    width = 100;

    loadImage(path){
        this.img = new Image(); //ersetzt document.getElementById(img)
        this.img.src = path;
    }

    moveRight() {
        console.log("Move right");
    }

    moveLeft() {

    }
}