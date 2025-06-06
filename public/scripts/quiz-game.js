const nextBtn = document.querySelector(".aside-next");
let triviasData;
let currentTriviaInx = 0;
const answerBtns = document.querySelectorAll(".main-button");
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
    btn.textContent = newAnswers[index];
  });
};
// Change the text content of question
const changeQuestionValue = (question) => {
  const questionInput = document.querySelector(".main-question");
  questionInput.innerHTML = question;
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
// Load questions and other significant quiz info
const loadQuestions = () => {
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
// Start the quiz
const startQuiz = () => {
  // let isGameDone = false;

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
  loadQuestions();
  currentQuizTimer = startTimer();
});

export { startQuiz, setTriviasData };
