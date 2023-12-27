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
    IMAGES_SLEEPING = [
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png'
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
        right: 30,
        bottom: 10,
        left: 30
    };
    timePassedIdling = 0;

    /**
     * load all images, set base values and call the animation and gravitation methods
     */
    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_IDLING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.y = 135;
        this.width = 160;
        this.height = 300;
        this.speedX = 5;
        this.acceleration = 0.22;

        this.animate();
        this.applyGravitation();
    }

    /**
     * this function calls the methods to start from the beginning the move and animate intervals
     */
    animate() {
        this.moveInterval();
        this.animateInterval();
    }

    /**
     * interval with 60 fps is set to check for the keyboard values for the right movements
     */
    moveInterval() {
        let movingInterval = setInterval(() => {
            if (!gameIsPaused) {
                if (this.canMoveRight())
                    this.moveRight();
                if (this.canMoveLeft())
                    this.moveLeft();
                if (this.isNotWalking())
                    sounds.character_walking.pause();
                if (this.canJump())
                    this.jump();

                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);
        this.intervalIDs.push(movingInterval);
    }

    /**
     * if keyboard property true meaning key is pressed and if character is behind the outermost point
     * @returns boolean value
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * if keyboard property true meaning key is pressed and if character is in front of the outermost point
     * @returns boolean value
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -600;
    }

    /**
     * if keyboard property false meaning keys are not pressed
     * @returns boolean value
     */
    isNotWalking() {
        return !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT;
    }

    /**
     * if keyboard property true meaning key is pressed and if character is on the ground
     * @returns boolean value
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * move character to the right and play audio
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            sounds.character_walking.play();
        }
    }

    /**
     * move character to the left and play audio
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
            sounds.character_walking.play();
        }
    }

    /**
     * let character jump
     */
    jump() {
        super.jump();
        sounds.character_walking.pause();
        sounds.character_jumping.play();
    }

    /**
     * interval to check all 90ms to play the right animation
     */
    animateInterval() {
        let animationInterval = setInterval(() => {
            if (!gameIsPaused) {
                if (this.isHurt()) {
                    this.playHurtAnimation();
                } else if (this.isDead()) {
                    this.killCharacter();
                } else if (this.isAboveGround()) {
                    this.playJumpAnimation();
                } else if (this.canWalk()) {
                    this.playWalkAnimation();
                } else if (!this.isAboveGround()) {
                    this.playIdleAnimation();
                    if (this.isAbsent()) this.playAnimation(this.IMAGES_SLEEPING);
                }
            }
        }, 90);
        this.intervalIDs.push(animationInterval);
    }

    /**
     * show hurt images and set passed idling time to 0
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        sounds.character_hurt.play();
        this.timePassedIdling = 0;
    }

    /**
     * show hurt images, play death audio and stop character animations
     */
    killCharacter() {
        this.playAnimationOnce(this.IMAGES_DEAD, 'defeat');
        this.playAudioDeath();
        this.stopCharacter();
    }

    /**
     * show jump images and set passed idling time to 0
     */
    playJumpAnimation() {
        this.playAnimation(this.IMAGES_JUMPING);
        this.timePassedIdling = 0;
    }

    /**
     * if keyboard property true meaning key is pressed
     * @returns boolean value
     */
    canWalk() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }

    /**
     * show walking images
     */
    playWalkAnimation() {
        this.playAnimation(this.IMAGES_WALKING);
        this.timePassedIdling = 0;
    }

    /**
     * show idling images and increase time passed idling
     */
    playIdleAnimation() {
        this.timePassedIdling += 90;
        this.playAnimation(this.IMAGES_IDLING);
    }

    /**
     * is character not being moved for over 3s and is not throwing a bottle
     * @returns boolean value
     */
    isAbsent() {
        return this.timePassedIdling > 3000 && !this.world.isThrowing;
    }

    /**
     * stop animation and movement of character before stopping completely the game
     */
    stopCharacter() {
        for (const interval of this.intervalIDs) {
            clearInterval(interval);
        }
    }

    /**
     * pause/play the right audio including the game lost audio and set audio properties
     */
    playAudioDeath() {
        sounds.character_walking.pause();
        sounds.character_dying.currentTime = 0;
        sounds.character_dying.play();
        sounds.defeat.volume = 0.5;
        sounds.defeat.play();
    }
}