const levelContainer = document.getElementById("levelContainer");
const backButton = document.getElementById("backButton");

// Function to calculate stars based on percentage
function calculateStars(percentage) {
  if (percentage === 100) return 3; // 100% = 3 stars
  if (percentage >= 50) return 2; // 50% to 99% = 2 stars
  if (percentage > 0) return 1; // 1% to 49% = 1 star
  return 0; // 0% = no stars
}

// Function to render stars
function renderStars(stars) {
  const fillWidth = (stars / 3) * 100; // Calculate the percentage of stars to fill
  return `
    <div class="star-container">
      <div class="star-filled" style="--fill-width: ${fillWidth}%;"></div>
    </div>
  `;
}

// Populate levels with buttons and stars
for (let i = 1; i <= 20; i++) {
  const highScore =
    parseInt(localStorage.getItem(`level${i}HighScore`), 10) || 0; // Get high score as a number
  const stars = calculateStars(highScore); // Calculate stars based on high score

  const levelLink = document.createElement("a");
  levelLink.href = "#"; // Placeholder, updated below
  levelLink.classList.add("level-btn");
  levelLink.addEventListener("click", () => selectLevel(i)); // Handle level selection

  levelLink.innerHTML = `
    <div class="level-text">Level ${i}</div>
    <div class="stars">${renderStars(stars)}</div>
  `;

  levelContainer.appendChild(levelLink);
}

// Function to handle level selection
function selectLevel(level) {
  localStorage.setItem("selectedLevel", level); // Save selected level
  window.location.href = "index.html"; // Redirect to the game
}

// Back button functionality
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
