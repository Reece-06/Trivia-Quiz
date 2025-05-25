const form = document.querySelector(".form");
// Handle a form submit
const handleFormSubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  console.log(formData.entries());
  const data = Object.fromEntries(formData.entries());
  console.log(data);
};

form.addEventListener("submit", handleFormSubmit);
