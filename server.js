import express from "express";
import path from "path";
import dotenv from "dotenv";
import verdictGPT from "./verdict-gpt.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 靜態檔案
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// GPT API 路由
app.use(verdictGPT);

// 首頁
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
