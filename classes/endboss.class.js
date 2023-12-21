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
        right: 0,
        bottom: 5,
        left: 0
    };
    firstAttack = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);

        this.x = 2200;
        this.y = 50;
        this.width = 275;
        this.height = 400;

        this.animate();
    }

    animate() {
        let walkingAnimation = setInterval(() => {
            if (!gameIsPaused && gameHasStarted) {
                if (this.energy == 100) {
                    this.playAnimation(this.IMAGES_WALKING);
                } 
            }
        }, 200);

        let interval100 = setInterval(() => {
            if(!gameIsPaused && gameHasStarted) {
                if (this.energy == 80) {
                    this.firstAttack = true;
                    this.playAnimation(this.IMAGES_ALERT);
                    this.playAudioAngryChicken();
                }
                if (this.energy <= 60) {
                    this.firstAttack = false;
                    this.playAnimation(this.IMAGES_ATTACKING);
                }
                if (this.isHurt()) {
                    this.playAnimation(this.IMAGES_HURT);
                }
                if (this.isDead()) {
                    this.clearIntervals();
                    this.playAnimationOnce(this.IMAGES_DEAD, 'victory');
                    this.playAudioVictory();
                }
            }
        }, 100)

        let moveLeftAnimation = setInterval(() => {
            if (!gameIsPaused && gameHasStarted && !this.firstAttack) {
                if (this.energy == 100) {
                    this.moveLeft();
                } else if (this.energy < 100) {
                    this.moveLeftAngry();
                }
            }
        }, 1000 / 120);

        this.intervalIDs.push(interval100);
        this.intervalIDs.push(walkingAnimation);
        this.intervalIDs.push(moveLeftAnimation);
    }

    hitEndboss() {
        this.energy -= 20;
        this.lastHit = new Date().getTime();
    }

    playAudioVictory() {
        sounds.victory.volume = 0.6;
        sounds.victory.play();
    }

    playAudioAngryChicken() {
        sounds.chicken_angry.volume = 0.4;
        sounds.chicken_angry.play();
    }   

    clearIntervals() {
        for (const interval of this.intervalIDs) {
            clearInterval(interval);
        }
    }
}