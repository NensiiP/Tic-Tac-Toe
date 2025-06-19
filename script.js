let boxes = document.querySelectorAll(".box");
let turnes = document.querySelector(".turn");
let resetBtn = document.querySelector(".reset");
let player1 = document.querySelector(".player1 .value");
let player2 = document.querySelector(".player2 .value");
let ties = document.querySelector(".ties .value");
const celebrationOverlay = document.getElementById("celebration-overlay");
const img = celebrationOverlay.querySelector("img");
let line = document.querySelector(".line");
let music = document.getElementById("music");

let turn0 = true;
let count = 0;

const winPatterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8],];

const resetGame = () => {
    turn0 = true;
    line.style.transform = "scaleX(0)";
    count = 0;
    turnes.innerText = "O - TURN";
    enableBoxes();
};
resetBtn.addEventListener("click", resetGame);

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.style.color="black";
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turnes.innerText = "X - TURN";
            box.style.color = "rgb(0, 240, 183)";
            turn0 = false;
        } else {
            box.innerText = "X";
            turnes.innerText = "O - TURN";
            box.style.color = "aqua";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = chechWinner();

        if (count === 9 && !isWinner) {
            gameTie();
        }
    });
});

const chechWinner = () => {
    for (let i = 0; i < winPatterns.length; i++) {
        let [a, b, c] = winPatterns[i];
        let val1 = boxes[a].innerText;
        let val2 = boxes[b].innerText;
        let val3 = boxes[c].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            showWinner(val1);
            drawWinLine(i); 
            return true;
        }
    }
};

let musicTimeOut;

const showWinner = (winner) => {
    turnes.innerText = `Winner is ${winner}`;
    line.style.transform = "transalte(23vh, 39vw) rotate(90deg)";
    disableBoxes();
    if (winner === "O") {
        player1.innerText = parseInt(player1.innerText) + 1;
    } else if (winner === "X") {
        player2.innerText = parseInt(player2.innerText) + 1;
    }

    showCelebration();

    music.currentTime=0;
    music.play();
    musicTimeOut = setTimeout(() => {
        music.pause();
        music.currentTime = 0;
    }, 2500);
};

const gameTie = () => {
    turnes.innerText = "Game is a Tie"
    ties.innerText = parseInt(ties.innerText) + 1;
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const winTransforms = [
    "translate(-50%, -3300%) rotate(0deg)", // [0, 1, 2] – Top row
    "translate(-88%, -50%) rotate(90deg)",  // [0, 3, 6] – Left column
    "translate(-50%, -50%) rotate(45deg)",  // [0, 4, 8] – Diagonal \
    "translate(-50%, -50%) rotate(90deg)",  // [1, 4, 7] – Middle column
    "translate(-12%, -50%) rotate(90deg)",  // [2, 5, 8] – Right column
    "translate(-50%, -50%) rotate(-45deg)", // [2, 4, 6] – Diagonal /
    "translate(-50%, -50%) rotate(0deg)",   // [3, 4, 5] – Middle row
    "translate(-50%, 3300%) rotate(0deg)",  // [6, 7, 8] – Bottom row
];

const drawWinLine = (patternIndex) => {
    line.style.transform = `${winTransforms[patternIndex]} scaleX(1)`;
};


const showCelebration = () => {

    img.src = "";
    img.src = "./images/congratulations.gif";
    celebrationOverlay.style.display = "flex";
    setTimeout(() => {
        celebrationOverlay.style.display = "none";
    }, 2500);
};
