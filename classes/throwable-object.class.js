class ThrowableObject extends MovableObject {
    offset = {
        top: 10,
        right: 0,
        bottom: 5,
        left: 10
    };
    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    otherDirection;

    /**
     * load the images of the bottle and set the base values relative to the position of the character
     * @param {number} characterX - stands for the x-coordinate
     * @param {number} characterY - stands for the y-coordinate
     * @param {boolean} isOtherDirection - either true or false
     */
    constructor(characterX, characterY, isOtherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = characterX;
        this.y = characterY;
        this.width = 55;
        this.height = 80;
        this.otherDirection = isOtherDirection;

        this.throw();
    }

    /**
     * throwing animation for the created bottle with direction comparison
     */
    throw() {
        this.applyGravitation()
        this.speedY = 9;
        this.speedX = 20;
        
        if (!this.otherDirection) {
            let throwToRight = setInterval(() => this.throwToTheRight(), 40);
            this.playThrowingSound();
            this.intervalIDs.push(throwToRight);
        } else {
            this.x -= 80;
            let throwToLeft = setInterval(() => this.throwToTheLeft(), 40);
            this.playThrowingSound();
            this.intervalIDs.push(throwToLeft);
        }
    }

    /**
     * move the object to the right as long as the x-coordinate of the object is smaller than 3000
     */
    throwToTheRight() {
        if (this.x < 3000 && !gameIsPaused) {
            this.x += this.speedX;
            this.playAnimation(this.IMAGES_ROTATION);
        }
    }
 
    /**
     * move the object to the left as long as the x-coordinate of the object is greater than -2000
     */
     throwToTheLeft() {
        if (this.x > -2000 && !gameIsPaused) {
            this.x -= this.speedX;
            this.playAnimation(this.IMAGES_ROTATION);
        }
    }

    /**
     * set audio properties and play the audio
     */
    playThrowingSound() {
        sounds.bottle_throwing.volume = 0.7;
        sounds.bottle_throwing.currentTime = 0;
        sounds.bottle_throwing.play();
    }

    /**
     * set audio properties and play the audio
     */
    playBreakingSound() {
        sounds.bottle_breaking.currentTime = 0;
        sounds.bottle_breaking.volume = 0.8;
        sounds.bottle_breaking.play();
    }

    /**
     * splash audio and animation with the splash images of the bottle
     */
    letBottleSplash() {
        this.clearThrowingIntervals();
        this.energy = 0;
        this.playBreakingSound();
        this.speedY = 0;
        this.speedX = 0;

        let splashAnimation = setInterval(() => {
            if (this.isBottleAboveGround()) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else if (this.isBottleBelowGround()) {
                clearInterval(splashAnimation);
            }
        }, 1000 / 60);
    }

    /**
     * check if bottle is above ground in order to limit the animation
     * @returns boolean value
     */
    isBottleAboveGround() {
        return !gameIsPaused && this.y < 500;
    }

    /**
     * check if bottle is below ground
     * @returns boolean value
     */
    isBottleBelowGround() {
        return this.y > 500;
    }

    /**
     * clear the two intervals in the throw method
     */
    clearThrowingIntervals() {
        for (const interval of this.intervalIDs) {
            clearInterval(interval);
        }
    }
}