class Coin extends MovableObject {
    IMAGES_COIN = [
        './img/8_coin/coin_1.png',
        './img/8_coin/coin_2.png'
    ];
    offset = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };

    constructor() {
        super().loadImage(this.IMAGES_COIN[0]);
        this.loadImages(this.IMAGES_COIN);
        //todo loadImages -> setInterval playAnimation()

        this.x = 200 + Math.random() * 2000;
        this.y = 355;
        this.width = 100;
        this.height = 100;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }
}