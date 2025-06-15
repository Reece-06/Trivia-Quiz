// Event listeners for buttons
const addButtonsEvtListener = () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", playClickSound);
  });
};
// Play the click sound of buttons
const playClickSound = (e) => {
  const clickSound = new Audio("../sounds/clickSound.mp3");
  const isMainButton = e.target.classList.contains("main-button");
  if (!isMainButton) {
    clickSound.play();
  }
};

addButtonsEvtListener();
