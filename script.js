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
    pattern: [[1, 2, 3, 2, 1]],
    offsetTop: 60,
  },
  {
    // Level 2
    pattern: [
      [1, 2, 1, 2, 1],
      [2, 3, 2, 3, 2],
    ],
    offsetTop: 50,
  },
  {
    // Level 3
    pattern: [
      [0, 0, 1, 0, 0],
      [0, 2, 3, 2, 0],
      [1, 3, 2, 3, 1],
    ],
    offsetTop: 50,
  },
  {
    // Level 4
    pattern: [
      [1, 0, 2, 0, 3],
      [0, 2, 0, 3, 0],
      [3, 0, 1, 0, 2],
    ],
    offsetTop: 50,
  },
  {
    // Level 5
    pattern: [
      [1, 2, 3, 2, 1],
      [2, 3, 1, 3, 2],
      [3, 1, 2, 1, 3],
    ],
    offsetTop: 50,
  },
  {
    // Level 6
    pattern: [
      [1, 2, 3, 2, 1],
      [0, 2, 3, 2, 0],
      [3, 0, 1, 0, 3],
    ],
    offsetTop: 50,
  },
  {
    // Level 7
    pattern: [
      [1, 2, 3, 2, 3, 1],
      [0, 3, 0, 2, 0, 3],
      [3, 2, 1, 2, 3, 2],
    ],
    offsetTop: 40,
  },
  {
    // Level 8
    pattern: [
      [1, 2, 3, 2, 1],
      [0, 2, 3, 2, 0],
      [0, 0, 1, 0, 0],
    ],
    offsetTop: 50,
  },
  {
    // Level 9
    pattern: [
      [1, 0, 2, 0, 3],
      [0, 3, 0, 2, 0],
      [3, 0, 1, 0, 2],
      [0, 2, 0, 3, 0],
    ],
    offsetTop: 40,
  },
  {
    // Level 10
    pattern: [
      [1, 2, 3, 2, 3, 1],
      [2, 3, 1, 3, 2, 3],
      [3, 1, 2, 1, 3, 1],
    ],
    offsetTop: 40,
  },
  {
    // Level 11
    pattern: [
      [1, 2, 3, 2, 3, 2, 1],
      [2, 3, 1, 3, 2, 3, 2],
    ],
    offsetTop: 30,
  },
  {
    // Level 12
    pattern: [
      [1, 0, 2, 0, 3, 0, 1],
      [0, 2, 0, 3, 0, 2, 0],
      [3, 0, 1, 0, 2, 0, 3],
    ],
    offsetTop: 30,
  },
  {
    // Level 13
    pattern: [
      [1, 0, 2, 0, 3],
      [2, 0, 3, 0, 1],
      [3, 0, 1, 0, 2],
      [1, 0, 2, 0, 3],
    ],
    offsetTop: 30,
  },
  {
    // Level 14
    pattern: [
      [1, 2, 0, 3, 1],
      [2, 3, 0, 1, 2],
      [3, 1, 0, 2, 3],
      [1, 2, 0, 3, 1],
    ],
    offsetTop: 30,
  },
  {
    // Level 15
    pattern: [
      [1, 2, 3, 2, 3, 2, 1],
      [2, 3, 1, 3, 2, 3, 2],
      [3, 1, 2, 1, 3, 1, 3],
      [1, 2, 3, 2, 3, 2, 1],
    ],
    offsetTop: 20,
  },
  {
    // Level 16
    pattern: [
      [1, 0, 2, 0, 3, 0, 1],
      [0, 2, 0, 3, 0, 2, 0],
      [3, 0, 1, 0, 2, 0, 3],
      [0, 2, 0, 3, 0, 2, 0],
      [1, 0, 2, 0, 3, 0, 1],
    ],
    offsetTop: 20,
  },
  {
    // Level 17
    pattern: [
      [1, 2, 3, 2, 3, 2, 1],
      [2, 0, 3, 1, 3, 0, 2],
      [3, 1, 2, 1, 2, 1, 3],
      [1, 0, 3, 2, 3, 0, 1],
    ],
    offsetTop: 20,
  },
  {
    // Level 18
    pattern: [
      [1, 0, 2, 0, 3, 0, 1],
      [0, 2, 0, 3, 0, 2, 0],
      [3, 0, 1, 0, 2, 0, 3],
      [0, 2, 0, 3, 0, 2, 0],
      [1, 0, 2, 0, 3, 0, 1],
    ],
    offsetTop: 20,
  },
  {
    // Level 19
    pattern: [
      [1, 2, 3, 2, 3, 2, 1, 2],
      [2, 3, 1, 3, 2, 3, 2, 3],
      [3, 1, 2, 1, 3, 1, 3, 1],
      [1, 2, 3, 2, 3, 2, 1, 2],
      [2, 3, 1, 3, 2, 3, 2, 3],
    ],
    offsetTop: 10,
  },
  {
    // Level 20
    pattern: [
      [1, 2, 3, 2, 3, 2, 1, 2, 3],
      [2, 0, 3, 0, 3, 0, 2, 0, 3],
      [3, 2, 1, 2, 3, 2, 1, 2, 3],
      [2, 0, 3, 0, 3, 0, 2, 0, 3],
      [1, 2, 3, 2, 3, 2, 1, 2, 3],
    ],
    offsetTop: 10,
  },
];

