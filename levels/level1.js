let level1;

/**
 * initialize level1 variable to create all objects only after game has been started
 */
function initLevel() {
    level1 = new Level(
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
            new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 2157),
            new BackgroundObject('./img/5_background/layers/air.png', 2876),
            new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 2876),
            new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 2876),
            new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 2876)
        ],
        [
            new Cloud('./img/5_background/layers/4_clouds/1.png', 400),
            new Cloud('./img/5_background/layers/4_clouds/2.png', 1200),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 2000),
            new Cloud('./img/5_background/layers/4_clouds/1.png', 2800)
        ],
        [
            new Chicken(380),
            new SmallChicken(500),
            new Chicken(630),
            new SmallChicken(700),
            new Chicken(950),
            new Chicken(1140),
            new Chicken(1300),
            new SmallChicken(1450),
            new Chicken(1800)
        ],
        new Endboss(),
        [
            new Coin(),
            new Coin(),
            new Coin(),
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
            new Bottle2(),
            new Bottle1(),
            new Bottle2(),
            new Bottle1(),
            new Bottle2(),
            new Bottle1(),
            new Bottle2(),
        ]
    );
}