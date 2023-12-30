// Import all functions from generatePrompts.tsx
import genUserPrompts, {
  generateDuration,
  generateCountries,
  generateStyleOfHumor,
} from "./generatePrompts.tsx";
import OpenAI from "openai";
import { config } from "dotenv";
import {
  appendResults,
  incrementNumberOfRuns,
  RESULTS_PATH,
} from "./utils/utils.tsx";
config();

const openai = new OpenAI();

// WARNING: Don't abuse this endpoint! It's not meant for production use.
// GPT-3 costs $0.06 per query, and GPT-4 costs $0.2 per query.
async function query(
  systemPrompt: string,
  userPrompt: string,
  opts?: { model?: string }
): Promise<string> {
  const { model } = opts != null ? opts : { model: null };
  const MODELS = { GPT3: "gpt-3.5-turbo", GPT4: "gpt-4" };

  const targetModel = model != null ? MODELS[model] : MODELS.GPT3;

  // WARNING: Exercise caution when choosing the model due to cost of API calls.
  console.log(`Querying ${targetModel}..\n`);
  console.log(`System prompt: ${systemPrompt}\n`);
  console.log(`User prompt: ${userPrompt}\n`);
  const completion = await openai.chat.completions.create({
    model: targetModel,
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const chatGPTResponse = completion.choices[0].message.content;
  if (chatGPTResponse == null) {
    throw new Error(`ERR: Server query failed with response: ${completion}`);
  }
  await console.log(`response: ${chatGPTResponse}\n`);
  return chatGPTResponse;
}

function test() {
  console.log("test");
}

const SAMPLE_SYSTEM_PROMPT = "You are a helpful assistant.";
const SAMPLE_USER_PROMPT = "Whats 1 + 2?";

const userPrompt = genUserPrompts(
  generateDuration(),
  generateCountries(["United States", "Japan", "Sweden"]),
  generateStyleOfHumor()
);
const systemPrompt = process.env.SYSTEM_PROMPT;

const RUN_QUERY = true;

if (RUN_QUERY && systemPrompt) {
  const targetModel = "GPT3";

  query(systemPrompt, userPrompt, { model: targetModel })
    .then(async (response) => {
      await incrementNumberOfRuns(RESULTS_PATH);
      await appendResults(RESULTS_PATH, systemPrompt, userPrompt, response);
    })
    .catch((err) => console.error(err));
} else {
  console.log("Query skipped.");
}
