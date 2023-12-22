class Bottle1 extends DrawableObject {
    offset = {
        top: 10,
        right: 10,
        bottom: 5,
        left: 15
    };

    /**
     * load first image and define the key values for the draw method for every created bottle
     */
    constructor() {
        super().loadImage('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        this.x = 300 + Math.random() * 2100;
        this.y = 355;
        this.width = 65;
        this.height = 80;
    }

    /**
     * play collecting the bottle audio
     */
    playSound() {
        sounds.bottle_collecting.currentTime = 0;
        sounds.bottle_collecting.play();
    }
}