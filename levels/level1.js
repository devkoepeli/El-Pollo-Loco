let level1;

/**
 * initialize level1 variable to create all objects only after game has been started
 */
function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken()
        ],
        new Endboss(),
        [
            new Cloud()
        ],
        [
            new BackgroundObject('./img/5_background/layers/air.png', -719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('./img/5_background/layers/air.png', 0),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/5_background/layers/air.png', 719),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('./img/5_background/layers/air.png', 1438),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 1438),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 1438),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 1438),
            new BackgroundObject('./img/5_background/layers/air.png', 2157),
            new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 2157),
            new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 2157),
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 2157)
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        [
            new Bottle1(),
            new Bottle2(),
            new Bottle1(),
            new Bottle2(),
            new Bottle1(),
            new Bottle2()
        ]
    );
}