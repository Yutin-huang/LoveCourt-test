import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const { complaint } = req.body;

  if (!complaint || typeof complaint !== 'string') {
    return res.status(400).json({ error: 'Invalid complaint content' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `
你是戀愛法庭的法官，根據對方的戀愛罪狀，給出一個俏皮懲罰感的「戀愛判決書」建議。
格式如下：
被告被起訴為【罪名】
建議：「...」
判決：「...」
請使用繁體中文回答，總字數不超過 100 字，語氣溫柔中帶點俏皮懲罰感。
          `,
        },
        {
          role: 'user',
          content: `被告被起訴為戀愛罪，罪狀是：「${complaint}」`,
        },
      ],
      temperature: 0.8,
    });

    const verdict = completion.choices[0].message.content;
    res.status(200).json({ verdict });
  } catch (error) {
    console.error('GPT API Error:', error);
    res.status(500).json({ error: '系統錯誤，請稍後再試。', message: error.message });
  }
}