// initialize bricks za trenutni level
function initializeBricks() {
  let cols = levelConfig.pattern[0].length;
  brickWidth =
    cols > 5
      ? (canvas.width - 2 * brickOffsetLeft - (cols - 1) * brickPadding) / cols
      : defaultBrickWidth;

  bricks = [];
  totalScore = 0; // Initialize total score for the level
  for (let r = 0; r < levelConfig.pattern.length; r++) {
    bricks[r] = [];
    for (let c = 0; c < levelConfig.pattern[r].length; c++) {
      const brickType = levelConfig.pattern[r][c];
      if (brickType > 0) {
        let x = c * (brickWidth + brickPadding) + brickOffsetLeft;
        let y = r * (brickHeight + brickPadding) + levelConfig.offsetTop;
        const brickScore = brickType === 1 ? 1 : brickType === 2 ? 2 : 3;
        bricks[r][c] = {
          polygon: new Box(new V(x, y), brickWidth, brickHeight).toPolygon(),
          type: brickType,
          color:
            brickType === 1
              ? "#0095DD"
              : brickType === 2
              ? "#FF5733"
              : "#FFC300",
          score: brickScore,
        };
        totalScore += brickScore; // Add the brick's score to the total score
      }
    }
  }
}

// nastavljanje levela
let selectedLevel = localStorage.getItem("selectedLevel") || "1";
selectedLevel = parseInt(selectedLevel, 10);
levelConfig = levels[selectedLevel - 1] || levels[0];

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
let lastTime = 0;

// Game update loop
function update(timestamp) {
  if (!gameRunning) return; // Stop if the game is not running

  if (gamePaused || !gameStarted) {
    // If the game is paused or hasn't started, do not update anything
    lastTime = timestamp; // Prevent deltaTime from accumulating
    animationFrameId = requestAnimationFrame(update); // Keep the loop alive
    return;
  }

  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();

  collisionDetection();
  ballPaddleCollision();

  // Update ball position
  ball.pos.x += ballVelocity.x * deltaTime * 60; // 60 FPS
  ball.pos.y += ballVelocity.y * deltaTime * 60;

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

  if (rightPressed && paddleX < canvas.width - paddleWidth)
    paddleX += 7 * deltaTime * 60;
  if (leftPressed && paddleX > 0) paddleX -= 7 * deltaTime * 60;

  animationFrameId = requestAnimationFrame(update);
}

// start the game loop
function startGameLoop() {
  if (!gameStarted) return; // Do not start the loop if the game hasn't started

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId); // Cancel any existing loop
  }
  lastTime = performance.now(); // Reset lastTime to prevent deltaTime jumps
  animationFrameId = requestAnimationFrame(update); // Start the new loop
}

function resetGame() {
  ball.pos = new V(240, 280); // Reset ball to initial position
  updateBallSpeed(); // Reset ball speed based on difficulty
  paddleX = (canvas.width - paddleWidth) / 2; // Reset paddle position
  score = 0; // Reset score
  document.getElementById("score").innerText = score; // Update score display
  initializeBricks(); // Reinitialize bricks
}

