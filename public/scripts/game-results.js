import { resetCurrTriviaInx, startQuiz } from "./quiz-game.js";

const gameSettingsBtn = document.querySelector(".results-game-sett");

const quizContainer = document.querySelector(".quiz-container");
const tryAgainBtn = document.querySelector(".results-try");
const resultData = [
  {
    percent: 100,
    animationURL:
      "https://lottie.host/08d62682-bb79-4a74-9af2-0c08e0377014/LuqT0MHFWZ.lottie",
    resultMessage: "Perfect! You nailed it!",
  },
  {
    percent: [80, 99],
    animationURL:
      "https://lottie.host/ec521fe6-a670-430f-b353-ef7dd1497234/VJDxw8T9zC.lottie",
    resultMessage: "Great job! Almost perfect.",
  },
  {
    percent: [70, 79],
    animationURL:
      "https://lottie.host/2362007e-69d7-4a9b-af97-1a8f1f08fb4e/u9Gn5iSJIk.lottie",
    resultMessage: "Nice! You're getting there.",
  },
  {
    percent: [50, 69],
    animationURL:
      "https://lottie.host/90441000-f0e8-4e4d-9aac-0b9355361fe7/AdhbHfcThW.lottie",
    resultMessage: "Not bad. Keep going!",
  },
  {
    percent: [30, 49],
    animationURL:
      "https://lottie.host/f3109c7a-32ab-4a63-b819-6adb196880a9/4grDEIOszk.lottie",
    resultMessage: "Tough round. Try again!",
  },
  {
    percent: [0, 29],
    animationURL:
      "https://lottie.host/839e8626-ce27-4d2a-aa28-936dd276ce91/A9t78Yn2mr.lottie",
    resultMessage: "Don’t give up! Practice makes perfect.",
  },
];
// Show result message
const showResultMessage = (score, totalQues) => {
  const messageEl = document.querySelector(".quiz-results-p1");
  const lottieEl = document.querySelector("#result-animation");

  const calulatedPercent = (score / totalQues) * 100;

  const result = resultData.find((result) => {
    if (typeof result.percent == "number") {
      if (result.percent === calulatedPercent) {
        return true;
      }
    } else {
      const [percent1, percent2] = result.percent;
      if (calulatedPercent >= percent1 && calulatedPercent <= percent2) {
        return true;
      }
    }
    return false;
  });

  messageEl.textContent = result.resultMessage;

  lottieEl.load(result.animationURL);
};
const showGameResults = (score, numberOfQues) => {
  quizContainer.classList.add("show-results");
  quizContainer.classList.remove("show-quiz-content");
  const scoreInput = document.querySelector(".results-num-corr");
  const quizQuestionsInput = document.querySelector(".results-num-ques");
  scoreInput.textContent = score;
  quizQuestionsInput.textContent = numberOfQues;
  showResultMessage(score, numberOfQues);
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
