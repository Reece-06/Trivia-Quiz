const form = document.querySelector(".form");

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

form.addEventListener("submit", handleFormSubmit);
