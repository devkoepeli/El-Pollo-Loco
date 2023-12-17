class MovableObject extends DrawableObject{
    currentImage = 0;
    speedX = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.25;
    energy = 100;
    lastHit = 0;
    isSplicable = false;

    applyGravitation() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 100);
    }

    /**
     * if instance is throwableobject - object should fall infinitely otherwise only to ground
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
     * subtract 5 of energy level with every hit from enemies and save the time of the current hit
     */
    hit() {
        this.energy -= 2.5;
        this.lastHit = new Date().getTime();
    }

    isAlive() {
        return this.energy > 0;
    }

    isDead() {
        return this.energy == 0;
    }

    /**
     * calculate time difference in ms between current time and time of last hit
     * @returns - boolean value
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        return timePassed < 300;
    }

    moveRight() {
        this.x += this.speedX;
    }

    moveLeft() {
        this.x -= this.speedX;
    }

    /**
     * changes the images with remainder/modulo operator for animation effect
     * @param {array} images - array with path of images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        // let i = 0 / 6 = 0 Rest 0; 1 / 6 = 0 Rest 1; 2 / 6 = 0 Rest 2; 5 / 6 = 0 Rest 5; 6 / 6 = 1 Rest 0; 7 / 6 = 1 Rest 1; ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    async playAnimationOnce(images) {
        for (const image of images) {
            await new Promise(resolve => setTimeout(() => {
                let path = image;
                this.img = this.imageCache[path];
                resolve();
            }, 150));
        }
        this.stopGame();
    }

    jump() {
        this.speedY = 10;
    }

    /**
     * clear all intervals - intervals return a unique id with which one can access the specific interval
     * e.g. animationInterval has the ID 10
     */
     stopGame() {
        for (let i = 0; i < 1000; i++) {
            window.clearInterval(i);
        }
    }
}