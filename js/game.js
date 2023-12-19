let canvas;
let world;
let keyboard = new Keyboard();


document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp)


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


function startGame() {
    const startScreen = document.getElementById('start-screen');
    const canvas = document.getElementById('canvas-container');

    startScreen.classList.add('d-none');
    canvas.classList.remove('d-none');

    initGame();
}


function initGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


function showPopup(section) {
    const controlDiv = document.getElementById('control-container');
    const introductionDiv = document.getElementById('introduction-container');

    if (section === 'control') {
        controlDiv.innerHTML += controlOverviewHTML();
    } else if (section === 'introduction') {
        introductionDiv.innerHTML += introductionHTML();
    }
}


function closePopUp(section) {
    if (section === 'control') {
        document.getElementById('control-overview').remove();
    } else if (section === 'introduction') {
        document.getElementById('introduction').remove();
    }
}


function changeIcon(icon) {
    const pauseIcon = document.getElementById('pause-icon');
    const playIcon = document.getElementById('play-icon');
    const muteIcon = document.getElementById('mute-icon');
    const unmuteIcon = document.getElementById('unmute-icon');

    if (icon === 'pause' && pauseIcon) {
        pauseIcon.src = './img/11_icons/play.svg';
        pauseIcon.id = 'play-icon';
    } else if (icon === 'pause' && playIcon) {
        playIcon.src = './img/11_icons/pause.svg';
        playIcon.id = 'pause-icon';
    } else if (icon === 'mute' && muteIcon) {
        muteIcon.src = './img/11_icons/unmute.svg';
        muteIcon.id = 'unmute-icon';
    } else if (icon === 'mute' && unmuteIcon) {
        unmuteIcon.src = './img/11_icons/mute.svg';
        unmuteIcon.id = 'mute-icon';
    }
}