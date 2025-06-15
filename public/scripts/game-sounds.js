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
  const correctClickSound = new Audio("../sounds/correctAnswer.mp3");
  const wrongClickSound = new Audio("../sounds/wrongSound.mp3");

  const isMainButton = e.target.classList.contains("main-button");
  const isCorrect = e.target.dataset.correct;
  if (!isMainButton) {
    clickSound.play();
  } else if (isMainButton && isCorrect) {
    correctClickSound.play();
  } else {
    wrongClickSound.play();
  }
};

addButtonsEvtListener();
