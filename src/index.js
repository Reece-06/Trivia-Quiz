import { startBtn, startGame } from "./scripts/starting-screen.js";
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

startBtn.addEventListener("click", startGame);

form.addEventListener("submit", handleFormSubmit);

addDifficultyBtnsEvtListener();
disableDecreaseBtn();

numQuestionsInput.addEventListener("input", checkInputtedNumQues);

addNumQuestionsEvtListener();

addDiffCategoryEvent();
