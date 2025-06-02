const startBtn = document.querySelector(".starting-screen-btn");
// Hide starting screen
const hideStartingScreen = (parentContainer) => {
  parentContainer.classList.toggle("hide-start-screen");
};
// Show game settings
const showGameSettings = (parentContainer) => {
  parentContainer.classList.toggle("show-game-settings");
};

// Starts game
const startGame = () => {
  const parentContainer = document.querySelector(".quiz-container");
  hideStartingScreen(parentContainer);
  showGameSettings(parentContainer);
};

startBtn.addEventListener("click", startGame);
