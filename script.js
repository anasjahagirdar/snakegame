const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 400;
canvas.height = 400;

// Snake properties
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = generateFood();
let score = 0;
let speed = 150; // Snake speed (lower is faster)

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    if (checkCollision()) {
        alert("Game Over! Your score: " + score);
        resetGame();
        return;
    }

    moveSnake();
    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();
    }

    drawGame();
    setTimeout(gameLoop, speed);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
}

function changeDirection(event) {
    const key = event.key;
    if (key === "ArrowUp" && direction.y === 0) {
        direction = { x: 0, y: -20 };
    } else if (key === "ArrowDown" && direction.y === 0) {
        direction = { x: 0, y: 20 };
    } else if (key === "ArrowLeft" && direction.x === 0) {
        direction = { x: -20, y: 0 };
    } else if (key === "ArrowRight" && direction.x === 0) {
        direction = { x: 20, y: 0 };
    }
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / 20)) * 20,
        y: Math.floor(Math.random() * (canvas.height / 20)) * 20
    };
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    food = generateFood();
    score = 0;
    gameLoop();
}

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, 20, 20));

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, 20, 20);
}

// Start game
gameLoop();
