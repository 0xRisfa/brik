const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const V = SAT.Vector,
  Circle = SAT.Circle,
  Box = SAT.Box,
  Response = SAT.Response;
let ball = new Circle(new V(240, 280), 10);
let ballVelocity = new V(3, -3);

// Paddle settings
const paddleWidth = 75,
  paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// Brick settings
const defaultBrickWidth = 75,
  brickHeight = 20,
  brickPadding = 10,
  brickOffsetLeft = 30;

// Levels configuration
const levels = [
  {
    // Level 1
    pattern: [[1, 1, 1, 1, 1]],
    offsetTop: 60,
  },
  {
    // Level 2
    pattern: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    offsetTop: 50,
  },
  {
    // Level 3
    pattern: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [1, 1, 1, 1, 1],
    ],
    offsetTop: 50,
  },
  {
    // Level 4
    pattern: [
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
    ],
    offsetTop: 50,
  },
  {
    // Level 5
    pattern: [
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
    ],
    offsetTop: 50,
  },
  {
    // Level 6
    pattern: [
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
    ],
    offsetTop: 50,
  },
  {
    // Level 7
    pattern: [
      [1, 1, 1, 1, 1, 1],
      [0, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1],
    ],
    offsetTop: 40,
  },
  {
    // Level 8
    pattern: [
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
    offsetTop: 50,
  },
  {
    // Level 9
    pattern: [
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0],
    ],
    offsetTop: 40,
  },
  {
    // Level 10
    pattern: [
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
    ],
    offsetTop: 40,
  },
  {
    // Level 11
    pattern: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ],
    offsetTop: 30,
  },
  {
    // Level 12
    pattern: [
      [1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1],
    ],
    offsetTop: 30,
  },
  {
    // Level 13
    pattern: [
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1],
    ],
    offsetTop: 30,
  },
  {
    // Level 14
    pattern: [
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
      [1, 1, 0, 1, 1],
    ],
    offsetTop: 30,
  },
  {
    // Level 15
    pattern: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1],
    ],
    offsetTop: 20,
  },
  {
    // Level 16
    pattern: [
      [1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1],
    ],
    offsetTop: 20,
  },
  {
    // Level 17
    pattern: [
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 1],
    ],
    offsetTop: 20,
  },
  {
    // Level 18
    pattern: [
      [1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1],
      [0, 1, 0, 1, 0, 1, 0],
      [1, 0, 1, 0, 1, 0, 1],
    ],
    offsetTop: 20,
  },
  {
    // Level 19
    pattern: [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    offsetTop: 10,
  },
  {
    // Level 20
    pattern: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1],
    ],
    offsetTop: 10,
  },
];

// Generate a random brick layout
function generateRandomBrickLayout() {
  const rows = Math.floor(Math.random() * 11) + 5; // Random rows med 5 in 15
  const cols = Math.floor(Math.random() * 11) + 5; // Random columns med 5 in 15
  const pattern = [];

  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(Math.random() > 0.5 ? 1 : 0); // postavi bricks randomly
    }
    pattern.push(row);
  }

  return {
    pattern,
    offsetTop: 50, // Default offset
  };
}

// initialize bricks za trenutni level
function initializeBricks() {
  let cols = levelConfig.pattern[0].length;
  brickWidth =
    cols > 5
      ? (canvas.width - 2 * brickOffsetLeft - (cols - 1) * brickPadding) / cols
      : defaultBrickWidth;

  bricks = [];
  for (let r = 0; r < levelConfig.pattern.length; r++) {
    bricks[r] = [];
    for (let c = 0; c < levelConfig.pattern[r].length; c++) {
      if (levelConfig.pattern[r][c] === 1) {
        let x = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let y = r * (brickHeight + brickPadding) + levelConfig.offsetTop;
        bricks[r][c] = new Box(
          new V(x, y),
          brickWidth,
          brickHeight
        ).toPolygon();
      }
    }
  }

  // izračunaj totalBricks (pomembno za random level)
  totalBricks = levelConfig.pattern
    .flat()
    .filter((brick) => brick === 1).length;
}

// nastavljanje levela
let selectedLevel = localStorage.getItem("selectedLevel") || "1";
if (selectedLevel === "∞") {
  levelConfig = generateRandomBrickLayout(); // Generate a random layout for infinite levels
} else {
  selectedLevel = parseInt(selectedLevel, 10);
  levelConfig = levels[selectedLevel - 1] || levels[0];
}

document.getElementById("level").innerText = selectedLevel; // Update level tracker
initializeBricks(); // Initialize bricks for the current level

let score = 0,
  gameRunning = true,
  gamePaused = false,
  gameStarted = false; // Track game started
let rightPressed = false,
  leftPressed = false;

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") rightPressed = true;
  if (e.key === "ArrowLeft") leftPressed = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") rightPressed = false;
  if (e.key === "ArrowLeft") leftPressed = false;
});

// resetting the level with R
document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    gamePaused = true;
    Swal.fire({
      title: "Reset Level",
      text: "Are you sure you want to reset the level?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reset",
    }).then((result) => {
      if (result.isConfirmed) {
        document.location.reload();
      }
    });
  }
});

let animationFrameId = null;

