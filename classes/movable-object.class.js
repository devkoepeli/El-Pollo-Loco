class MovableObject {
    x = 120;
    y;
    height;
    width;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.1;
    otherDirection = false;

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
        console.log('Moving right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;

            if (this.x < -500) {
                this.x = 720;
            }
        }, 1000 / 120);
    }
}

