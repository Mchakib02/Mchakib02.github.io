const squares = [...document.querySelectorAll('.square-js')];
const startBtnElement = document.querySelector('.start-btn');
const winningMoves = [[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
let xPlacements = [];
let oPlacements = [];


let winner;
let turnPlayer = winner || firstPlayer();


startBtnElement.addEventListener('click',() => {
    startBtnElement.classList.add('remove-element');
    squares.forEach(square => {
        square.classList.add('cursor-pointer');
    });
})


squares.forEach((square,i) => {
    let clicked = false;
    square.addEventListener('click',() => {
        const xHtml =  `<div>
                    <div class="center-pos-absolute x-part x-part-right"></div>
                    <div class="x-part x-part-left center-pos-absolute"></div>
                        </div>`;
        const oHtml =  `<div>
                        <div class="o-move center-pos-absolute"></div>
                        <div class="o-move o-void center-pos-absolute"></div>  
                    </div>`;
        if (!clicked) {
            clicked = true;
            if (turnPlayer === 'x') {
                square.innerHTML = xHtml;
                turnPlayer = 'o';
                square.classList.remove('cursor-pointer');
                xPlacements.push(i);
                xPlacements.sort((a,b) => a-b);
                checkWinningMoves(xPlacements,'x');
            } else {
                square.innerHTML = oHtml;
                turnPlayer = 'x';
                square.classList.remove('cursor-pointer');
                oPlacements.push(i);
                oPlacements.sort((a,b) => a-b);
                checkWinningMoves(oPlacements,'o');
            }
        }
    })
});
function firstPlayer() {
    const randomNum = Math.random();
    if (randomNum <.5) {
        return 'x';
    } else {
        return 'o';
    }
}
console.log()
function checkWinningMoves(movePlacements,currentMove) {
    for (let i = 0; i < winningMoves.length; i++) {
        const winningMove = winningMoves[i];
        // console.log(winningMove)
        // console.log(currentMove)
        // console.log(movePlacements)
        if (checkWinningMoveMade(winningMove,movePlacements)) {
            console.log(true)
            alert(`game over\n${currentMove} wins`)
            break;
        }
    }
}
function checkWinningMoveMade(winningMove,movePlacements) {
    let equalitycounter = [];
    let equalitycheck = [];
    let j;
    for (let i = 0; i < winningMove.length; i++) {
        equalitycheck.push(i);
        for (j = 0; j < movePlacements.length; j++) {
            if (winningMove[i] === movePlacements[j]) {
                equalitycounter.push(i);
            }
        }
        if (!(checkArraysEquality(equalitycounter,equalitycheck) && j >= 3)) {
            return false;
        }
    }
    if (!(checkArraysEquality(equalitycounter,[0,1,2]))) {
        return false;
    }
    return true;
}
function checkArraysEquality(array1,array2) {
    if (array1.length !== array2.length ) {
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
