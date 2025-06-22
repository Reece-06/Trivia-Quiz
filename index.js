import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
const triviaGame = express();
const port = 3000;
const API_URL = "https://opentdb.com";
const API_ENDPOINT = "/api.php";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

triviaGame.use(express.static(path.join(__dirname, "src", "dist")));
triviaGame.use(express.json());

triviaGame.get("/", (req, res) => {
  // res.render("index.ejs");
  res.sendFile(path.join(__dirname, "src", "dist", "index.html"));
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

  res.json(response.data.results);
});
triviaGame.get("/numberQuestions/:id", async (req, res) => {
  const id = Number(req.params.id);
  const response = await axios.get(
    "https://opentdb.com/api_count.php?category=" + id
  );

  res.json(response.data.category_question_count);
});

triviaGame.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
