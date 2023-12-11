class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    /**
     * save all properties from world in character object in seperate world property
     */
    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        });
    }
    
    /**
     * draw image for the current object and mirror canvas image if object is moved to the left
     * @param {string} mo - MovableObject Object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        // mo is inserted mirrored
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        // reset the canvas context to default of saved context before mirroring the context except the mo
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}
