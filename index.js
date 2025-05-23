import express from "express";
import axios from "axios";

const triviaGame = express();
const port = 3000;

triviaGame.use(express.static("public"));

triviaGame.get("/", (req, res) => {
  res.render("index.ejs");
});
triviaGame.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
