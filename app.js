const canvas = document.querySelector("#myCanvas");

const ctx = canvas.getContext("2d");

let x = canvas.width / 2;
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

const ballRadius = 10;

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

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  x += dx;
  y += dy;

  // simple wall collision detection

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    randomColour = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
    dx = -dx;
  }

  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    randomColour = `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
    dy = -dy;
  }
};
setInterval(draw, 10);
