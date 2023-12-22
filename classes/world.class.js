class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthStatusbar = new HealthStatusBar();
    endbossHealthStatusbar;
    bottleCounterImg = new BottleCounterImage();
    coinCounterImg = new CoinCounterImage();
    coinCounter = new Counter(105, 110);
    bottleCounter = new Counter(200, 110);
    throwableObjects = [];
    isThrowing = false;

    /**
     * based on the canvas a drawing context is created and the draw method is being called
     * @param {HTMLElement} canvas - stands for the canvas element
     * @param {object} keyboard - stands for the keyboard object
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.font = "bold 40px Zabars, serif";
        this.ctx.fillStyle = '#fff';
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.startIntervals();
    }

    /**
     * save all properties from world in character object in seperate world property
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * set interval from the beginning to check for the key functions of the game
     */
    startIntervals() {
        setInterval(() => {
            if (!gameIsPaused) {
                this.checkCollisions();
                this.createThrowableObjects();
                this.createEndbossStatusbar();
            }
        }, 60);
    }

    /**
     * endboss statusbar object is created after character is getting close to endboss
     */
    createEndbossStatusbar() {
        if (!this.endbossHealthStatusbar) {
            if (this.isCharacterNearEndboss()) {
                this.endbossHealthStatusbar = new EndbossHealthStatusbar();
            }
        }
    }

    /**
     * check the distance of character and endboss
     * @returns boolean value
     */
    isCharacterNearEndboss() {
        return this.level.endboss.x - (this.character.x + this.character.width) < 500;
    }

    /**
     * create a TO for throwing a bottle and setting a timeout for the next bottle of 500ms
     * Furthermore according to character direction throw bottle in the right direction
     */
    createThrowableObjects() {
        if (this.keyboard.D && this.bottleCounter.counter > 0 && !this.isThrowing && !gameIsPaused) {
            this.isThrowing = true;

            setTimeout(() => {
                this.isThrowing = false
            }, 750);

            let isOtherDirection = this.character.otherDirection;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 120, isOtherDirection);
            this.throwableObjects.push(bottle);
            this.bottleCounter.counter--;
        }
    }

    /**
     * call all methods related to a collision
     */
    checkCollisions() {
        this.checkCollisionEnemies();
        this.checkCollisionEndboss();
        this.increaseCoinCounter();
        this.increaseBottleCounter();
        this.chickenHitByBottle();
        this.endbossHitByBottle();
    }

    /**
     * checking collision of character with enemies
     * if first statement true, character gets hit
     * if second statement true, chicken gets hit
     */
    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            if (this.canCharacterGetHit(enemy)) {
                if (this.character.isAlive()) {
                    this.character.hit();
                    this.healthStatusbar.setPercentage(this.character.energy);
                }
            } else if (this.canChickenGetHit(enemy)) {
                this.isCollidingFromTop(enemy);
            } else if (!enemy.energy) {
                this.removeChicken(enemy);
            }
        })
    }

    /**
     * true if character is on the ground, colliding and the enemy is alive
     * @param {object} enemy - stands for the object with which a collision took place
     * @returns boolean value
     */
    canCharacterGetHit(enemy) {
        return !this.character.isAboveGround() && this.character.isColliding(enemy) && enemy.energy;
    }

    /**
     * true if character is in the air, colliding and enemy is alive
     * @param {object} enemy - stands for the object with which a collision took place
     * @returns boolean value
     */
    canChickenGetHit(enemy) {
        return this.character.isAboveGround && this.character.speedY <= 2 && this.character.isColliding(enemy) && enemy.energy;
    }

    /**
     * after collision was detected this function replaces the chicken image to dead and the character bounces back
     * @param {object} enemy - stands for the object with which a collision took place
     */
    isCollidingFromTop(enemy) {
        enemy.killChicken();
        this.character.bounceBack();
    }

    /**
     * after chicken is dead and splicable the object gets removed from the array and therefore from the canvas
     * @param {object} enemy - stands for the object with which a collision took place
     */
    removeChicken(enemy) {
        if (enemy.isSplicable) {
            let iOfEnemy = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(iOfEnemy, 1);
        }
    }

    /**
     * look for collision of character with endboss and hit character if its the case
     */
    checkCollisionEndboss() {
        if (this.character.isColliding(this.level.endboss) && this.level.endboss.isAlive()) {
            if (this.character.isAlive()) {
                this.damageCharacter();
            }
        }
    }

    /**
     * damage character and update his health status bar
     */
    damageCharacter() {
        this.character.hit();
        this.healthStatusbar.setPercentage(this.character.energy);
    }

    /**
     * look for collision of endboss with bottle, if true hit endboss and destroy the bottle
     */
    endbossHitByBottle() {
        this.throwableObjects.forEach((bottle) => {
            if (this.level.endboss.isColliding(bottle) && this.level.endboss.isAlive() && bottle.energy) {
                this.damageEndboss();

                bottle.letBottleSplash();
            }
        })
    }

    /**
     * damage endboss and update his health status bar
     */
    damageEndboss() {
        this.level.endboss.hitEndboss();
        this.endbossHealthStatusbar.setPercentage(this.level.endboss.energy);
    }

    /**
     * look for collision of chicken with bottle, if true chicken gets removed from canvas immediately
     */
    chickenHitByBottle() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle) && bottle.energy) {
                    bottle.letBottleSplash();
                    let iOfEnemy = this.level.enemies.indexOf(enemy);
                    this.level.enemies.splice(iOfEnemy, 1);
                }
            })
        })
    }

    /**
     * if coin was collected increase the coin counter by 1
     */
    increaseCoinCounter() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.removeCoin(coin);
                this.coinCounter.counter++;
            }
        })
    }

    /**
     * remove the coin from its array and therefore from the canvas
     * @param {object} coin - stands for the object with which collision took place
     */
    removeCoin(coin) {
        let iOfCoin = this.level.coins.indexOf(coin);
        coin.playSound();
        this.level.coins.splice(iOfCoin, 1);
    }

    /**
     * if bottle was collected increase the bottle counter by 1
     */
    increaseBottleCounter() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.removeBottle(bottle);
                this.bottleCounter.counter++;
            }
        })
    }

    /**
     * remove the bottle from its array and therefore from the canvas
     * @param {object} bottle - stands for the object with which collision took place
     */
    removeBottle(bottle) {
        let iOfBottle = this.level.bottles.indexOf(bottle);
        bottle.playSound();
        this.level.bottles.splice(iOfBottle, 1);
    }

    /**
     * draw the images onto the canvas, gets called as much as the fps of the screen
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        // -------- space for fixed objects --------
        this.addToMap(this.healthStatusbar);
        this.addToMap(this.bottleCounterImg);
        this.addToMap(this.coinCounterImg);
        if (this.endbossHealthStatusbar) {
            this.addToMap(this.endbossHealthStatusbar);
        }
        this.ctx.fillText(this.coinCounter.counter, this.coinCounter.x, this.coinCounter.y);
        this.ctx.fillText(this.bottleCounter.counter, this.bottleCounter.x, this.coinCounter.y);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        })
    }

    /**
     * method to iterate through the arraya in order to pass the objects to addToMap()
     * @param {array} objects - includes objects
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        });
    }

    /**
     * draw image for the current object and mirror its image if object is moved to its opposed direction (true)
     * @param {string} mo - MovableObject Object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.drawObject(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * object gets flipped facing the other direcion through mirroring the canvas drawing context
     * @param {object} mo - stands for the movable object
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * reset the canvas context to default of saved context before mirroring the context from flipImage() 
     * @param {object} mo - stands for the movable object
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
