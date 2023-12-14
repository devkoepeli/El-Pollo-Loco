class MovableObject {
    x = 120;
    y;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;
    speedX = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.25;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    energy = 100;
    lastHit = 0;


    applyGravitation() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 100);
    }

    isAboveGround() {
        return this.y < 135;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * load the current path into the imageCache JSON
     * @param {array} images - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(images) {
        images.forEach(path => {
            let image = new Image();
            image.src = path;
            this.imageCache[path] = image;
        })
    }

    drawObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        if (this.checkObject()) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    drawFrameWithoutOffset(ctx) {
        if (this.checkObject()) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - (this.offset.right * 2), this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    checkObject() {
        return this instanceof Character || this instanceof Endboss || this instanceof Chicken || this instanceof Coin;
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
        this.energy -= 5;
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
     * changes the images for animation effect
     * @param {array} images - array with path of images
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        // let i = 0 / 6 = 0 Rest 0; 1 / 6 = 0 Rest 1; 2 / 6 = 0 Rest 2; 5 / 6 = 0 Rest 5; 6 / 6 = 1 Rest 0; 7 / 6 = 1 Rest 1; ...
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 10;
    }
}