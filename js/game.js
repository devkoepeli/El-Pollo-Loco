let canvas;
let world;
let keyboard = new Keyboard();
let sounds = {
    gameMusic: new Audio('./audio/theme-sound.mp3'),
    victory: new Audio('./audio/victory.mp3'),
    defeat: new Audio('./audio/defeat.mp3'),
    character_walking: new Audio('./audio/running.mp3'),
    character_jumping: new Audio('./audio/jumping.mp3'),
    character_hurt: new Audio('./audio/hurt.mp3'),
    character_dying: new Audio('./audio/dying.mp3'),
    character_bounce: new Audio('./audio/boing.mp3'),
    coin_collecting: new Audio('./audio/coin.mp3'),
    bottle_throwing: new Audio('./audio/throw.mp3'),
    bottle_breaking: new Audio('./audio/breaking-glas.mp3'),
    bottle_collecting: new Audio('./audio/grab-bottle.mp3'),
    chicken_angry: new Audio('./audio/chicken-angry.mp3')
};
let gameIsPaused = false;
let gameHasStarted = false;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
document.addEventListener('DOMContentLoaded', initLevel);

/**
 * This function detects the key code, if equal to one of the values - keyboard property is set to true
 * @param {object} e - the keydown event object is passed
 */
function keyDown(e) {
    if (e.code === 'ArrowRight') {
        keyboard.RIGHT = true;
    }
    if (e.code === 'ArrowLeft') {
        keyboard.LEFT = true;
    }
    if (e.code === 'ArrowUp') {
        keyboard.UP = true;
    }
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = true;
    }
    if (e.code === 'Space') {
        keyboard.SPACE = true;
    }
    if (e.code === 'KeyD') {
        keyboard.D = true;
    }
}

/**
 * this function checks for equality in the released key - if true keyboard property is set to false
 * @param {object} e - the keydown event object is passed 
 */
function keyUp(e) {
    if (e.code === 'ArrowRight') {
        keyboard.RIGHT = false;
    }
    if (e.code === 'ArrowLeft') {
        keyboard.LEFT = false;
    }
    if (e.code === 'ArrowUp') {
        keyboard.UP = false;
    }
    if (e.code === 'ArrowDown') {
        keyboard.DOWN = false;
    }
    if (e.code === 'Space') {
        keyboard.SPACE = false;
    }
    if (e.code === 'KeyD') {
        keyboard.D = false;
    }
}

/**
 * this function initializes the touch events on the control buttons for the mobile layout
 * and sets the keyboard property to true/false depending on the touch event
 */
