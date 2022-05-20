console.log('Welcome to TIC TAC TOE');

const turnSound = new Audio('OX.mp3');
const WinSound = new Audio('Win.mp3');
const gameDrawSound = new Audio('gameDraw.mp3');
let turn = 'X';
let isGameOver = false;

//Function to change the turn
const changeTurn = ()=> {
    return turn==='X'?'O':'X';
}

//Function to check for a Win
const checkWin = ()=> {
    const boxTexts = document.querySelectorAll('.boxText');
    const wins = [
        [0, 1, 2],
        [3, 4 ,5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(win =>{
        if(isGameOver === false && (boxTexts[win[0]].innerHTML !== '') && (boxTexts[win[0]].innerHTML === boxTexts[win[1]].innerHTML) && (boxTexts[win[0]].innerHTML === boxTexts[win[2]].innerHTML)){
            let gameOverImage = document.querySelector('#gameOverImg');
            gameOverImage.src = 'dancingman.gif';
            isGameOver = true;
            if(boxTexts[win[0]].innerHTML === 'X')document.querySelector('.gameState').innerHTML = "Player 1 Won";
            else document.querySelector('.gameState').innerHTML = "Player 2 Won";
            WinSound.play();
            const line = document.querySelector('.line');
            line.classList.toggle('d-none');
            setTimeout(()=>{
                line.style.width = "25vw";
            }, 100)
            if(win[0]===0 && win[1]===1 && win[2]===2)line.style.transform = "translate(2.5vw, 5vw)";
            else if(win[0]===3 && win[1]===4 && win[2]===5)line.style.transform = "translate(2.5vw, 15vw)";
            else if(win[0]===6 && win[1]===7 && win[2]===8)line.style.transform = "translate(2.5vw, 25vw)";
            else{
                line.style.transformOrigin = "0 0";
                if(win[0]===0 && win[1]===3 && win[2]===6)line.style.transform = "translate(5vw, 2.5vw) rotate(90deg)";
                else if(win[0]===1 && win[1]===4 && win[2]===7)line.style.transform = "translate(15vw, 2.5vw) rotate(90deg)";
                else if(win[0]===2 && win[1]===5 && win[2]===8)line.style.transform = "translate(25vw, 2.5vw) rotate(90deg)";
                else{
                    setTimeout(()=>{
                        line.style.width = "35.3553390593vw";
                    }, 100)
                    if(win[0]===0 && win[1]===4 && win[2]===8)line.style.transform = "translate(2.5vw, 2.5vw) rotate(45deg)";
                    else if(win[0]===2 && win[1]===4 && win[2]===6)line.style.transform = "translate(27.5vw, 2.5vw) rotate(135deg)";
                }
            }
        }
    })
}

//Checking for Game Draw
const gameDraw = () => {
    const boxTexts = document.querySelectorAll('.boxText');
    let isGameDraw = true;
    boxTexts.forEach(boxText => {
        if(boxText.innerHTML === '')isGameDraw = false;
    })
    if(isGameDraw === true){
        isGameOver = true;
        document.querySelector('.gameState').innerHTML = "Game Drew";
        gameDrawSound.play();
        let gameOverImage = document.querySelector('#gameOverImg');
        gameOverImage.src = 'dancingbot.gif';
    }
}

//Checking Game State
const checkGame = box => {
    if(isGameOver === false){
        let boxtext = box.querySelector('.boxText');
        box.addEventListener('click', e=> {
            if(boxtext.innerText === ''){
                boxtext.innerText = turn;
                turn = changeTurn();
                turnSound.play();
                checkWin();
                if(isGameOver === false){
                    gameDraw();
                    if(isGameOver === false){
                        let player = document.querySelector('.playerInfo');
                        if(player.innerHTML === '1')player.innerHTML = '2';
                        else player.innerHTML = '1';
                    }
                }
            }
        })
    }
}

//Game Logic
let boxes = document.querySelectorAll('.box');
Array.from(boxes).forEach(box => {
    if(isGameOver === false)checkGame(box);
})

//Reseting to default
const reset = document.querySelector('#reset');
reset.addEventListener('click', e=> {
    let gameOverImage = document.querySelector('#gameOverImg');
    gameOverImage.src = 'cheering.gif';
    isGameOver = false;
    turn = 'X';
    let boxTexts = document.querySelectorAll('.boxText');
    let gameState = document.querySelector('.gameState');
    boxTexts.forEach(boxText => {
        boxText.innerHTML = '';
    })
    const line = document.querySelector('.line');
    line.classList.add('d-none');
    line.style.width = "0vw";
    gameState.innerHTML = 'Turn for Player <span class="playerInfo">1</span>';
})