// test-gpt-key.js
import dotenv from "dotenv";
import fetch from "node-fetch";

// 載入 .env
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("❌ 沒有讀到 OPENAI_API_KEY，請檢查 .env 設定");
  process.exit(1);
}

console.log("🔑 成功讀到金鑰開頭：", OPENAI_API_KEY.slice(0, 10) + "...");

async function testGPTConnection() {
  console.log("⏳ 測試 GPT API 連線中...");

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "user", content: "請用一句話回應：我今天吵架了。" }
        ],
        temperature: 0.7,
        max_tokens: 50
      })
    });

    const data = await res.json();

    if (data.choices && data.choices[0]) {
      console.log("✅ GPT 回應成功：", data.choices[0].message.content.trim());
    } else {
      console.error("⚠️ GPT 沒有回應，錯誤資料：", data);
    }
  } catch (err) {
    console.error("❌ 無法連線到 GPT：", err.message);
  }
}

// 執行測試
testGPTConnection();
