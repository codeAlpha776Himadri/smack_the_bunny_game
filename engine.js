const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
//controls
const startGameBtn = document.querySelector('.startGame');
const restartGamebtn = document.querySelector('.restartGame');
const pauseGameBtn = document.querySelector('.pauseGame');
//level btns
const easy = document.querySelector('.level-easy');
const intermediate = document.querySelector('.level-intermediate');
const hard = document.querySelector('.level-hard');

const level = document.querySelector('.level');

let lstHole;
//time for which bunny is up / LEVELS  
let minTime;
let maxTime;

let timeUp = false;
let isStart = false; // to control game overriding

let SCORE;

function randomTime(min, max) {  // ------ function to generate random times --------
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    // console.log(holes.length);
    const index = randomTime(0, 5);
    const hole = holes[index];

    if (hole === lstHole) {  // if same hole appears simultaneously break away from func 
        // console.log('same hole encountered!!!');
        return randomHole(holes);
    }
    lstHole = hole;
    return hole;
}


function peekBunny() {
    const time = randomTime(maxTime, minTime);
    const hole = randomHole(holes);
    // console.log(time, hole);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp)
            peekBunny();
    }, time);
}


function startGame() {
    SCORE = 0;
    scoreBoard.textContent = `Score : ${SCORE}`;
    timeUp = false;

    if (isStart === false) // once started again cant ve started
        peekBunny();

    setTimeout(() => timeUp = true, 20000);  // 10 seconds game 

    return;
}


function stopGame() {
    scoreBoard.textContent = `Score : 0`;
    timeUp = true;
    isStart = false;
}

function setLevelEasy() {
    minTime = 600;
    maxTime = 1000;
    level.textContent = 'Level : Easy';
}

function setLevelIntermediate() {
    minTime = 300;
    maxTime = 600;
    level.textContent = 'Level : Intermediate';
}

function setLevelHard() {
    minTime = 200;
    maxTime = 400;
    level.textContent = 'Level : Hard';
}

function spankBunny(e) {
    if (!e.isTrusted)
        return;   // cheated click 
    SCORE++;
    mole = this.parentElement;
    mole.classList.remove('up');
    scoreBoard.textContent = `Score : ${SCORE}`;
}

//event listeners
moles.forEach(mole => mole.addEventListener('click', spankBunny));
startGameBtn.addEventListener('click', startGame);
restartGamebtn.addEventListener('click', stopGame);
easy.addEventListener('click', setLevelEasy);
intermediate.addEventListener('click', setLevelIntermediate);
hard.addEventListener('click', setLevelHard);

