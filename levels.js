const levelContainer = document.getElementById("levelContainer");
const backButton = document.getElementById("backButton");

// izracun zvezdic
function calculateStars(percentage) {
  if (percentage === 100) return 3; // 100% = 3 zvezdice
  if (percentage >= 50) return 2; // 50% to 99% = 2 zvezdici
  if (percentage > 0) return 1; // 1% to 49% = 1 zvezdica
  return 0; // 0% = 0 zvezdic
}

// funkcija za risanje zvezdic
function renderStars(stars) {
  const fillWidth = (stars / 3) * 100; // izračuna širino zvezdic
  return `
    <div class="star-container">
      <div class="star-filled" style="--fill-width: ${fillWidth}%;"></div>
    </div>
  `;
}

// zapolni levele
for (let i = 1; i <= 20; i++) {
  const highScore =
    parseInt(localStorage.getItem(`level${i}HighScore`), 10) || 0;
  const stars = calculateStars(highScore); // izračun zvezdic

  const levelLink = document.createElement("a");
  levelLink.href = "#";
  levelLink.classList.add("level-btn");
  levelLink.addEventListener("click", () => selectLevel(i));

  // dodajanje zvezdic
  levelLink.innerHTML = `
    <div class="level-text">Level ${i}</div>
    <div class="stars">${renderStars(stars)}</div>
  `;

  levelContainer.appendChild(levelLink);
}

// funkcija za izbiranje levela
function selectLevel(level) {
  localStorage.setItem("selectedLevel", level);
  window.location.href = "index.html";
}

// back button
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
