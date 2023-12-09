class Chicken extends MovableObject {
    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 280 + Math.random() * 320;
        this.y = 332;
        this.width = 80;
        this.height = 100;
    }
}