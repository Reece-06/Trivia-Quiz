import path from "path";
import { fileURLToPath } from "url";

// simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname + "/src", "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
};
