class BottleCounterImage extends DrawableObject {
    /**
     * load first image and define the key values for the draw method
     */
    constructor() {
        super().loadImage('./img/7_statusbars/3_icons/icon_salsa_bottle.png');

        this.x = 150;
        this.y = 65;
        this.width = 60;
        this.height = 60;
    }
}