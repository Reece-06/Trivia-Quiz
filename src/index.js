import { startBtn, startGame } from "./scripts/starting-screen.js";
import "./styles/general.css";
import "./styles/styles.css";
import {
  form,
  handleFormSubmit,
  addDifficultyBtnsEvtListener,
  disableDecreaseBtn,
  numQuestionsInput,
  checkInputtedNumQues,
  addNumQuestionsEvtListener,
  addDiffCategoryEvent,
} from "./scripts/game-settings.js";
import {
  answerBtnsAddEventListener,
  nextBtn,
  handleAnswerBtns,
  exitModalBtn,
  removeQuestionModal,
} from "./scripts/quiz-game.js";
import { addButtonsEvtListener } from "./scripts/game-sounds.js";
// Starting Screen
startBtn.addEventListener("click", startGame);
// Game Settings
form.addEventListener("submit", handleFormSubmit);

addDifficultyBtnsEvtListener();
disableDecreaseBtn();

numQuestionsInput.addEventListener("input", checkInputtedNumQues);

addNumQuestionsEvtListener();

addDiffCategoryEvent();
// Game
answerBtnsAddEventListener();
nextBtn.addEventListener("click", () => handleAnswerBtns);
exitModalBtn.addEventListener("click", removeQuestionModal);
// Game Sounds
addButtonsEvtListener();
