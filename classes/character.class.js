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
    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]
    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];
    world;
    offset = {
        top: 100,
        right: 20,
        bottom: 10,
        left: 20
    };
    intervals = [];

    constructor() {
        // first image needs to be loaded
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.y = 135;
        this.width = 160;
        this.height = 300;
        this.speedX = 2;

        this.animate();
        this.applyGravitation();
    }
    
    animate() {
        this.moveInterval();
        this.animateInterval();
    }

    moveInterval() {
        let movingInterval = setInterval(() => {
            if (!gameIsPaused) {
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    sounds.character_walking.play();
                }
    
                if (this.world.keyboard.LEFT && this.x > -600) {
                    this.moveLeft();
                    this.otherDirection = true;
                    sounds.character_walking.play();
                }
    
                if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                    sounds.character_walking.pause();
                }
    
                // console.log('speedY', this.speedY);
                 
                // y-coordinate gets subtracted by 5 then gravitation force has an effect
                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                    sounds.character_jumping.play();
                }
    
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 120);
        this.intervals.push(movingInterval);
    }

    animateInterval() {
        let animationInterval = setInterval(() => { 
            if (!gameIsPaused) {
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                    sounds.character_hurt.play();
                } else if (this.isDead()) {
                    this.playAnimationOnce(this.IMAGES_DEAD);
                    sounds.character_walking.pause();
                    sounds.character_dying.play();
                    this.stopCharacter();
                } else if (this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_JUMPING);
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else if (!this.isAboveGround()) {
                    this.playAnimation(this.IMAGES_IDLING);
                }
            }
        }, 85);
        this.intervals.push(animationInterval);
    }

    /**
     * stop animation and movement of character before stopping completely the game
     */
    stopCharacter() {
        for (const interval of this.intervals) {
            clearInterval(interval);
        }
    }
}