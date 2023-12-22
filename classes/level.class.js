class Level {
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    coins;
    bottles;
    level_end_x = 2800;

    /**
     * level object gets created with all the level1 objects
     * @param {array} backgroundObjects - including background objects
     * @param {array} clouds - including cloud objects
     * @param {array} enemies - including chicken/small chicken objects
     * @param {object} endboss - endboss object
     * @param {array} coins - including coin objects
     * @param {array} bottles - inlcuding bottle1/bottle2 objects
     */
    constructor(backgroundObjects, clouds, enemies, endboss, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;
    }
}