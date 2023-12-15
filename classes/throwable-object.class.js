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
    sound_throwing = new Audio('./audio/throw.mp3');
    sound_breaking = new Audio('./audio/breaking-glas.mp3');
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
                this.x += this.speedX;
                this.playAnimation(this.IMAGES_ROTATION);
            }, 1000 / 60);
            this.sound_throwing.play();
        } else {
            this.x -= 80;
            setInterval(() => {
                this.x -= this.speedX;
                this.playAnimation(this.IMAGES_ROTATION);
            }, 1000 / 60);
            this.sound_throwing.play();
        }
        
    }
}