function bindBtsTouchEvents() {
    document.getElementById('btn-left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btn-left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById('btn-right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btn-right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById('btn-jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btn-jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById('btn-throw').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });

    document.getElementById('btn-throw').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
}

/**
 * show the canvas and initialize the game
 */
function startGame() {
    const startScreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas-container');

    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');

    initGame();
    bindBtsTouchEvents();
}

/**
 * remove the end screen and restart the game
 * @param {string} result - stands for either 'victory' or 'defeat'
 */
function restartGame(result) {
    if (result) {
        document.getElementById('end-screen').classList.add('d-none');
        document.getElementById(`${result}`).remove();
    }
    checkPauseIcon();
    gameHasStarted = false;
    stopGame();
    pauseAllAudio();
    initLevel();
    initGame();
}

/**
 * initialise the game by creating the world object
 */
function initGame() {
    gameHasStarted = true;
    gameIsPaused = false;
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    sounds.gameMusic.volume = 0.3;
    sounds.gameMusic.loop = true;
    sounds.gameMusic.play();
}

/**
 * show the right popup according to the clicked element
 * @param {string} section - stands for either 'control' or 'introduction'
 */
function showPopup(section) {
    const controlDiv = document.getElementById('control-container');
    const introductionDiv = document.getElementById('introduction-container');

    if (section === 'control' && !document.getElementById('control-overview')) {
        controlDiv.innerHTML += controlOverviewHTML();
    } else if (section === 'introduction') {
        introductionDiv.innerHTML += introductionHTML();
    }
}

/**
 * close the right popup according to the clicked element
 * @param {string} section - stands for either 'control' or 'introduction'
 */
function closePopUp(section) {
    if (section === 'control') {
        document.getElementById('control-overview').remove();
    } else if (section === 'introduction') {
        document.getElementById('introduction').remove();
    }
}

/**
 * change the icon to its counterpart
 * @param {string} icon - stands for the clicked icon
 */
function changeIcon(icon) {
    const pauseIcon = document.getElementById('pause-icon');
    const playIcon = document.getElementById('play-icon');
    const muteIcon = document.getElementById('mute-icon');
    const unmuteIcon = document.getElementById('unmute-icon');

    if (icon === 'pause' && pauseIcon) {
        pauseIcon.src = './img/11_icons/play.svg';
        pauseIcon.id = 'play-icon';
    } else if (icon === 'play' && playIcon) {
        playIcon.src = './img/11_icons/pause.svg';
        playIcon.id = 'pause-icon';
    } else if (icon === 'mute' && muteIcon) {
        muteIcon.src = './img/11_icons/unmute.svg';
        muteIcon.id = 'unmute-icon';
        handleMusic('play');
    } else if (icon === 'mute' && unmuteIcon) {
        unmuteIcon.src = './img/11_icons/mute.svg';
        unmuteIcon.id = 'mute-icon';
        handleMusic('pause');
    }
}

/**
 * if game gets restarted pause icon should always be displayed from the start
 */
function checkPauseIcon() {
    const playIcon = document.getElementById('play-icon');

    if (playIcon) {
        playIcon.src = './img/11_icons/pause.svg';
        playIcon.id = 'pause-icon';
    }
}

/**
 * mute/unmute all the sounds if button is clicked 
 * @param {string} action - stands for either 'play' or 'pause'
 */
function handleMusic(action) {
    if (action === 'play') {
        for (let audio in sounds) {
            sounds[audio].muted = false;
        }
    } else if (action === 'pause') {
        for (let audio in sounds) {
            sounds[audio].muted = true;
        }
    }
}

/**
 * pause all sound effects from the objects except the core music when game is finished
 */
function pauseAllAudio() {
    for (let audio in sounds) {
        if (audio != 'gameMusic' && audio != 'victory' && audio != 'defeat') {
            sounds[audio].pause();
        }
    }
}

/**
 * toggle between fullscreen
 */
function toggleFullscreen() {
    let gameContainer = document.getElementById('game-container');
  
    if (!document.fullscreenElement) {
        gameContainer.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
}

/**
 * pause the game onclick through setting gameIsPaused variable to true to stop all ongoing object intervals from executing
 */
function togglePause() {
    if (document.getElementById('pause-icon')) {
        gameIsPaused = true;
        changeIcon('pause');
    } else {
        gameIsPaused = false;
        changeIcon('play');
    }
}

/**
 * clear all intervals - intervals return a unique id with which one can access the specific interval
 * e.g. animationInterval has the ID 10
 */
function stopGame() {
    for (let i = 0; i < 1000; i++) {
        window.clearInterval(i);
    }
}

/**
 * when game is finished show the right endscreen depending on the outcome of the game
 * @param {string} result - stands for either 'victory' or 'defeat'
 */
async function gameOver(result) {
    const endScreen = document.getElementById('end-screen');
    const resultContainer = document.getElementById(`${result}`);
    endScreen.classList.remove('d-none');

    if (!resultContainer) {
        const htmlContent = result === 'victory' ? victoryHTML() : defeatHTML();
        endScreen.innerHTML += htmlContent;

        this.showEndScreen(result);
    }
}

/**
 * depending on the outcome of the game the html elements are being animated seqentiually
 * @param {string} result - stands for either 'victory' or 'defeat'
 */
function showEndScreen(result) {
    new Promise(resolve => setTimeout(() => {
        document.getElementById(`${result}-img`).classList.add('op-1');
        resolve();
    }, 200));
    new Promise(resolve => setTimeout(() => {
        document.getElementById(`${result}-img`).classList.remove('op-1');
        resolve();
    }, 3000));
    new Promise(resolve => setTimeout(() => {
        document.getElementById(`${result}-btn`).classList.add('op-1');
        resolve();
    }, 3000));
}