// Self explanatory
function collisionDetection() {
  for (let c = 0; c < bricks.length; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      let brick = bricks[c][r];
      if (!brick) continue; // Skip if brick is already removed
      let response = new Response();
      if (SAT.testCirclePolygon(ball, brick.polygon, response)) {
        bricks[c][r] = null; // Remove brick
        score += brick.score; // Add score based on brick type
        document.getElementById("score").innerText = score;

        // Check collision side
        if (Math.abs(response.overlapV.x) > Math.abs(response.overlapV.y)) {
          ballVelocity.x = -ballVelocity.x; // Side collision
        } else {
          ballVelocity.y = -ballVelocity.y; // Top/bottom collision
        }

        updateHighScore(); // Save the high score

        // Check if level is finished
        if (score >= totalScore) {
          setTimeout(() => {
            gameRunning = false;
            selectedLevel++;
            if (selectedLevel > levels.length) {
              selectedLevel = 1; // Reset to level 1 after last level
              Swal.fire({
                title: "Good Job!",
                text: "You've completed all levels! Starting over from Level 1.",
                icon: "success",
                confirmButtonText: "Continue",
              }).then(() => {
                localStorage.setItem("selectedLevel", selectedLevel);
                levelConfig = levels[selectedLevel - 1];
                document.getElementById("level").innerText = selectedLevel; // Update level tracker
                window.location.reload();
              });
            } else {
              levelConfig = levels[selectedLevel - 1];
              localStorage.setItem("selectedLevel", selectedLevel);

              Swal.fire({
                title: "Level Complete!",
                text: `You've completed Level ${
                  selectedLevel - 1
                }. Moving to Level ${selectedLevel}.`,
                icon: "success",
                confirmButtonText: "Continue",
              }).then(() => {
                document.getElementById("level").innerText = selectedLevel; // Update level tracker
                window.location.reload();
              });
            }
          }, 100); // Delay 100ms
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
      lastTime = performance.now(); // Reset lastTime to prevent deltaTime jumps
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
        lastTime = performance.now(); // Reset lastTime to prevent deltaTime jumps
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
    ballVelocity.y = -Math.abs(ballVelocity.y); // Ensure the ball bounces upward
    let hitPoint = (ball.pos.x - paddleX) / paddleWidth;
    let angle = ((hitPoint - 0.5) * Math.PI) / 2; // Calculate angle based on hit point

    ballVelocity.x = Math.sin(angle); // Adjust x velocity based on angle
    ballVelocity.y = -Math.cos(angle); // Adjust y velocity based on angle

    updateBallSpeed(); // Reapply the difficulty-based speed
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
        ctx.rect(
          brick.polygon.pos.x,
          brick.polygon.pos.y,
          brickWidth,
          brickHeight
        );
        ctx.fillStyle = brick.color;
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

function updateHighScore() {
  const percentage = Math.floor((score / totalScore) * 100); // Calculate score percentage
  const levelKey = `level${selectedLevel}HighScore`;
  const currentHighScore = parseInt(localStorage.getItem(levelKey), 10) || 0; // Ensure it's a number

  if (percentage > currentHighScore) {
    localStorage.setItem(levelKey, percentage); // Update high score if the new score is higher
  }
}

// Difficulty settings
let difficulty = "Norm"; // Default difficulty
const difficultyButton = document.getElementById("difficultyButton");

// Function to update ball speed based on difficulty
function updateBallSpeed() {
  const speed = difficulty === "Easy" ? 2 : difficulty === "Norm" ? 3 : 5; // Set speed based on difficulty
  const magnitude = Math.sqrt(ballVelocity.x ** 2 + ballVelocity.y ** 2); // Calculate current speed
  ballVelocity.x = (ballVelocity.x / magnitude) * speed; // Scale x velocity
  ballVelocity.y = (ballVelocity.y / magnitude) * speed; // Scale y velocity
}

// Event listener for the difficulty button
difficultyButton.addEventListener("click", () => {
  if (difficulty === "Easy") {
    difficulty = "Norm";
  } else if (difficulty === "Norm") {
    difficulty = "Hard";
  } else {
    difficulty = "Easy";
  }

  difficultyButton.innerText = `Difficulty: ${difficulty}`;
  updateBallSpeed(); // Update the ball speed based on the new difficulty
});

// Initialize the ball speed based on the default difficulty
updateBallSpeed();

window.onload = () => {
  resetGame(); // Reset the game to its initial state
};
