// api/chat.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { model, message } = req.body;
  const API_KEY = "f193e639dca0455aa5de331d602bb59f"; // your key (safe here)

  try {
    const response = await fetch("https://api.sambanova.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: "You are a helpful, friendly assistant." },
          { role: "user", content: message }
        ],
        max_tokens: 600,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || "⚠️ No response.";
    res.status(200).json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
