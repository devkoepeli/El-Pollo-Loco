class Bottle2 extends DrawableObject {
    offset = {
        top: 10,
        right: 0,
        bottom: 5,
        left: 10
    };
    sound = new Audio('./audio/grab-bottle.mp3');

    constructor() {
        super().loadImage('./img/6_salsa_bottle/2_salsa_bottle_on_ground.png');

        this.x = 300 + Math.random() * 2000;
        this.y = 355;
        this.width = 55;
        this.height = 80;
    }

    playSound() {
        this.sound.play();
    }
}