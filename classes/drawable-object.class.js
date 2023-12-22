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

    /**
     * assign the first image to the current object to draw onto the canvas
     * @param {string} path - stands for the src of the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * load the current path into the imageCache JSON to have access for the playAnimation method
     * @param {array} images - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(images) {
        images.forEach(path => {
            let image = new Image();
            image.src = path;
            this.imageCache[path] = image;
        })
    }

    /**
     * the current object gets drawn onto the context of the canvas html element
     * @param {HTMLElement} ctx - context of the canvas HTML element
     */
    drawObject(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}