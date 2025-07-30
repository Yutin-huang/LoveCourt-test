import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import verdictRouter from "./verdict-gpt.js";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 靜態檔案
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// GPT API 路由：掛載在 /api/verdict
app.use("/api/verdict", verdictRouter);

// 首頁
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
