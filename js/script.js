const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const V = SAT.Vector,
  Circle = SAT.Circle,
  Box = SAT.Box,
  Response = SAT.Response;
let ball = new Circle(new V(240, 280), 10);
let ballVelocity = new V(3, -3);

// Nastavitve loparja
const paddleWidth = 75,
  paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// Nastavitve opek
const defaultBrickWidth = 75,
  brickHeight = 20,
  brickPadding = 10,
  brickOffsetLeft = 30;

// Konfiguracija nivojev
const levels = [
  {
    // Nivo 1
    pattern: [[1, 2, 3, 2, 1]],
    offsetTop: 60,
  },
  {
    // Nivo 2
    pattern: [
      [1, 2, 1, 2, 1],
      [2, 3, 2, 3, 2],
    ],
    offsetTop: 50,
  },
  {
    // Nivo 3
    pattern: [
      [0, 0, 1, 0, 0],
      [0, 2, 3, 2, 0],
      [1, 3, 2, 3, 1],
    ],
    offsetTop: 50,
  },
  {
    // Nivo 4
    pattern: [
      [1, 0, 2, 0, 3],
      [0, 2, 0, 3, 0],
      [3, 0, 1, 0, 2],
    ],
    offsetTop: 50,
  },
  {
    // Nivo 5
    pattern: [
      [1, 2, 3, 2, 1],
      [2, 3, 1, 3, 2],
      [3, 1, 2, 1, 3],
    ],
    offsetTop: 50,
  },
  {
    // Nivo 6
    pattern: [
      [1, 2, 3, 2, 1],
      [0, 2, 3, 2, 0],
      [3, 0, 1, 0, 3],
    ],
    offsetTop: 50,
  },
  {
    // Nivo 7
    pattern: [
      [1, 2, 3, 2, 3, 1],
      [0, 3, 0, 2, 0, 3],
      [3, 2, 1, 2, 3, 2],
    ],
    offsetTop: 40,
  },
  {
    // Nivo 8
    pattern: [
      [1, 2, 3, 2, 1],
      [0, 2, 3, 2, 0],
      [0, 0, 1, 0, 0],
    ],
    offsetTop: 50,
  },
  {
    // Nivo 9
    pattern: [
      [1, 0, 2, 0, 3],
      [0, 3, 0, 2, 0],
      [3, 0, 1, 0, 2],
      [0, 2, 0, 3, 0],
    ],
    offsetTop: 40,
  },
  {
    // Nivo 10
    pattern: [
      [1, 2, 3, 2, 3, 1],
      [2, 3, 1, 3, 2, 3],
      [3, 1, 2, 1, 3, 1],
    ],
    offsetTop: 40,
  },
  {
    // Nivo 11
    pattern: [
      [1, 2, 3, 2, 3, 2, 1],
      [2, 3, 1, 3, 2, 3, 2],
    ],
    offsetTop: 30,
  },
  {
    // Nivo 12
    pattern: [
      [1, 0, 2, 0, 3, 0, 1],
      [0, 2, 0, 3, 0, 2, 0],
      [3, 0, 1, 0, 2, 0, 3],
    ],
    offsetTop: 30,
  },
  {
    // Nivo 13
    pattern: [
      [1, 0, 2, 0, 3],
      [2, 0, 3, 0, 1],
      [3, 0, 1, 0, 2],
      [1, 0, 2, 0, 3],
    ],
    offsetTop: 30,
  },
  {
    // Nivo 14
    pattern: [
      [1, 2, 0, 3, 1],
      [2, 3, 0, 1, 2],
      [3, 1, 0, 2, 3],
      [1, 2, 0, 3, 1],
    ],
    offsetTop: 30,
  },
  {
    // Nivo 15
    pattern: [
      [1, 2, 3, 2, 3, 2, 1],
      [2, 3, 1, 3, 2, 3, 2],
      [3, 1, 2, 1, 3, 1, 3],
      [1, 2, 3, 2, 3, 2, 1],
    ],
    offsetTop: 20,
  },
  {
    // Nivo 16
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
    // Nivo 17
    pattern: [
      [1, 2, 3, 2, 3, 2, 1],
      [2, 0, 3, 1, 3, 0, 2],
      [3, 1, 2, 1, 2, 1, 3],
      [1, 0, 3, 2, 3, 0, 1],
    ],
    offsetTop: 20,
  },
  {
    // Nivo 18
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
    // Nivo 19
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
    // Nivo 20
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

// Inicializacija opek za trenutni nivo
function initializeBricks() {
  let cols = levelConfig.pattern[0].length;
  brickWidth =
    cols > 5
      ? (canvas.width - 2 * brickOffsetLeft - (cols - 1) * brickPadding) / cols
      : defaultBrickWidth;

  bricks = [];
  totalScore = 0; // Skupni rezultat za nivo
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
        totalScore += brickScore; // Dodaj točko za opeko k skupnemu rezultatu
      }
    }
  }
}

