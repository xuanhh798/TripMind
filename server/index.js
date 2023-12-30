import OpenAI from "openai";
import { config } from "dotenv";
config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// WARNING: Don't abuse this endpoint! It's not meant for production use.
// GPT-3 costs $0.06 per query, and GPT-4 costs $0.2 per query.
async function main() {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: "What is the median age of citizens in Japan?",
      },
    ],
  });

  console.log(completion.choices[0]);
}

main();
