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

