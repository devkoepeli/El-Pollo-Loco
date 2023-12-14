class DrawableObject {
    x = 120;
    y;
    height;
    width;
    img;
    imageCache = {};

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
}