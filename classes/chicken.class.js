class Chicken extends MovableObject {
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    sound_chicken = new Audio('./audio/chicken.mp3');

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 280 + Math.random() * 320;
        this.y = 330;
        this.width = 80;
        this.height = 100;
        this.speedX = 0.1 + Math.random() * 0.3;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 130);

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 120);
    }
}