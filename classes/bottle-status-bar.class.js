class BottleStatusBar extends MovableObject {
    IMAGES = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    percentage = 100;

    /**
     * load first image and all other images and define the key values for the draw method
     */
    constructor() {
        super().loadImage(this.IMAGES[5]);
        this.loadImages(this.IMAGES);

        this.x = 50;
        this.y = 50;
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
     * @returns number
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