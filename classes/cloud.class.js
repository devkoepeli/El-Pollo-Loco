class Cloud extends MovableObject {
    constructor(src, x) {
        super().loadImage(src);
        this.x = x;
        this. y = 20;
        this.width = 500;
        this.height = 250;
        this.speedX = 0.2;
    
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!gameIsPaused && gameHasStarted) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }
}