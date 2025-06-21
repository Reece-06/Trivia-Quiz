import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import webpackCommon from "./webpack.common.js";
import { merge } from "webpack-merge";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);

export default merge(webpackCommon, {
  mode: "development",

  output: {
    filename: "main.js",
    path: path.resolve(__dirname + "/src", "dist"),
  },
});