// Nastavitev nivoja
let selectedLevel = localStorage.getItem("selectedLevel") || "1";
selectedLevel = parseInt(selectedLevel, 10);
levelConfig = levels[selectedLevel - 1] || levels[0];

document.getElementById("level").innerText = selectedLevel; // Posodobi prikaz nivoja
initializeBricks(); // Inicializiraj opeke za trenutni nivo

let score = 0,
  gameRunning = true,
  gamePaused = false,
  gameStarted = false; // Spremljanje stanja igre
let rightPressed = false,
  leftPressed = false;

// Premikanje loparja z desno in levo puščico
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") rightPressed = true;
  if (e.key === "ArrowLeft") leftPressed = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") rightPressed = false;
  if (e.key === "ArrowLeft") leftPressed = false;
});

// Ponastavitev nivoja z R
document.addEventListener("keydown", (e) => {
  if (e.key === "r" || e.key === "R") {
    gamePaused = true;
    Swal.fire({
      title: "Reset Level",
      text: "Are you sure you want to reset the level?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Reset",
      background: "#000000",
      color: "#00ffcc",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        confirmButton: "swal-button",
        cancelButton: "swal-button-cancel",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        document.location.reload();
      }
    });
  }
});

let animationFrameId = null;
let lastTime = 0;

// Glavna zanka igre
function update(timestamp) {
  if (!gameRunning) return;

  if (gamePaused || !gameStarted) {
    lastTime = timestamp;
    animationFrameId = requestAnimationFrame(update);
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

  // Posodobi položaj žoge
  ball.pos.x += ballVelocity.x * deltaTime * 60;
  ball.pos.y += ballVelocity.y * deltaTime * 60;

  if (ball.pos.x + ball.r > canvas.width || ball.pos.x - ball.r < 0)
    ballVelocity.x = -ballVelocity.x;
  if (ball.pos.y - ball.r < 0) ballVelocity.y = -ballVelocity.y;
  if (ball.pos.y + ball.r > canvas.height) {
    gameRunning = false;
    Swal.fire({
      title: "Game Over",
      text: "Try Again!",
      icon: "error",
      confirmButtonText: "Retry",
      background: "#000000",
      color: "#00ffcc",
      confirmButtonColor: "#00c7d5",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        confirmButton: "swal-button",
      },
    }).then(() => document.location.reload());
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth)
    paddleX += 7 * deltaTime * 60;
  if (leftPressed && paddleX > 0) paddleX -= 7 * deltaTime * 60;

  animationFrameId = requestAnimationFrame(update);
}

// Funkcija za začetek igre
function startGameLoop() {
  if (!gameStarted) return;

  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  lastTime = performance.now();
  animationFrameId = requestAnimationFrame(update);
}

// Funkcija za ponastavitev igre
function resetGame() {
  ball.pos = new V(240, 280);
  updateBallSpeed();
  paddleX = (canvas.width - paddleWidth) / 2;
  score = 0;
  document.getElementById("score").innerText = score;
  initializeBricks();
}

