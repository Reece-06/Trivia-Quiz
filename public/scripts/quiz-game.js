const nextBtn = document.querySelector(".aside-next");
let triviasData;
let currentTriviaInx = 0;
// Set triviasdata variable
const setTriviasData = (data) => {
  triviasData = data;
};
// Create new Answers
const createNewAnswers = (currTrivia) => {
  const correctPlacement = Math.floor(Math.random() * (4 - 1 + 1)) - 1;

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
  nextBtn.setAttribute("disabled", "");
  const currentTrivia = triviasData[currentTriviaInx];
  const newAnswers = createNewAnswers(currentTrivia);
  changeAnswersValue(newAnswers);
  const question = currentTrivia.question;
  changeQuestionValue(question);
  const currentQuesNum = currentTriviaInx + 1;
  changeCurrQuestionNum(currentQuesNum);
};
// Change current time
const changeCurrTime = (currTime) => {
  const currTimeInput = document.querySelector(".current-time");
  currTimeInput.textContent = currTime;
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
      currentTriviaInx++;
      nextBtn.removeAttribute("disabled");
    }
  }, 1000);
};
// Start the quiz
const startQuiz = () => {
  let isGameDone = false;

  const category = triviasData[0].category;
  changeCategoryValue(category);

  const numOfQuestions = triviasData.length;
  changeNumQuestionsValue(numOfQuestions);

  loadQuestions();

  startTimer();

  if (isGameDone) {
    clearInterval(intervalId);
  }
};
nextBtn.addEventListener("click", () => {
  loadQuestions();
  startTimer();
});

export { startQuiz, setTriviasData };
