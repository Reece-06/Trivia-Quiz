import { showGameResults } from "./game-results.js";
const nextBtn = document.querySelector(".aside-next");
const answerBtns = document.querySelectorAll(".main-button");
// const seeMoreBtn = document.querySelector(".see-more");
const exitModalBtn = document.querySelector(".question-modal-exit");
let triviasData;
let currentTriviaInx = 0;
let currentQuizTimer;
let currentCorrAnsCount = 0;
// Set triviasdata variable
const setTriviasData = (data) => {
  triviasData = data;
};
const markCorrectButton = (index) => {
  const btns = document.querySelectorAll(".main-button");
  if (btns[index]) {
    btns[index].dataset.correct = "true";
  }
};
// Create new Answers
const createNewAnswers = (currTrivia) => {
  const correctPlacement = Math.floor(Math.random() * 4);
  markCorrectButton(correctPlacement);

  const correctAnswer = currTrivia.correct_answer;

  const newAnswers = [...currTrivia.incorrect_answers];

  newAnswers.splice(correctPlacement, 0, correctAnswer);

  return newAnswers;
};
// Change the value of multiple choice answers
const changeAnswersValue = (newAnswers) => {
  const buttons = document.querySelectorAll(".main-button");
  buttons.forEach((btn, index) => {
    btn.innerHTML = newAnswers[index];
  });
};
// Decodes html entities from the trivia questions
const decodeHtmlEntities = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
// Change the text content of question
const changeQuestionValue = (question) => {
  const questionInput = document.querySelector(".main-question");
  const decodedQuestion = decodeHtmlEntities(question);
  console.log(decodedQuestion);
  const questionCharCount = decodedQuestion.length;
  console.log(questionCharCount);

  // questionInput.innerHTML = question;
  const completeQuesEl = document.querySelector(".complete-question");
  const seeMoreEl = document.createElement("span");
  if (window.screen.width < 736) {
    if (questionCharCount > 85) {
      let newQuesDisplay = decodedQuestion.substring(0, 80);
      newQuesDisplay = newQuesDisplay + "... ";
      questionInput.innerHTML = newQuesDisplay;
      seeMoreEl.textContent = "Read More";
      seeMoreEl.classList.add("read-more");
      questionInput.appendChild(seeMoreEl);
      completeQuesEl.innerHTML = decodedQuestion;

      seeMoreEl.addEventListener("click", showQuestionModal);
    } else {
      questionInput.innerHTML = decodedQuestion;
    }
  } else {
    questionInput.innerHTML = decodedQuestion;
  }
};
// Change current question number
const changeCurrQuestionNum = (currentQuesNum) => {
  const currentQuesNumInp = document.querySelector(".aside-curr-question");
  currentQuesNumInp.textContent = currentQuesNum;
};
// Change num of questions text content
const changeNumQuestionsValue = (numOfQuestions) => {
  const numQuestionsInputs = document.querySelectorAll(".num-question");
  numQuestionsInputs.forEach((numQuestionsInput) => {
    numQuestionsInput.textContent = numOfQuestions;
  });
};
// Change category text content
const changeCategoryValue = (category) => {
  const categoryInput = document.querySelector(".header-category");
  categoryInput.textContent = category;
};
// Removes previous correct data attribute.
const removeCorrectDataAttr = () => {
  const correctAns = [...answerBtns].find(
    (answerBtn) => answerBtn.dataset.correct === "true"
  );
  correctAns ? correctAns.removeAttribute("data-correct") : null;
};
// Load questions and other significant quiz info
const loadQuestions = () => {
  removeCorrectDataAttr();
  removeCorrectAndWrong();
  reenableAllAnswerBtns();
  nextBtn.setAttribute("disabled", "");
  const currentTrivia = triviasData[currentTriviaInx];
  const newAnswers = createNewAnswers(currentTrivia);
  changeAnswersValue(newAnswers);
  const question = currentTrivia.question;
  changeQuestionValue(question);
  currentTriviaInx++;
  changeCurrQuestionNum(currentTriviaInx);
};
// Change current time
const changeCurrTime = (currTime) => {
  const currTimeInput = document.querySelector(".current-time");
  currTimeInput.textContent = currTime;
};
// Reveals the correct answer and all wrong ansers
const revealAllAnswers = () => {
  answerBtns.forEach((answerBtn) => {
    answerBtn.dataset.correct
      ? answerBtn.classList.add("correct")
      : answerBtn.classList.add("wrong");
  });
};
// start Timer
const startTimer = () => {
  let currentTime = 10;
  changeCurrTime(currentTime);
  const quizTimer = setInterval(() => {
    currentTime--;
    changeCurrTime(currentTime);

    if (currentTime <= 0) {
      clearInterval(quizTimer);
      // currentTriviaInx++;
      nextBtn.removeAttribute("disabled");
      revealAllAnswers();
      disableAllAnswerBtns();
    }
  }, 1000);
  return quizTimer;
};
// remove correct and wrong styling
const removeCorrectAndWrong = () => {
  answerBtns.forEach((answerBtn) => {
    answerBtn.classList.remove("correct", "wrong");
  });
};
// Check for the correct answer button
const checkCorrectAnswer = (e) => {
  const btnClicked = e.target;

  if (btnClicked.dataset.correct) {
    btnClicked.classList.add("correct");
    currentCorrAnsCount++;
    changeCorrectAnswerCount();
  } else {
    btnClicked.classList.add("wrong");
    const correctBtn = [...answerBtns].find(
      (answerBtn) => answerBtn.dataset.correct === "true"
    );
    correctBtn.classList.add("correct");
  }
};
// Reenable all answer btns
const reenableAllAnswerBtns = () => {
  answerBtns.forEach((answerBtn) => {
    answerBtn.removeAttribute("disabled");
  });
};
// Disable all answer btns
const disableAllAnswerBtns = () => {
  answerBtns.forEach((answerBtn) => {
    answerBtn.setAttribute("disabled", "");
  });
};
// Set event listener for answer buttons
const answerBtnsAddEventListener = () => {
  answerBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      checkCorrectAnswer(e);
      clearInterval(currentQuizTimer);
      nextBtn.removeAttribute("disabled");
      disableAllAnswerBtns();
    });
  });
};
// Change correct answer count
const changeCorrectAnswerCount = () => {
  const corrAnswerCountInput = document.querySelector(".correct-answer-count");
  corrAnswerCountInput.textContent = currentCorrAnsCount;
};
// Reset all trivia data
const resetGameVariables = () => {
  triviasData = undefined;
  currentTriviaInx = 0;
};
// Reset Current Trivia Index
const resetCurrTriviaInx = () => {
  currentTriviaInx = 0;
};
// Show the modal that contains the whole trivia question.
const showQuestionModal = () => {
  const body = document.querySelector("body");
  body.classList.add("show-modal");
};
// Remove modal that contains the whole trivia question.
const removeQuestionModal = () => {
  const body = document.querySelector("body");
  body.classList.remove("show-modal");
};
// Start the quiz
const startQuiz = () => {
  // let isGameDone = false;
  currentCorrAnsCount = 0;
  const category = triviasData[0].category;
  changeCategoryValue(category);

  const numOfQuestions = triviasData.length;
  changeNumQuestionsValue(numOfQuestions);

  changeCorrectAnswerCount();

  loadQuestions();

  currentQuizTimer = startTimer();
};
answerBtnsAddEventListener();
nextBtn.addEventListener("click", () => {
  if (currentTriviaInx + 1 === triviasData.length) {
    nextBtn.textContent = "See Results";
  }
  if (currentTriviaInx + 1 <= triviasData.length) {
    loadQuestions();
    currentQuizTimer = startTimer();
  } else {
    showGameResults(currentCorrAnsCount, currentTriviaInx);
    nextBtn.textContent = "Next";
  }
});
exitModalBtn.addEventListener("click", removeQuestionModal);

export { startQuiz, setTriviasData, resetGameVariables, resetCurrTriviaInx };
