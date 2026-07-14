class Sound {
    static GAME_START = new Audio('audio/game/gameStart.mp3');
    static CHARACTER_WALK = new Audio('../audios/character_walk.mp3');
    static CHARACTER_JUMP = new Audio('audio/character/characterJump.wav');
    static CHARACTER_HURT = new Audio('audio/character/characterDamage.mp3');
    static CHARACTER_SNORE = new Audio('audio/character/characterSnoring.mp3');
    static CHARACTER_DEAD = new Audio('../audios/character_dead.mp3');
    static CHICKEN_DEAD = new Audio('audio/chicken/chickenDead.mp3');
    static BOTTLE_HIT = new Audio('audio/throwable/bottleBreak.mp3');
    static COLLECT_COIN = new Audio('audio/collectibles/bottleCollectSound.wav');
    static COLLECT_BOTTLE = new Audio('audio/collectibles/collectSound.wav');
    static BACKGROUND_MUSIC = new Audio('audio/game/bensound-funkysuspense.mp3')
    static allSounds = [
        Sound.CHARACTER_WALK,
        Sound.CHARACTER_DEAD,
        Sound.CHARACTER_HURT,
        Sound.CHARACTER_JUMP,
        Sound.CHARACTER_SNORE,
        Sound.CHICKEN_DEAD,
        Sound.BOTTLE_HIT,
        Sound.COLLECT_BOTTLE,
        Sound.COLLECT_COIN,
        Sound.GAME_START,
        Sound.BACKGROUND_MUSIC
    ];
    static Muted = false;

    static playSound(sound) {
        if (Sound.isMuted) {
            return;
        }
        sound.volume = 0.2;
        if (sound === Sound.BACKGROUND_MUSIC) {
            sound.loop = true;
            sound.volume = 1;
        } else {
            sound.currentTime = 0;
        }
        sound.play();
    }

    static stopAllSounds() {
        Sound.allSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }
}