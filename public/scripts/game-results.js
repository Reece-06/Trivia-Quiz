const gameSettingsBtn = document.querySelector(".results-game-sett");
const quizContainer = document.querySelector(".quiz-container");
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
export { showGameResults };
