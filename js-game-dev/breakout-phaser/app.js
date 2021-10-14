var game = new Phaser.Game(480, 320, Phaser.AUTO, null, {
  preload: preload,
  create: create,
  update: update
});

var ball;
var paddle;
var bricks;
var newBricks;
var score = 0;
var scoreText;
var lives = 3;
var livesText;
var killCount = 0;
var lifeLostText;
var playing = false;
var startButton;

var brickInfo = {
  width: 50,
  height: 20,
  count: {
    row: 7,
    col: 3
  },
  offset: {
    top: 50,
    left: 60
  },
  padding: 10
};

function initBricks() {
  bricks = game.add.group();
  for( var c = 0; c < brickInfo.count.col; c++ ) {
    for( var r = 0; r < brickInfo.count.row; r++ ) {
      var brickX = (r * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
      var brickY = (c * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
      newBrick = game.add.sprite(brickX, brickY, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(.5);
      bricks.add(newBrick);
    }
  }
}

function ballLeaveScreen() {
  lives--;
  if (lives === 0) {
    alert('Game Over!');
    location.reload();
  } else {
    livesText.setText('Lives: ' + lives);
    ball.reset(game.world.width * .5, game.world.height - 25);
    paddle.reset(game.world.width * .5, game.world.height - 5);
    lifeLostText.visible = true;
    game.input.onDown.addOnce( function() {
      lifeLostText.visible = false;
      ball.body.velocity.set(150, -150);
    });
  }
}

function ballHitBrick(ball, brick) {
  console.log(brick.scale);
  var killTween = game.add.tween(brick.scale);
  killTween.to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
  killTween.onComplete.addOnce( function() {
    brick.kill();
  });
  killTween.start();
  score += 10;
  scoreText.setText('Points: ' + score);

  // Set victory conditions
  killCount++;
  if (killCount === bricks.children.length) {
    alert('You won the game, congratulations!');
    location.reload();
  }
}

function ballHitPaddle(ball, paddle) {
  ball.animations.play('wobble');
  ball.body.velocity.x = 10 * (ball.x - paddle.x);
}

function startGame() {
  startButton.destroy();
  ball.body.velocity.set(150, -150);
  playing = true;
}

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';
  game.load.image('ball', 'img/ball.png');
  game.load.image('paddle', 'img/paddle.png');
  game.load.image('brick', 'img/brick.png');
  game.load.spritesheet('ball', 'img/wobble.png', 20, 20);
  game.load.spritesheet('button', 'img/button.png', 120, 40);
}

function create() {
  // Enable physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // Add sprites
  ball = game.add.sprite(game.world.width * .5, game.world.height - 25, 'ball');
  ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);
  paddle = game.add.sprite(game.world.width * .5, game.world.height - 5, 'paddle');
  initBricks();

  // Physics config
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  game.physics.enable(paddle, Phaser.Physics.ARCADE);
  game.physics.arcade.checkCollision.down = false;

  // Ball config
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.checkWorldBounds = true;
  ball.events.onOutOfBounds.add(ballLeaveScreen);
  ball.anchor.set(.5);

  // Paddle config
  paddle.anchor.set(.5, 1);
  paddle.body.immovable = true;

  // Text config
  var textStyles = { font: '18px Arial', fill: '#0095DD' };
  scoreText = game.add.text(5, 5, 'Points: ' + score, textStyles);
  livesText = game.add.text(game.world.width - 5, 5, 'Lives: ' + lives, textStyles);
  lifeLostText = game.add.text(game.world.width * .5, game.world.height * .5, 'Life lost, click to continue', textStyles);
  lifeLostText.anchor.set(.5);
  lifeLostText.visible = false;
  livesText.anchor.set(1, 0);

  // Start button config
  startButton = game.add.button(game.world.width * .5, game.world.height * .5, 'button', startGame, this, 1, 0, 2);
  startButton.anchor.set(.5);
}

function update() {
  game.physics.arcade.collide(ball, paddle, ballHitPaddle);
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  if(playing) {
    paddle.x = game.input.x || game.world.width * .5;
  }
}
