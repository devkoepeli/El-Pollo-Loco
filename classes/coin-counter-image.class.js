class CoinCounterImage extends DrawableObject {
    /**
     * load image for canvas and assign all key values to inherited properties
     */
    constructor() {
        super().loadImage('./img/7_statusbars/3_icons/icon_coin.png');

        this.x = 50;
        this.y = 67;
        this.width = 55;
        this.height = 55;
    }
}