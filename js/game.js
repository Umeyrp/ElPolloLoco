let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    ctx = canvas.getContext('2d');
}

window.addEventListener('keypress', (event) => {
    console.log(event);
    
})