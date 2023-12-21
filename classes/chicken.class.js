class Chicken extends MovableObject {
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 280 + Math.random() * 320;
        this.y = 330;
        this.width = 80;
        this.height = 100;
        this.speedX = 0.1 + Math.random() * 0.3;

        this.animate();
    }

    animate() {
        let walkingAnimation = setInterval(() => {
            if (!gameIsPaused && gameHasStarted) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 130);

        let moveLeftAnimation = setInterval(() => {
            if (!gameIsPaused && gameHasStarted) {
                this.moveLeft();
            }
        }, 1000 / 120);

        this.intervalIDs.push(walkingAnimation);
        this.intervalIDs.push(moveLeftAnimation);
    }

    /**
     * clear all intervals to insert the dead image of chicken
     */
    stopChickenAnimation() {
        for (const interval of this.intervalIDs) {
            clearInterval(interval);
        }
    }

    killChicken() {
        this.energy = 0;
        this.stopChickenAnimation();
        this.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
        this.makeChickenSplicable();
    }

    /**
     * set isSplicable to true, so the chicken can be removed from the canvas
     */
    makeChickenSplicable() {
        setTimeout(() => {
            this.isSplicable = true;
        }, 500);
    }
}