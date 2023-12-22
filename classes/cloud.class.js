class Cloud extends MovableObject {
    /**
     * load image for canvas and assign all key values to inherited properties
     * @param {string} src - stands for the src of the image
     * @param {number} x - stands for the x-coordinate
     */
    constructor(src, x) {
        super().loadImage(src);
        this.x = x;
        this. y = 20;
        this.width = 500;
        this.height = 250;
        this.speedX = 0.2;
    
        this.animate();
    }

    /**
     * as soon as cloud is drawn to canvas check to move cloud to left
     */
    animate() {
        setInterval(() => {
            if (!gameIsPaused && gameHasStarted) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}