// Zaznavanje trkov z opekami
function collisionDetection() {
  for (let c = 0; c < bricks.length; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      let brick = bricks[c][r];
      if (!brick) continue;
      let response = new Response();
      if (SAT.testCirclePolygon(ball, brick.polygon, response)) {
        bricks[c][r] = null;
        score += brick.score;
        document.getElementById("score").innerText = score; // Check collision side

        // Check collision side
        if (Math.abs(response.overlapV.x) > Math.abs(response.overlapV.y)) {
          ballVelocity.x = -ballVelocity.x; // Side collision
        } else {
          ballVelocity.y = -ballVelocity.y; // Top/bottom collision
        }

        updateHighScore();
        currentBallImage = ballHitImage;

        // normalna tekstura po 1 sekundi
        setTimeout(() => {
          currentBallImage = ballImage;
        }, 1000);

        // Check if level is finished
        if (score >= totalScore) {
          setTimeout(() => {
            gameRunning = false;
            selectedLevel++;
            if (selectedLevel > levels.length) {
              selectedLevel = 1;
              Swal.fire({
                title: "Odlično!",
                text: "Zaključili ste vse nivoje! Začenjamo znova od nivoja 1.",
                icon: "success",
                confirmButtonText: "Nadaljuj",
                background: "#000000",
                color: "#00ffcc",
                confirmButtonColor: "#00c7d5",
                customClass: {
                  popup: "swal-popup",
                  title: "swal-title",
                  confirmButton: "swal-button",
                },
              }).then(() => {
                localStorage.setItem("selectedLevel", selectedLevel);
                levelConfig = levels[selectedLevel - 1];
                document.getElementById("level").innerText = selectedLevel;
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
                background: "#000000",
                color: "#00ffcc",
                confirmButtonColor: "#00c7d5",
                customClass: {
                  popup: "swal-popup",
                  title: "swal-title",
                  confirmButton: "swal-button",
                },
              }).then(() => {
                document.getElementById("level").innerText = selectedLevel;
                window.location.reload();
              });
            }
          }, 100);
        }

        return;
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
    ballVelocity.y = -Math.abs(ballVelocity.y);
    let hitPoint = (ball.pos.x - paddleX) / paddleWidth;
    let angle = ((hitPoint - 0.5) * Math.PI) / 2; // Calculate angle based on hit point

    ballVelocity.x = Math.sin(angle);
    ballVelocity.y = -Math.cos(angle);

    updateBallSpeed();
  }
}

// Funkcija za risanje žoge

const ballImage = new Image();
ballImage.src = "slike/dumbsmile.png";

const ballHitImage = new Image();
ballHitImage.src = "slike/ball-hit.png";

let currentBallImage = ballImage;

function drawBall() {
  if (currentBallImage.complete) {
    ctx.drawImage(
      currentBallImage,
      ball.pos.x - ball.r,
      ball.pos.y - ball.r,
      ball.r * 2,
      ball.r * 2
    );
  }
}

// Funkcija za risanje loparja
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "brown";
  ctx.fill();
  ctx.closePath();
}

// Funkcija za risanje opek

const blueBrickImage = new Image();
blueBrickImage.src = "slike/brickblue.png";

const orangeBrickImage = new Image();
orangeBrickImage.src = "slike/brickred.png";

const yellowBrickImage = new Image();
yellowBrickImage.src = "slike/brickyellow.png";

function drawBricks() {
  for (let c = 0; c < bricks.length; c++) {
    for (let r = 0; r < bricks[c].length; r++) {
      let brick = bricks[c][r];
      if (brick) {
        let brickImage;

        if (brick.type === 1) {
          brickImage = blueBrickImage;
        } else if (brick.type === 2) {
          brickImage = orangeBrickImage;
        } else if (brick.type === 3) {
          brickImage = yellowBrickImage;
        }

        if (brickImage.complete) {
          ctx.drawImage(
            brickImage,
            brick.polygon.pos.x,
            brick.polygon.pos.y,
            brickWidth,
            brickHeight
          );
        }
      }
    }
  }
}

