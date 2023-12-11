class Character extends MovableObject {
    IMAGES_IDLING = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];
    world;
    sound_walking = new Audio('./audio/running.mp3');

    constructor() {
        // first image needs to be loaded
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);

        this.y = 135;
        this.width = 160;
        this.height = 300;
        this.speed = 1.75;

        this.animate();
    }

    jump() {

    }
    
    animate() {
        setInterval(() => {
            this.sound_walking.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.sound_walking.play();
            }

            if (this.world.keyboard.LEFT && this.x > -600) {
                this.x -= this.speed;
                this.otherDirection = true;
                this.sound_walking.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 120);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 90);
    }

}