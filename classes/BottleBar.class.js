class BottleBar extends StatusBar {
    static IMAGES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png",
    ];

    constructor(percentage = 0, MAX_PERCENTAGE, x = 50, y = 100) {
        super("img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png", percentage, MAX_PERCENTAGE, x, y, BottleBar.IMAGES);
    }
}