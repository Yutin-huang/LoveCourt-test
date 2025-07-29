import express from "express";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/api/verdict", async (req, res) => {
  try {
    const { complaint } = req.body;
    console.log("📥 收到控訴：", complaint);

    if (!complaint) {
      return res.status(400).json({ error: "沒有控訴內容" });
    }

   const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "system",
      content: `你是一位戀愛法官，請根據使用者的控訴內容給出戀愛罪名，給予如心理諮商師般的建議與可愛的懲罰。請記得被判決對象都是「對方」。請使用以下格式回覆：

被告被起訴為【罪名】
建議：「」
判決：本庭判定被告需「判決內容」
請使用繁體中文回答，總字數不超過 100 字，語氣溫柔中帶點俏皮懲罰感。`,
    },
    {
      role: "user",
      content: `${complaint}\n請用「溫柔中帶點俏皮懲罰感」的語氣，不超過一百字`,
    },
  ],
  temperature: 0.9,
  max_tokens: 100,
});



    const verdict = completion.choices?.[0]?.message?.content;
    console.log("📝 判決結果：", verdict);

    res.json({ verdict });
  } catch (err) {
    console.error("❌ GPT 錯誤：", err);
    res.status(500).json({ error: "GPT 無法處理請求" });
  }
});

export default router;
