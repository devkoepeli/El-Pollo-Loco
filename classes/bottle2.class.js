class Bottle2 extends DrawableObject {
    offset = {
        top: 10,
        right: 0,
        bottom: 5,
        left: 10
    };

    constructor() {
        super().loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');

        this.x = 300 + Math.random() * 2100;
        this.y = 355;
        this.width = 55;
        this.height = 80;
    }

    playSound() {
        sounds.bottle_collecting.currentTime = 0;
        sounds.bottle_collecting.play();
    }
}