// Game update loop
function update() {
  if (!gameRunning || gamePaused || !gameStarted) return; // Stop updating if paused, game over, or not started

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  collisionDetection();
  ballPaddleCollision();
  ball.pos.x += ballVelocity.x;
  ball.pos.y += ballVelocity.y;

  if (ball.pos.x + ball.r > canvas.width || ball.pos.x - ball.r < 0)
    ballVelocity.x = -ballVelocity.x;
  if (ball.pos.y - ball.r < 0) ballVelocity.y = -ballVelocity.y;
  if (ball.pos.y + ball.r > canvas.height) {
    gameRunning = false;
    Swal.fire({
      title: "Game Over",
      icon: "error",
      confirmButtonText: "Try Again",
    }).then(() => document.location.reload());
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 7;
  if (leftPressed && paddleX > 0) paddleX -= 7;

  animationFrameId = requestAnimationFrame(update); // Store animation frame ID
}

// start the game loop
function startGameLoop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId); // uninitiate the previous loop
  }
  animationFrameId = requestAnimationFrame(update); // Start new loop
}

// Self explanatory
function collisionDetection() {
  for (let c = 0; c < bricks.length; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      let brick = bricks[c][r];
      if (!brick) continue; // Skip if brick is already removed
      let response = new Response();
      if (SAT.testCirclePolygon(ball, brick, response)) {
        bricks[c][r] = null; // Remove brick
        score++;
        document.getElementById("score").innerText = score;

        // Check collision side
        if (Math.abs(response.overlapV.x) > Math.abs(response.overlapV.y)) {
          ballVelocity.x = -ballVelocity.x; // Side collision
        } else {
          ballVelocity.y = -ballVelocity.y; // Top/bottom collision
        }

        // Check if level is finished
        if (score >= totalBricks) {
          // Delay game finish until last brick is destroyed
          setTimeout(() => {
            gameRunning = false;
            if (selectedLevel === "∞") {
              // Infinite level logic
              Swal.fire({
                title: "Victory!",
                text: "You've cleared the infinite level! A new random layout will be generated.",
                icon: "success",
                confirmButtonText: "Continue",
              }).then(() => {
                // Reload the game
                levelConfig = generateRandomBrickLayout();
                initializeBricks();
                score = 0;
                gameRunning = true;
                startGameLoop();
              });
            } else {
              selectedLevel++;
              if (selectedLevel > 20) {
                selectedLevel = "∞"; // neskončni level po levelu 20
              }
              levelConfig =
                selectedLevel === "∞"
                  ? generateRandomBrickLayout()
                  : levels[selectedLevel - 1] || generateRandomBrickLayout();
              localStorage.setItem("selectedLevel", selectedLevel);

              Swal.fire({
                title: "Level Complete!",
                text: `You've completed Level ${
                  selectedLevel - 1
                }. Moving to Level ${selectedLevel}.`,
                icon: "success",
                confirmButtonText: "Continue",
              }).then(() => {
                window.location.reload();
              });
            }

            document.getElementById("level").innerText = selectedLevel; // Update level tracker
          }, 100); //delay 100ms
        }

        return; // Exit the loop
      }
    }
  }
}

// Pause button functionality
const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    gamePaused = false;
    pauseButton.innerText = "Pause";
    startGameLoop();
  } else {
    gamePaused = !gamePaused;
    pauseButton.innerText = gamePaused ? "Resume" : "Pause";

    if (!gamePaused) {
      startGameLoop();
    }
  }
});

// spacebar to pause/resume the game
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    if (!gameStarted) {
      gameStarted = true;
      gamePaused = false;
      pauseButton.innerText = "Pause";
      startGameLoop();
    } else {
      gamePaused = !gamePaused;
      pauseButton.innerText = gamePaused ? "Resume" : "Pause";

      if (!gamePaused) {
        startGameLoop();
      }
    }
  }
});

// Ball and paddle collision detection
function ballPaddleCollision() {
  let paddle = new Box(
    new V(paddleX, canvas.height - paddleHeight),
    paddleWidth,
    paddleHeight
  ).toPolygon();
  let response = new Response();
  if (SAT.testCirclePolygon(ball, paddle, response)) {
    ballVelocity.y = -Math.abs(ballVelocity.y);
    let hitPoint = (ball.pos.x - paddleX) / paddleWidth;
    let angle = ((hitPoint - 0.5) * Math.PI) / 2; // Kot glede na hitPoint

    ballVelocity.x = 4 * Math.sin(angle);
    ballVelocity.y = -4 * Math.cos(angle);

    // konstanta hitrost za diagonalno gibanje
    const speed = 4;
    const magnitude = Math.sqrt(
      ballVelocity.x * ballVelocity.x + ballVelocity.y * ballVelocity.y
    );
    ballVelocity.x = (ballVelocity.x / magnitude) * speed;
    ballVelocity.y = (ballVelocity.y / magnitude) * speed;
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.pos.x, ball.pos.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < bricks.length; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      let brick = bricks[c][r];
      if (brick) {
        ctx.beginPath();
        ctx.rect(brick.pos.x, brick.pos.y, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

// instructions button
document.getElementById("instructionsButton").addEventListener("click", () => {
  const wasPaused = gamePaused; // če je bila pauza, jo shrani
  gamePaused = true;

  Swal.fire({
    title: "How to Play",
    html: `
<p style="color: #000; margin: 20px;">Use the <strong>Arrow Keys</strong> to move the paddle left and right.</p>
<p style="color: #000; margin: 20px;">Break all the bricks to complete the level.</p>
<p style="color: #000; margin: 20px;">Press <strong>R</strong> to reset the level.</p>
<p style="color: #000; margin: 20px;">Click "Select Level" to choose a different level.</p>
`,
    icon: "info",
    confirmButtonText: "Got it!",
    background: "#fff",
  }).then(() => {
    if (!wasPaused) {
      // če ni bila pauza, resume the game
      gamePaused = false;
      startGameLoop(); // Resume the game loop safely
    }
  });
});
