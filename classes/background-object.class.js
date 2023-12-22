class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * load first image and define the coordinates of the object
     * @param {string} imagePath - stands for the src of the image
     * @param {number} x - stands for the x-coordinate
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 0;
    }
}