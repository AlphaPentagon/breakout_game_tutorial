const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

const ballRadius = 10;

// ball speed/direction
let dx = 2;
let dy = -2;

const paddleHeight = 10;
const paddleWidth = 75;
const paddleSpeed = 5;
let paddleX = (canvas.width - paddleWidth) / 2; // starting position of the paddle

let rightPressed = false;
let leftPressed = false;

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

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
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
      if (dy > 0) {
        dy = -dy - 0.3;
      } else {
        dy = -dy + 0.3;
      }
    } else {
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval); // Needed for Chrome to end the game
    }
  }

  if (rightPressed) {
    paddleX = Math.min(paddleX + paddleSpeed, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - paddleSpeed, 0);
  }
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

// listening for key presses and releases

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

const interval = setInterval(draw, 10);
