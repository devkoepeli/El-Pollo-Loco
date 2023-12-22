class EndbossHealthStatusbar extends DrawableObject {
    IMAGES = [
        './img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        './img/7_statusbars/2_statusbar_endboss/orange/orange100.png'
    ];
    percentage = 100;

    /**
     * load images / first image and assign base values to inherited properties to draw the object
     */
    constructor() {
        super().loadImage(this.IMAGES[5]);
        this.loadImages(this.IMAGES);

        this.x = 470;
        this.y = 6;
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
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}