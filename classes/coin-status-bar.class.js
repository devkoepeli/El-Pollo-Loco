class CoinStatusBar extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    percentage = 100;

    /**
     * load image for canvas and assign all key values to inherited properties
     */
    constructor() {
        super().loadImage(this.IMAGES[5]);
        this.loadImages(this.IMAGES);

        this.x = 50;
        this.y = 100;
        this.width = 200;
        this.height = 60;
    }

    /**
     * e.g. setPercentage(80) to assign the correct path for the statusbar img
     * @param {number} percentage - stands for the current energy level
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolvePercentageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * this function checks the current percentage to return the correct index
     * @returns - number
     */
    resolvePercentageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}