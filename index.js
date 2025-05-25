import express from "express";
import axios from "axios";

const triviaGame = express();
const port = 3000;
const API_URL = "https://opentdb.com";
const API_ENDPOINT = "/api.php";
triviaGame.use(express.static("public"));

triviaGame.get("/", (req, res) => {
  res.render("index.ejs");
});
triviaGame.get("/api/getQuestions", async (req, res) => {
  const amount = req.query.amount || 10;

  try {
    const result = await axios.get(
      `${API_URL}${API_ENDPOINT}?amount=${amount}`
    );

    // res.render("index.ejs");
    console.log(result.data);
    console.log(res.status);
  } catch (error) {
    console.log(error);
  }
});
triviaGame.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
