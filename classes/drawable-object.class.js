class DrawableObject {
    x = 120;
    y;
    height;
    width;
    img;
    imageCache = {};    
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

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
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    checkObject() {
        return this instanceof Character || this instanceof Endboss || this instanceof Chicken || this instanceof Coin || this instanceof Bottle1 || this instanceof Bottle2 || this instanceof ThrowableObject;
    }
}