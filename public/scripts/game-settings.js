const form = document.querySelector(".form");
const labels = document.querySelectorAll(".difficulty-label");

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
  parentContainer.classList.toggle("hide-game-settings");
};
// Show quiz content
const showQuizContent = (parentContainer) => {
  parentContainer.classList.toggle("show-quiz-content");
};
// Handle a form submit
const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  console.log(formData.entries());
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const trivias = sendDataToServer(data);
  const parentContainer = document.querySelector(".quiz-container");
  hideGameSettings(parentContainer);
  showQuizContent(parentContainer);
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
// Add event listener to increase and decrease btn
const addNumQuestionsEvtListener = () => {
  const numQuestionsBtns = document.querySelectorAll(".num-questions-btn");
  const numQuestionsInput = document.querySelector("#num-questions-input");
  const MIN = 5;
  const MAX = 50;
  numQuestionsBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let currentValue = Number(numQuestionsInput.value);

      if (btn.id === "decrease-btn" && currentValue > MIN) {
        currentValue -= 5;
      } else if (btn.id === "increase-btn" && currentValue < MAX) {
        currentValue += 5;
      }
      numQuestionsInput.value = currentValue;
      if (currentValue <= MIN) {
        disableDecreaseBtn();
      } else {
        reenableDecreaseBtn();
      }

      if (currentValue >= MAX) {
        disableIncreaseBtn();
      } else {
        reenableIncreaseBtn();
      }
    });
  });
};
form.addEventListener("submit", handleFormSubmit);

addDifficultyBtnsEvtListener();
disableDecreaseBtn();
addNumQuestionsEvtListener();
