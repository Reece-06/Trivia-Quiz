import { startQuiz, setTriviasData, resetGameVariables } from "./quiz-game.js";
const form = document.querySelector(".form");
const labels = document.querySelectorAll(".difficulty-label");
const numQuestionsInput = document.querySelector(".num-questions-input");
let isNumQuesValid = false;
// Send data to server
const sendDataToServer = async (data) => {
  let result;
  try {
    const response = await fetch("/questions", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await response.json();

    console.log("Server response:", result);
  } catch (error) {
    console.log(error);
  }
  return result;
};
// Hide game settings
const hideGameSettings = (parentContainer) => {
  parentContainer.classList.remove("show-game-settings");
};
// Show quiz content
const showQuizContent = (parentContainer) => {
  parentContainer.classList.toggle("show-quiz-content");
};
// Resets Input Values and Styling to default
const resetInputs = () => {
  const diffLabels = document.querySelectorAll(".difficulty-label");
  const numQuesInput = document.querySelector(".num-questions-input");
  const selectInput = document.querySelector(".category-select");
  const diffLabel = [...diffLabels].find((label) =>
    label.classList.contains("selected")
  );
  if (diffLabel) {
    diffLabel.classList.remove("selected");
    const radio = diffLabel.querySelector("input");

    radio.checked = false;
  }

  numQuesInput.value = 5;

  selectInput.value = 9;
};
// Check if a difficulty is selected
const checkSelectedDifficulty = () => {
  const labels = document.querySelectorAll(".difficulty-label");
  const label = [...labels].find(
    (label) => label.classList.contains("selected") && label.children[0].checked
  );
  const parent = document.querySelector(".difficulty-upper-container");
  console.log(label);
  if (!label) {
    parent.classList.add("show-diff-error");
    return false;
  }
  return true;
};
// Handle a form submit
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const isdiffInputVaid = checkSelectedDifficulty();
  if (isdiffInputVaid && isNumQuesValid && true) {
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const trivias = await sendDataToServer(data);
    resetInputs();

    resetGameVariables();
    setTriviasData(trivias);
    startQuiz();

    const parentContainer = document.querySelector(".quiz-container");
    hideGameSettings(parentContainer);
    showQuizContent(parentContainer);
  }
};

// Add event listener for the difficulty radio buttons
const addDifficultyBtnsEvtListener = () => {
  labels.forEach((label) => {
    const radio = label.querySelector("input");

    radio.addEventListener("change", () => {
      // Remove "selected" class from all labels
      labels.forEach((l) => l.classList.remove("selected"));

      // Add to the selected one
      if (radio.checked) {
        label.classList.add("selected");
      }
    });
  });
};
// Disable decrease num of questions button
const disableDecreaseBtn = () => {
  const decBtn = document.querySelector("#decrease-btn");
  decBtn.setAttribute("disabled", "");
};
// Disable increase num of questions button
const disableIncreaseBtn = () => {
  const incBtn = document.querySelector("#increase-btn");
  incBtn.setAttribute("disabled", "");
};
// Reenable diabled increase num of questions button
const reenableIncreaseBtn = () => {
  const incBtn = document.querySelector("#increase-btn");
  incBtn.removeAttribute("disabled");
};
// Reenable  diabled decrease num of questions button
const reenableDecreaseBtn = () => {
  const incBtn = document.querySelector("#decrease-btn");
  incBtn.removeAttribute("disabled");
};
// Check the number of questions with a min of 5 and max of 50.
const checkInputtedNumQues = (e) => {
  const inputVal = parseInt(e.target.value);

  const parent = document.querySelector(".num-ques-upper");
  const min = 5;
  const max = 50;

  reenableDecreaseBtn();
  reenableIncreaseBtn();

  if (inputVal >= min && inputVal <= max) {
    parent.classList.remove("show-num-ques-error");
    if (inputVal === min) {
      disableDecreaseBtn();
    } else if (inputVal === max) {
      disableIncreaseBtn();
    } else {
      reenableDecreaseBtn();
      reenableIncreaseBtn();
    }
    isNumQuesValid = true;
  } else {
    parent.classList.add("show-num-ques-error");
    parent.children[1].textContent = "Value must be between 5 and 50.";

    if (inputVal > max) {
      disableIncreaseBtn();
    } else {
      disableDecreaseBtn();
    }
    isNumQuesValid = false;
  }
};
// Add event listener to increase and decrease btn
const addNumQuestionsEvtListener = () => {
  const numQuestionsBtns = document.querySelectorAll(".num-questions-btn");
  const numQuestionsInput = document.querySelector("#num-questions-input");
  const parent = document.querySelector(".num-ques-upper");
  const MIN = 5;
  const MAX = 50;
  numQuestionsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      parent.classList.remove("show-num-ques-error");

      let currentValue = Number(numQuestionsInput.value);

      if (btn.id === "decrease-btn" && currentValue > MIN) {
        currentValue -= 1;
      } else if (btn.id === "increase-btn" && currentValue < MAX) {
        currentValue += 1;
      }
      numQuestionsInput.value = currentValue;
      if (currentValue <= MIN) {
        disableDecreaseBtn();
        if (currentValue < MIN) {
          parent.classList.add("show-num-ques-error");
          isNumQuesValid = false;
        }
      } else {
        reenableDecreaseBtn();
        isNumQuesValid = true;
      }

      if (currentValue >= MAX) {
        disableIncreaseBtn();
        if (currentValue > MAX) {
          parent.classList.add("show-num-ques-error");
          isNumQuesValid = false;
        }
      } else {
        reenableIncreaseBtn();
        isNumQuesValid = true;
      }
    });
  });
};
form.addEventListener("submit", handleFormSubmit);

addDifficultyBtnsEvtListener();
disableDecreaseBtn();

numQuestionsInput.addEventListener("input", (e) => checkInputtedNumQues(e));

addNumQuestionsEvtListener();
