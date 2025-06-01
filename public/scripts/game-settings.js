const form = document.querySelector(".form");
// Send data to server
const sendDataToServer = async (data) => {
  try {
    const response = await fetch("/questions", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Server response:", response.data);
  } catch (error) {
    console.log(error);
  }
};
// Handle a form submit
const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  console.log(formData.entries());
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  sendDataToServer(data);
};

form.addEventListener("submit", handleFormSubmit);
