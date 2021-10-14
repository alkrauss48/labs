var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score = 0;
var scoreIncrement = 10;

var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;

var dx = 2;
var dy = -2;

var ballColor = 0;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleDx = 7;
var speedRateIncrease = 1.2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var lives = 3;

var bricks = [];
for(var c=0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1};
  }
}

function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true;
  }
  else if(event.keyCode == 37) {
    leftPressed = true;
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = false;
  }
  else if(event.keyCode == 37) {
    leftPressed = false;
  }
}

function mouseMoveHandler(event) {
  var relativeX = event.clientX - canvas.offsetLeft;
  if(relativeX > (paddleWidth / 2) && relativeX < canvas.width - (paddleWidth / 2)) {
    paddleX = relativeX - (paddleWidth / 2);
  }
}

function collisionDetection() {
  for(c=0; c<brickColumnCount; c++) {
    for(r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status === 1 && x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
        dy = -dy;
        bricks[c][r].status = 0;
        score += scoreIncrement;
        if (score === (scoreIncrement * brickColumnCount * brickRowCount)) {
          alert("YOU WIN, CONGRATULATIONS!");
          document.location.reload();
        }
      }
    }
  }
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

function drawBricks() {
  var brickX;
  var brickY;

  for(var c = 0; c < bricks.length; c++) {
    for(var r = 0; r < bricks[c].length; r++) {
      if (bricks[c][r].status === 1) {
        brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall(changeColor) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);

  if( ballColor === 360 ) {
    ballColor = 0;
  }

  ctx.fillStyle = "hsl(" + ballColor++ + ", 100%, 50%)";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection()
  drawScore();
  drawLives();

  if( x + dx > canvas.width - ballRadius || x + dx < ballRadius ) {
    dx = -dx;
  }

  if(y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - paddleHeight && x + dx > paddleX && x + dx < paddleX + paddleWidth) {
    // Speed it up when the paddle is hit
    dy = speedRateIncrease * -dy;
    dx = speedRateIncrease * dx;
  } else if (y + dy > canvas.height - ballRadius) {
    lives--;
    if(lives === 0) {
      // alert('GAME OVER');
      document.location.reload();
    } else {
      x = canvas.width / 2;
      y = canvas.width / 2;
      dx = 2;
      dy = -2;
    }
  }

  if(rightPressed && (paddleX + paddleWidth) < canvas.width) {
    paddleX += paddleDx;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= paddleDx;
  }

  x += dx;
  y += dy;

  requestAnimationFrame(draw);
}

draw();
