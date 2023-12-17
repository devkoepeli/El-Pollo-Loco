class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    healthStatusbar = new HealthStatusBar();
    bottleCounterImg = new BottleCounterImage();
    coinCounterImg = new CoinCounterImage();
    coinCounter = new Counter(105, 110);
    bottleCounter = new Counter(200, 110);
    throwableObjects = [];
    isThrowing = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.ctx.font = "bold 40px serif";
        this.ctx.fillStyle = '#fff';
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * save all properties from world in character object in seperate world property
     */
    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.createThrowableObjects();
        }, 250);
        setInterval(() => {
            this.chickenHitByBottle();
        }, 100);
    }

    /**
     * create a TO for throwing a bottle and setting a timeout for the next bottle of 500ms
     * Furthermore according to character direction throw bottle in the right direction
     */
    createThrowableObjects() {
        if (this.keyboard.D && this.bottleCounter.counter > 0 && !this.isThrowing) {
            this.isThrowing = true;

            setTimeout(() => {
                this.isThrowing = false
            }, 500);

            let isOtherDirection = this.character.otherDirection;
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 120, isOtherDirection);
            this.throwableObjects.push(bottle);
            this.bottleCounter.counter--;
        }
    }

    checkCollisions() {
        this.checkCollisionEnemies();
        this.increaseCoinCounter();
        this.increaseBottleCounter();
    }

    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy) => {
            // if chicken is jumped on it is dead so therefore no harm to character until removed
            if (!this.character.isAboveGround() && this.character.isColliding(enemy) && enemy.energy) {
                if (this.character.isAlive()) {
                    this.character.hit();
                    this.healthStatusbar.setPercentage(this.character.energy);
                }
            } else if (this.character.isAboveGround && this.character.isColliding(enemy) && enemy.energy) {
                this.isCollidingFromTop(enemy);
                console.log(enemy.isSplicable);
            } else if (!enemy.energy) {
                this.removeChicken(enemy);
            }
        })
    }

    /**
     * after collision was detected this function replaces the chicken image to dead
     * @param {object} enemy - stands for the object with which a collision took place
     */
    isCollidingFromTop(enemy) {
        if (enemy instanceof Chicken) {
            enemy.energy = 0;
            enemy.stopChickenAnimation();
            enemy.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
            enemy.makeChickenSplicable();
        } 
    }

    /**
     * after chicken is dead the object gets removed from the array and therefore from the canvas
     * @param {object} enemy - stands for the object with which a collision took place
     */
    removeChicken(enemy) {
        if (enemy.isSplicable) {
            let iOfEnemy = this.level.enemies.indexOf(enemy);
            this.level.enemies.splice(iOfEnemy, 1);
        }
    }

    /**
     * is character colliding with chicken from the top -> jumping on chicken
     */
    checkCollisionFromTop() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            const enemy = this.level.enemies[i];
            if (enemy instanceof Chicken && this.character.isColliding(enemy)) {
                enemy.energy = 0;
                enemy.stopChickenAnimation();
                enemy.img.src = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
                enemy.makeChickenSplicable();
            }
            if (enemy.isSplicable) {
                let iOfEnemy = this.level.enemies.indexOf(enemy);
                this.level.enemies.splice(iOfEnemy, 1);
            }
        }
        //isCollidingFromTop Fn schreiben, die laufend ausgeführt wird, statt nur eim character.jump();
    }

    chickenHitByBottle() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(bottle)) {
                    let iOfEnemy = this.level.enemies.indexOf(enemy);
                    this.level.enemies.splice(iOfEnemy, 1);
                    console.log('chicken hit');
                }
            })
        })
    }

    increaseCoinCounter() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                let iOfCoin = this.level.coins.indexOf(coin);
                coin.playSound();
                this.level.coins.splice(iOfCoin, 1);
                this.coinCounter.counter++;
            }
        })
    }

    increaseBottleCounter() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                let iOfBottle = this.level.bottles.indexOf(bottle);
                bottle.playSound();
                this.level.bottles.splice(iOfBottle, 1);
                this.bottleCounter.counter++;
            }
        })
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
        this.ctx.fillText(this.coinCounter.counter, this.coinCounter.x, this.coinCounter.y);
        this.ctx.fillText(this.bottleCounter.counter, this.bottleCounter.x, this.coinCounter.y);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(() => {
            self.draw();
        })
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object)
        });
    }

    /**
     * draw image for the current object and mirror canvas image if object is moved to the left
     * @param {string} mo - MovableObject Object
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        // mo is inserted mirrored

        mo.drawObject(this.ctx);
        mo.drawFrame(this.ctx);
        mo.drawFrameWithoutOffset(this.ctx);

        // reset the canvas context to default of saved context before mirroring the context except the mo
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
