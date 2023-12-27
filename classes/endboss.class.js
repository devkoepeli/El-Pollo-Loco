class Endboss extends MovableObject {
    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'

    ];
    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    offset = {
        top: 50,
        right: 10,
        bottom: 5,
        left: 20
    };
    firstAttack = false;

    /**
     * load all images and assign base values to inherited properties
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);

        this.x = 3000;
        this.y = 50;
        this.width = 275;
        this.height = 400;
        this.speedX = 0.5;

        this.animate();
    }

    /**
     * set all intervals to check for the right animations / movement to be executed
     */
    animate() {
        let walkingAnimation = setInterval(() => this.playWalkingAnimation(), 200);
        let animations = setInterval(() => this.playAnimations(), 100)
        let walkingDirection = setInterval(() => this.moveEndboss(), 1000 / 60);

        this.intervalIDs.push(animations);
        this.intervalIDs.push(walkingAnimation);
        this.intervalIDs.push(walkingDirection);
    }

    /**
     * show standard walking images
     */
    playWalkingAnimation() {
        if (!gameIsPaused && gameHasStarted) {
            if (this.energy == 100) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }

    /**
     * look for the right condition and show accordingly the images
     */
    playAnimations() {
        if (!gameIsPaused && gameHasStarted) {
            if (this.wasAttackedOnce()) this.playAlertAnimation();
            if (this.wasAttackedTwice()) this.playAttackingAnimation();
            if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
            if (this.isDead()) this.killEndboss();
        }
    }

    /**
     * check energy level of endboss;
     * @returns boolean value
     */
    wasAttackedOnce() {
        return this.energy == 80;
    }

    /**
     * show alert images and set firstAttack property to true in order to stop the walking animation until false
     */
    playAlertAnimation() {
        this.firstAttack = true;
        this.playAnimation(this.IMAGES_ALERT);
    }

    /**
     * check energy level of endboss
     * @returns boolean value
     */
    wasAttackedTwice() {
        return this.energy <= 60;
    }

    /**
     * show attacking images and set firstAttack property to false in order to let endboss continue walking again
     */
    playAttackingAnimation() {
        this.firstAttack = false;
        this.playAnimation(this.IMAGES_ATTACKING);
    }

    /**
     * stop endboss, show the death images and end the game
     */
    killEndboss() {
        this.clearIntervals();
        this.playAnimationOnce(this.IMAGES_DEAD, 'victory');
        this.playAudioVictory();
    }

    /**
     * check for the right condition to move character accordingly
     */
    moveEndboss() {
        if (!gameIsPaused && gameHasStarted && !this.firstAttack) {
            if (this.isOnTheRightUnattacked()) this.moveLeft();
            if (this.isOnTheRightAttacked()) this.moveLeftAngry();
            if (this.isOnTheLeftUnattacked()) this.moveRight();
            if (this.isOnTheLeftAttacked()) this.moveRightAngry();
        }
    }

    /**
     * is endboss on the right side of character and has not been attacked yet
     * @returns boolean value
     */
    isOnTheRightUnattacked() {
        return this.energy == 100 && this.x + this.offset.left > world.character.x + world.character.offset.left;
    }

    /**
     * is endboss on the right side of character and has been attacked
     * @returns boolean value
     */
    isOnTheRightAttacked() {
        return this.energy < 100 && this.x + this.offset.left > world.character.x + world.character.offset.left;
    }

    /**
     * is endboss on the left side of character and has not been attacked yet
     * @returns boolean value
     */
    isOnTheLeftUnattacked() {
        return this.energy == 100 && this.x + this.width < world.character.x + world.character.width - world.character.offset.left;
    }

    /**
     * is endboss on the left side of character and has been attacked
     * @returns boolean value
     */
    isOnTheLeftAttacked() {
        return this.energy < 100 && this.x + this.width < world.character.x + world.character.width - world.character.offset.left;
    }

    /**
     * move endboss to the left
     */
    moveLeft() {
        this.otherDirection = false;
        super.moveLeft();
    }

    /**
     * move endboss to the left fast paced
     */
    moveLeftAngry() {
        this.otherDirection = false;
        super.moveLeftAngry();
        this.playAudioAngryChicken();
    }

    /**
     * move endboss to the right and switch direction in order to be drawn mirrored onto the canvas
     */
    moveRight() {
        this.otherDirection = true;
        super.moveRight();
    }

    /**
     * move endboss to the right fast paced and switch direction in order to be drawn mirrored onto the canvas
     */
    moveRightAngry() {
        this.otherDirection = true;
        super.moveRightAngry();
        this.playAudioAngryChicken();
    }

    /**
     * decrease on every bottle hit the endboss energy level and save the last hit time for isHurt() method
     */
    hitEndboss() {
        this.energy -= 20;
        this.lastHit = new Date().getTime();
    }

    /**
     * play game over audio when endboss is dead
     */
    playAudioVictory() {
        sounds.victory.volume = 0.6;
        sounds.victory.play();
    }

    /**
     * play angry chicken audio
     */
    playAudioAngryChicken() {
        sounds.chicken_angry.volume = 0.4;
        sounds.chicken_angry.play();
    }

    /**
     * clear all ongoing intervals of endboss to stop any animation
     */
    clearIntervals() {
        for (const interval of this.intervalIDs) {
            clearInterval(interval);
        }
    }
}