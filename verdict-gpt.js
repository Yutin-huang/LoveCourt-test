import express from "express";
import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();
console.log("DEBUG KEY:", process.env.OPENAI_API_KEY);


const router = express.Router();


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("API KEY:", process.env.OPENAI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { complaint } = req.body;

    if (!complaint) {
      return res.status(400).json({ error: "缺少控訴內容" });
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
          content: `${complaint}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 100,
    });

    const verdict = completion.choices?.[0]?.message?.content;
    res.status(200).json({ verdict });
  } catch (err) {
    console.error("GPT 錯誤：", err);
    res.status(500).json({ error: "GPT 回應失敗" });
  }
});

export default router;
