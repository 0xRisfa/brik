const totalLevels = 20;
const container = document.getElementById("levelContainer");

for (let i = 1; i <= totalLevels; i++) {
  let btn = document.createElement("button");
  btn.innerText = "Level " + i;
  btn.className = "level-btn";
  btn.onclick = () => {
    localStorage.setItem("selectedLevel", i);
    window.location.href = "index.html";
  };
  container.appendChild(btn);
}

// Back button
const backButton = document.getElementById("backButton");
backButton.onclick = () => {
  const currentLevel = localStorage.getItem("selectedLevel") || 1; // Default level 1
  localStorage.setItem("selectedLevel", currentLevel);
  window.location.href = "index.html";
};
