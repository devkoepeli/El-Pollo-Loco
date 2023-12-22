/**
 * returns the html code for the control overview popup on start screen and during the game
 * @returns string with html
 */
function controlOverviewHTML() {
    return /*html*/ `
        <div id="control-overview" class="control-overview">
        <svg onclick="closePopUp('control')" class="close-icon" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
        </svg>
            <h2 class="control-heading">Control Overview</h2>
            <div class="control-keys-container">
                <div class="control-keys-left">
                    <div class="control-key">
                        <img class="key-icon" src="./img/10_keys/key-right.png" alt="Key Arrow Right">
                        <span class="key-info">Move Right</span>
                    </div>
                    <div class="control-key">
                        <img class="key-icon" src="./img/10_keys/key-left.png" alt="Key Arrow Right">
                        <span class="key-info">Move Left</span>
                    </div>
                </div>
                <div class="control-keys-right">
                    <div class="control-key">
                        <img class="key-icon" src="./img/10_keys/key-d.png" alt="Key Arrow Right">
                        <span class="key-info">Throw Salsa Bottle</span>
                    </div>
                    <div class="control-key">
                        <img class="key-icon-space" src="./img/10_keys/key-space.png" alt="Key Arrow Right">
                        <span class="key-info">Jump</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * returns the html code for the introduction popup on start screen
 * @returns string with html
 */
function introductionHTML() {
    return /*html*/`
        <div id="introduction" class="introduction">
            <svg onclick="closePopUp('introduction')" class="close-icon" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
            </svg>
            <h2 class="introduction-heading">Introduction</h2>
            <p class="introduction-info">
                Welcome to "El Pollo Loco" – an exciting jump and run game where you control the main character, Pepe! Embark on a thrilling journey filled with challenges and flavorful rewards in the heart of the desert.
                <br><br>
                Guide Pepe through the arid landscapes as he jumps, dodges, and explores to collect coins and salsa bottles.
                <br><br>
                At the end of his quest the ultimate showdown awaits! Face off against the End Boss. But fear not, for Pepe wields the power of salsa bottles – his secret weapon against the final challenge.
            </p>
        </div>
    `;
}

/**
 * returns the html code for the game over end screen
 * @returns string with html code
 */
function victoryHTML() {
    return /*html*/`
        <div id="victory" class="victory">
            <img id="victory-img" class="victory-img" src="./img/9_intro_outro_screens/game_over/game over.png" alt="Game Over">
            <div id="victory-btn" class="victory-button-container">
                <button onclick="restartGame('victory')" class="main-button">Play Again</button>
            </div>
        </div>
    `;
}

/**
 * returns the html code for the you lost end screen
 * @returns string with html code
 */
function defeatHTML() {
    return /*html*/`
        <div id="defeat" class="defeat">
            <img id="defeat-img" class="defeat-img" src="img/9_intro_outro_screens/game_over/oh no you lost!.png" alt="You Lost">
            <div id="defeat-btn" class="defeat-button-container">
                <button onclick="restartGame('defeat')" class="main-button">Try Again</button>
            </div>
        </div>
    `;
}