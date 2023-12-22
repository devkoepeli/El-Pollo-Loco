class MovableObject extends DrawableObject{
    currentImage = 0;
    speedX = 0.1;
    angrySpeedX = 3;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.25;
    energy = 100;
    lastHit = 0;
    isSplicable = false;
    intervalIDs = [];

    /**
     * function to pull current object back to the ground by decreasing its y-coordinate every 100ms
     */
    applyGravitation() {
        setInterval(() => {
            if (!gameIsPaused && this.isAboveGround() || !gameIsPaused && this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 100);
    }

    /**
     * if instance is throwableobject - object should fall below the ground otherwise (character) on the ground
     * @returns - boolean value
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 550;
        } else {
            return this.y < 135;
        }
    }

    /**
     * is character colliding with e.g. Chicken
     * @param {object} mo - stands for other movable objects
     * @returns boolean value
     */
    isColliding(mo) {
        return (this.x + this.width - this.offset.right) > (mo.x + mo.offset.left) &&
            (this.y + this.height - this.offset.bottom) > (mo.y + mo.offset.top) &&
            (this.x + this.offset.left) < (mo.x + mo.width - mo.offset.right) &&
            (this.y + this.offset.top) < (mo.y + mo.height - mo.offset.bottom) // &&
            // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    /**
     * subtract the number of energy level with every hit from enemies and save the time of the current hit
     */
    hit() {
        this.energy -= 2.5;
        this.lastHit = new Date().getTime();
    }

    /**
     * is energy of the object bigger than 0
     * @returns boolean value
     */
    isAlive() {
        return this.energy > 0;
    }

    /**
     * is energy of object equal to 0
     * @returns boolean value
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * calculate time difference in ms between current time and time of last hit
     * @returns - boolean value
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 400;
    }

    /**
     * move the object to the right by increasing its x-coordinate all xxxms according to interval time
     */
    moveRight() {
        this.x += this.speedX;
    }

    /**
     * move the object to the left by decrasing its x-coordinate all xxxms according to interval time
     */
    moveLeft() {
        this.x -= this.speedX;
    }

    /**
     * move the object to the left by decrasing its x-coordinate all xxxms according to interval time
     */
    moveLeftAngry() {
        this.x -= this.angrySpeedX;
    }

    /**
     * move the object to the right by increasing its x-coordinate all xxxms according to interval time
     */
    moveRightAngry() {
        this.x += this.angrySpeedX
    }

    /**
     * changes the images with remainder/modulo operator for animation effect
     * @param {array} images - array with path of images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * show death images of either character or endboss only once and then stop the game
     * @param {array} images - includes all images
     * @param {string} result - either 'victory' or 'defeat'
     */
    async playAnimationOnce(images, result) {
        for (const image of images) {
            await new Promise(resolve => setTimeout(() => {
                let path = image;
                this.img = this.imageCache[path];
                resolve();
            }, 150));
        }
        pauseAllAudio();
        stopGame();
        gameOver(result);
    }

    /**
     * speedY will be subtracted from y-coordinate of object when called then gravitation force has an effect
     */
    jump() {
        this.speedY = 10;
    }

    /**
     * if character jumps on enemies it bounces back into the air
     */
    bounceBack() {
        this.speedY = 9;
        this.playBounceAudio();
    }

    /**
     * play bouncing audio
     */
    playBounceAudio() {
        sounds.character_bounce.currentTime = 0;
        sounds.character_bounce.volume = 0.15;
        sounds.character_bounce.play();
    }
}