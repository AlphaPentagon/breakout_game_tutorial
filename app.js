const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

const ballRadius = 10;

// ball speed/direction
let defaultSpeed = 3;
let defaultAngle = Math.floor(Math.random() * 7 - 3);
let speedIncrease = 0.5;
let dx = defaultAngle;
let dy = -defaultSpeed;

const paddleHeight = 10;
const paddleWidth = 75;
const paddleSpeed = 5;
let paddleX = (canvas.width - paddleWidth) / 2; // starting position of the paddle

let rightPressed = false;
let leftPressed = false;

// bricks object
const bricksObj = {
  brickRowCount: 3,
  brickColumnCount: 5,
  brickWidth: 75,
  brickHeight: 20,
  brickPadding: 10,
  brickOffsetTop: 30,
  brickOffsetLeft: 30,
};

let score = 0;
let playerLives = 3;
let bricksDestroyed = 0;
let totalBricks = bricksObj.brickRowCount * bricksObj.brickColumnCount;

// bricks array
const bricksArr = [];
for (let col = 0; col < bricksObj.brickColumnCount; col++) {
  bricksArr[col] = [];
  for (let row = 0; row < bricksObj.brickRowCount; row++) {
    bricksArr[col][row] = { x: 0, y: 0, status: 1 };
  }
}

const randomNumber = () => {
  return Math.floor(Math.random() * 256);
};

let randomColour = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;

const drawBall = () => {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = randomColour;
  ctx.fill();
  ctx.closePath();
};

const drawPaddle = () => {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

const drawBricks = () => {
  for (let col = 0; col < bricksObj.brickColumnCount; col++) {
    for (let row = 0; row < bricksObj.brickRowCount; row++) {
      if (bricksArr[col][row].status === 1) {
        const brickX =
          col * (bricksObj.brickWidth + bricksObj.brickPadding) +
          bricksObj.brickOffsetLeft;
        const brickY =
          row * (bricksObj.brickHeight + bricksObj.brickPadding) +
          bricksObj.brickOffsetTop;
        bricksArr[col][row].x = brickX;
        bricksArr[col][row].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, bricksObj.brickWidth, bricksObj.brickHeight);
        ctx.fill();
        ctx.closePath();
      }
    }
  }
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  x += dx;
  y += dy;

  // simple wall collision detection

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    randomColour = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
    dx = -dx;
  }

  if (y + dy < ballRadius) {
    randomColour = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      randomColour = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
      if (dy > 0) {
        dy = -dy - speedIncrease;
      } else {
        dy = -dy + speedIncrease;
      }
    } else {
      playerLives--;
      if (score - 10 > 0) {
        score -= 10;
      } else {
        score = 0;
      }
      if (!playerLives) {
        alert(`GAME OVER. YOU SCORED ${score} POINTS. BETTER LUCK NEXT TIME.`);
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = defaultAngle;
        dy = -defaultSpeed;
        paddleX = canvas.width - paddleWidth / 2;
      }
    }
  }
  if (rightPressed) {
    paddleX = Math.min(paddleX + paddleSpeed, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - paddleSpeed, 0);
  }
  requestAnimationFrame(draw);
};

const keyDownHandler = (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
};

const keyUpHandler = (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
};

const mouseMoveHandler = (e) => {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (
    relativeX > 0 + paddleWidth / 2 &&
    relativeX < canvas.width - paddleWidth / 2
  ) {
    paddleX = relativeX - paddleWidth / 2;
  }
};

const collisionDetection = () => {
  for (let col = 0; col < bricksObj.brickColumnCount; col++) {
    for (let row = 0; row < bricksObj.brickRowCount; row++) {
      const b = bricksArr[col][row];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + bricksObj.brickWidth &&
          y > b.y &&
          y < b.y + bricksObj.brickHeight
        ) {
          dy = -dy;
          randomColour = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
          b.status = 0;
          bricksDestroyed++;
          if (bricksDestroyed <= 5) {
            score += 1;
          } else if (bricksDestroyed > 5 && bricksDestroyed <= 10) {
            score += 2;
          } else {
            score += 3;
          }
          if (bricksDestroyed === totalBricks) {
            alert(`YOU WIN, CONGRATULATIONS! YOU SCORED ${score} POINTS!`);
            document.location.reload();
          }
        }
      }
    }
  }
};

const drawScore = () => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Score: ${score}`, 8, 20);
};

const drawLives = () => {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText(`Lives: ${playerLives}`, canvas.width - 65, 20);
};

// listening for key presses and releases

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

draw();