// Gumb za navodila
document.getElementById("instructionsButton").addEventListener("click", () => {
  const wasPaused = gamePaused;
  gamePaused = true;

  // Step 1: Basic Controls
  Swal.fire({
    title: "Basic Controls",
    html: `
      <p style="color: #00ffcc; margin: 20px;">Use the <strong>Arrow Keys</strong> to move the paddle left and right.</p>
      <p style="color: #00ffcc; margin: 20px;">Press <strong>Space</strong> to pause/resume the game.</p>
      <p style="color: #00ffcc; margin: 20px;">Press <strong>R</strong> to reset the level.</p>
    `,
    icon: "info",
    confirmButtonText: "Next",
    background: "#000000",
    color: "#00ffcc",
    confirmButtonColor: "#00c7d5",
    customClass: {
      popup: "swal-popup",
      title: "swal-title",
      confirmButton: "swal-button",
    },
  }).then(() => {
    // Step 2: Objective
    Swal.fire({
      title: "Objective",
      html: `
        <p style="color: #00ffcc; margin: 20px;">Break all the bricks to complete the level.</p>
        <p style="color: #00ffcc; margin: 20px;">Avoid letting the ball fall below the paddle!</p>
      `,
      icon: "info",
      confirmButtonText: "Next",
      background: "#000000",
      color: "#00ffcc",
      confirmButtonColor: "#00c7d5",
      customClass: {
        popup: "swal-popup",
        title: "swal-title",
        confirmButton: "swal-button",
      },
    }).then(() => {
      // Step 3: Bonus Bricks
      Swal.fire({
        title: "Bonus Bricks",
        html: `
          <div style="margin-top: 20px;">
            <p style="color: #00ffcc; margin-bottom: 10px;">Bonus Bricks:</p>
            <div style="display: flex; justify-content: center; gap: 10px; align-items: center;">
              <div style="width: 30px; height: 20px; background-color: #0095DD; border: 1px solid #ffffff;"></div>
              <span style="color: #00ffcc;">Blue Brick: 1 Point</span>
            </div>
            <div style="display: flex; justify-content: center; gap: 10px; align-items: center; margin-top: 10px;">
              <div style="width: 30px; height: 20px; background-color: #FF5733; border: 1px solid #ffffff;"></div>
              <span style="color: #00ffcc;">Orange Brick: 2 Points</span>
            </div>
            <div style="display: flex; justify-content: center; gap: 10px; align-items: center; margin-top: 10px;">
              <div style="width: 30px; height: 20px; background-color: #FFC300; border: 1px solid #ffffff;"></div>
              <span style="color: #00ffcc;">Yellow Brick: 3 Points</span>
            </div>
          </div>
        `,
        icon: "info",
        confirmButtonText: "Next",
        background: "#000000",
        color: "#00ffcc",
        confirmButtonColor: "#00c7d5",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          confirmButton: "swal-button",
        },
      }).then(() => {
        // Step 4: Difficulty and Levels
        Swal.fire({
          title: "Levels and Credits",
          html: `
            <p style="color: #00ffcc; margin: 20px;">Change the difficulty by clicking the "Difficulty" button.</p>
            <p style="color: #00ffcc; margin: 20px;">Click "Select Level" to choose a different level.</p>
            <p style="color: orange; margin: 20px;">Game made by Faris</p>
            <p><a href="https://github.com/0xRisfa/brik" target="_blank" style="color: orange; text-decoration: underline;">GitHub Link</a></p>
          `,
          icon: "info",
          confirmButtonText: "Got it!",
          background: "#000000",
          color: "#00ffcc",
          confirmButtonColor: "#00c7d5",
          customClass: {
            popup: "swal-popup",
            title: "swal-title",
            confirmButton: "swal-button",
          },
        }).then(() => {
          if (!wasPaused) {
            gamePaused = false;
            startGameLoop();
          }
        });
      });
    });
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
  const speed = difficulty === "Easy" ? 2 : difficulty === "Norm" ? 5 : 10;
  const magnitude = Math.sqrt(ballVelocity.x ** 2 + ballVelocity.y ** 2);
  ballVelocity.x = (ballVelocity.x / magnitude) * speed;
  ballVelocity.y = (ballVelocity.y / magnitude) * speed;
}

// Gumb za spremembo težavnosti
difficultyButton.addEventListener("click", () => {
  if (difficulty === "Easy") {
    difficulty = "Norm";
  } else if (difficulty === "Norm") {
    difficulty = "Hard";
  } else {
    difficulty = "Easy";
  }

  difficultyButton.innerText = `Difficulty: ${difficulty}`;
  localStorage.setItem("difficulty", difficulty); // Save difficulty to localStorage
  updateBallSpeed();
});

// Inicializacija hitrosti žoge glede na privzeto težavnost
updateBallSpeed();

window.onload = () => {
  // Retrieve difficulty from localStorage or use default
  difficulty = localStorage.getItem("difficulty") || "Norm";
  difficultyButton.innerText = `Difficulty: ${difficulty}`;
  updateBallSpeed(); // Apply the difficulty setting

  resetGame(); // Reset the game to its initial state
};
