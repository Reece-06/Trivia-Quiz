const clickSound = new Audio("../sounds/clickSound.mp3");
const correctClickSound = new Audio("../sounds/correctAnswer.mp3");
const wrongClickSound = new Audio("../sounds/wrongSound.mp3");

// Event listeners for buttons
const addButtonsEvtListener = () => {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", playClickSound);
  });
};
// Play the click sound of buttons
const playClickSound = (e) => {
  const isMainButton = e.target.classList.contains("main-button");
  const isIncDecBtn = e.target.classList.contains("num-questions-btn");
  const isReadMoreExit = e.target.classList.contains("question-modal-exit");

  const isCorrect = e.target.dataset.correct;

  if (!isMainButton && !isIncDecBtn && !isReadMoreExit) {
    correctClickSound.pause();
    correctClickSound.currentTime = 0;
    wrongClickSound.pause();
    wrongClickSound.currentTime = 0;
    clickSound.play();
  } else if (isMainButton && isCorrect) {
    correctClickSound.play();
  } else if (isMainButton && !isCorrect) {
    wrongClickSound.play();
  }
};

addButtonsEvtListener();
export default wrongClickSound;
