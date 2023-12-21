class Level {
    backgroundObjects;
    clouds;
    enemies;
    endboss;
    coins;
    bottles;
    level_end_x = 2800;

    constructor(backgroundObjects, clouds, enemies, endboss, coins, bottles) {
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.enemies = enemies;
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;
    }
}