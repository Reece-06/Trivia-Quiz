import express from "express";
import axios from "axios";

const triviaGame = express();
const port = 3000;
const API_URL = "https://opentdb.com";
const API_ENDPOINT = "/api.php";
triviaGame.use(express.static("public"));
triviaGame.use(express.json());
triviaGame.get("/", (req, res) => {
  res.render("index.ejs");
});

triviaGame.post("/questions", async (req, res) => {
  const gameSettings = req.body;

  const data = {
    amount: gameSettings.numQuestions,
    category: gameSettings.category,
    difficulty: gameSettings.difficulty,
  };

  const URL = `${API_URL}${API_ENDPOINT}?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`;
  const response = await axios.get(URL);
  console.log(response.data.results);

  res.json(response.data.results);
});
triviaGame.get("/numberQuestions/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await axios.get(
    "https://opentdb.com/api_count.php?category=" + id
  );
  console.log(response.data);
  res.json(response.data.category_question_count);
});
// triviaGame.get("/categories", async (req, res) => {
//   const response = await axios.get("https://opentdb.com/api_category.php");
//   console.log(response.data);
//   res.json(response.data);
// });

triviaGame.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
