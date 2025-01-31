import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "http://localhost:11434/v1", // Point to Ollama
  apiKey: "ollama", // Dummy key (not needed but required by SDK)
});

async function chatWithDeepSeek() {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-coder",
      messages: [
        { role: "system", content: "You are an AI that strictly responds in valid JSON format." },
        { role: "user", content: "Generate a JavaScript function to reverse a string and return in JSON format." }
      ],
      temperature: 0.7,
    });

    console.log(response.choices[0].message);
  } catch (error) {
    console.error("Error:", error);
  }
}

chatWithDeepSeek();
