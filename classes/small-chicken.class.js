class SmallChicken extends MovableObject {
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    offset = {
        top: 0,
        right: 10,
        bottom: 0,
        left: 10
    };

    /**
     * load the images / first image and define the key values of this object
     * @param {number} x - stands for the x-coordinate
     */
    constructor(x) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = x;
        this.y = 360;
        this.width = 70;
        this.height = 70;
        this.speedX = 0.2 + Math.random() * 0.3;

        this.animate();
    }

    /**
     * set interval to check all xxms to play animation/ move chicken and save them in property
     */
     animate() {
        let walkingAnimation = setInterval(() => this.playWalkingAnimation(), 130);
        let moveLeftAnimation = setInterval(() => this.moveLeft(), 1000 / 60);

        this.intervalIDs.push(walkingAnimation);
        this.intervalIDs.push(moveLeftAnimation);
    }

    /**
     * show walking images
     */
    playWalkingAnimation() {
        if (!gameIsPaused && gameHasStarted) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * move chicken to the left
     */
    moveLeft() {
        if (!gameIsPaused && gameHasStarted) {
            super.moveLeft();
        }
    }

    /**
     * clear all intervals to insert the dead image of chicken
     */
    stopChickenAnimation() {
        for (const interval of this.intervalIDs) {
            clearInterval(interval);
        }
    }

    /**
     * set chicken energy to 0 and replace the chicken image
     */
    killChicken() {
        this.energy = 0;
        this.stopChickenAnimation();
        this.img.src = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
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