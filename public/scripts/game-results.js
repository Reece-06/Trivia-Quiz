import { resetCurrTriviaInx, startQuiz } from "./quiz-game.js";
const gameSettingsBtn = document.querySelector(".results-game-sett");
const quizContainer = document.querySelector(".quiz-container");
const tryAgainBtn = document.querySelector(".results-try");
const showGameResults = (score, numberOfQues) => {
  quizContainer.classList.add("show-results");
  quizContainer.classList.remove("show-quiz-content");
  const scoreInput = document.querySelector(".results-num-corr");
  const quizQuestionsInput = document.querySelector(".results-num-ques");
  scoreInput.textContent = score;
  quizQuestionsInput.textContent = numberOfQues;
};
gameSettingsBtn.addEventListener("click", () => {
  quizContainer.classList.remove("show-results");
  quizContainer.classList.add("show-game-settings");
});
tryAgainBtn.addEventListener("click", () => {
  resetCurrTriviaInx();
  quizContainer.classList.remove("show-results");
  quizContainer.classList.add("show-quiz-content");
  startQuiz();
});

export { showGameResults };
