class Coin extends DrawableObject {
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
        super().loadImage(this.IMAGES_COIN[1]);

        this.x = 200 + Math.random() * 2000;
        this.y = 180 + Math.random() * 175;
        this.width = 100;
        this.height = 100;
    }

    playSound() {
        sounds.coin_collecting.volume = 0.3;
        sounds.coin_collecting.play();
    }
}