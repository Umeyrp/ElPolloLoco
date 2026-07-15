let canvas;
let world;
let keyboard;

function startGame() {
    document.querySelector("#startscreen").style.display = "none";
    canvas = document.querySelector('#canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    ctx = canvas.getContext('2d');
}

function showControls() {
    alert(
        `Controls

W or Space = Jump
A & D = Move left / right
S = Throw bottle`
    );
}

function showImprint() {
    alert(
        `Imprint

Your Name
Your Address
your@email.com`
    );
}

window.addEventListener('keyup', (event) => {
    if (event.code == "KeyW") keyboard.UP = false;
    if (event.code == "KeyS") keyboard.DOWN = false;
    if (event.code == "KeyA") keyboard.LEFT = false;
    if (event.code == "KeyD") keyboard.RIGHT = false;
    if (event.code == "Space") keyboard.SPACE = false;
});

window.addEventListener('keydown', (event) => {
    if (event.code == "KeyW") keyboard.UP = true;
    if (event.code == "KeyS") keyboard.DOWN = true;
    if (event.code == "KeyA") keyboard.LEFT = true;
    if (event.code == "KeyD") keyboard.RIGHT = true;
    if (event.code == "Space") keyboard.SPACE = true;
});

function showGameoverScreen() {
    document.querySelector('#gameoverscreen').style.display = "block";
}

function showWinScreen() {
    document.querySelector('#winscreen').style.display = "block";
}

function restartGame() {
    document.querySelector('#gameoverscreen').style.display = "none";
    document.querySelector('#winscreen').style.display = "none";
    startGame();
}

function goHome() {
    document.querySelector('#gameoverscreen').style.display = "none";
    document.querySelector('#winscreen').style.display = "none";
    document.querySelector('#startscreen').style.display = "block";
}

function toggleMute() {
    Sound.toggleMute();
    updateMuteIcon();
}

function updateMuteIcon() {
    const muteIcon = document.getElementById('muteIcon');
    if (!muteIcon) {
        return;
    }
    muteIcon.src = Sound.isMuted ? './img/volume-mute.png' : './img/volume.png';
    muteIcon.alt = Sound.isMuted ? 'Muted' : 'Volume';
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i) + console.log("e");
    ;
}