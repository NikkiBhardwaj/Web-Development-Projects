const board = document.querySelector(".board");

const blockheight = 30;
const blockwidth = 30;

const startBtn = document.querySelector(".btn-start");

const restartBtn = document.querySelector(".btn-restart");

const modal = document.querySelector(".modal");

const scoreElement = document.getElementById("score");

const highScoreElement = document.getElementById("high-score");

const timerElement = document.getElementById("time");

const rows = Math.floor(board.clientHeight/blockheight);

const cols = Math.floor(board.clientWidth/blockwidth);

const blocks = [];

const snake = [{x:1,y:3},{x:1,y:4},{x:1,y:5}];
let food = {};

let direction = "down";
let score = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreElement.innerText = highScore;
let time = 0;
let intervalId = null;
let timerId = null;

function createBoard(){
for(let row = 0;row< rows;row++)
{
    for(let col=0;col< cols;col++)
    {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}_${col}`] = block;
    }
}
}

createBoard();
food = generateFood();
// Draw Initial Snake
snake.forEach(segment => {
    blocks[`${segment.x}_${segment.y}`].classList.add("fill");
});

function generateFood() {

    let newFood;

    do {

        newFood = {

            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)

        };

    } while (
        snake.some(segment =>
            segment.x === newFood.x &&
            segment.y === newFood.y
        )
    );

    return newFood;

}

function render() {

    let head = null;

    // Draw Food
    blocks[`${food.x}_${food.y}`].classList.add("food");

    // Calculate New Head Position
    if (direction === "left") {

        head = { x: snake[0].x, y: snake[0].y - 1 };

    } else if (direction === "right") {

        head = { x: snake[0].x, y: snake[0].y + 1 };

    } else if (direction === "up") {

        head = { x: snake[0].x - 1, y: snake[0].y };

    } else if (direction === "down") {

        head = { x: snake[0].x + 1, y: snake[0].y };

    }

    // Self Collision
if (
    snake.some(segment =>
        segment.x === head.x &&
        segment.y === head.y
    )
) {

    clearInterval(intervalId);
    clearInterval(timerId);

    modal.style.display = "flex";

    startBtn.style.display = "none";

    restartBtn.style.display = "flex";

    return;

}

    // Wall Collision
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= rows ||
        head.y >= cols
    ) {

        clearInterval(intervalId);
        clearInterval(timerId);

        modal.style.display = "flex";

        startBtn.style.display = "none";

        restartBtn.style.display = "flex";

        return;
    }

    // Remove Old Snake
    snake.forEach(segment => {
        blocks[`${segment.x}_${segment.y}`].classList.remove("fill");
    });

    // Move Snake
    snake.unshift(head);

    // Food Check
    if (head.x === food.x && head.y === food.y) {

        // Increase Score
        score++;

       scoreElement.innerText = score;

         // Update High Score
    if (score > highScore) {

        highScore = score;

        localStorage.setItem("highScore", highScore);

        highScoreElement.innerText = highScore;
    }
        blocks[`${food.x}_${food.y}`].classList.remove("food");

        food = generateFood();

    } else {

        // Remove Tail Only If Food Not Eaten
        snake.pop();

    }

    // Draw Snake
    snake.forEach(segment => {
        blocks[`${segment.x}_${segment.y}`].classList.add("fill");
    });

    // Draw Food
    blocks[`${food.x}_${food.y}`].classList.add("food");

}


// Keyboard Controls
document.addEventListener("keydown", (event) => {

    event.preventDefault();

    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
    else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
    else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
    else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }

});

function startTimer() {

    clearInterval(timerId);

    timerId = setInterval(() => {

        time++;

        timerElement.innerText = time;

    }, 1000);

}

// Start Game
startBtn.addEventListener("click", () => {

    modal.style.display = "none";
    clearInterval(intervalId);

    intervalId = setInterval(() => {
        render();
    }, 300);

     startTimer(); 

});

// Restart Game
function restart() {

    // Stop Previous Game
    clearInterval(intervalId);

    // Reset Snake
    snake.length = 0;

    snake.push(
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    );

    // Reset Direction
    direction = "down";

    // Reset Food
    food = generateFood();

    // Reset Score
    score = 0;
    scoreElement.innerText = score;

    // Reset Timer
    time = 0;
    timerElement.innerText = time;

    // Clear Board
    Object.values(blocks).forEach(block => {
        block.classList.remove("fill");
        block.classList.remove("food");
    });

    // Draw Snake
    snake.forEach(segment => {
        blocks[`${segment.x}_${segment.y}`].classList.add("fill");
    });

    // Draw Food
    blocks[`${food.x}_${food.y}`].classList.add("food");

    // Hide Modal
    modal.style.display = "none";

    restartBtn.style.display = "none";

    startBtn.style.display = "flex";

    // Restart Game Loop
    intervalId = setInterval(render, 300);

     startTimer(); 

}

// Restart Button
restartBtn.addEventListener("click", restart);
