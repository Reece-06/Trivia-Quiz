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
// triviaGame.get("/api/getQuestions", async (req, res) => {
//   const amount = req.query.amount || 10;

//   try {
//     const result = await axios.get(
//       `${API_URL}${API_ENDPOINT}?amount=${amount}`
//     );

//     // res.render("index.ejs");
//     console.log(result.data);
//     console.log(res.status);
//   } catch (error) {
//     console.log(error);
//   }
// });
triviaGame.post("/questions", async (req, res) => {
  const gameSettings = req.body;

  const data = {
    amount: gameSettings.numQuestions,
    category: gameSettings.category,
    difficulty: gameSettings.dificulty,
  };
  console.log(data);
  const URL = `${API_URL}${API_ENDPOINT}?amount=${data.amount}&category=${data.category}&difficulty=${data.difficulty}&type=multiple`;
  const response = await axios.get(URL);
  console.log(response.data.results);
  res.render("index.ejs", data);
});
triviaGame.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
