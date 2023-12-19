class ThrowableObject extends MovableObject {
    offset = {
        top: 10,
        right: 0,
        bottom: 5,
        left: 10
    };
    IMAGES_ROTATION = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    otherDirection;

    constructor(characterX, characterY, isOtherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);

        this.x = characterX;
        this.y = characterY;
        this.width = 55;
        this.height = 80;
        this.otherDirection = isOtherDirection;

        this.throw();
    }

    throw() {
        this.applyGravitation()
        this.speedY = 9;
        this.speedX = 10;
        
        if (!this.otherDirection) {
            setInterval(() => {
                // limit the throw animation to x < 3000
                if (this.x < 3000) {
                    this.x += this.speedX;
                    this.playAnimation(this.IMAGES_ROTATION);
                }
            }, 1000 / 60);
            this.playSound();
        } else {
            this.x -= 80;
            setInterval(() => {
                if (this.x > -2000) {
                    this.x -= this.speedX;
                    this.playAnimation(this.IMAGES_ROTATION);
                }
            }, 1000 / 60);
            this.playSound();
        }
    }

    playSound() {
        sounds.bottle_throwing.volume = 0.8;
        sounds.bottle_throwing.currentTime = 0;
        sounds.bottle_throwing.play();
    }
}