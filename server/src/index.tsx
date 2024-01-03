// Import all functions from generatePrompts.tsx
import genUserPrompts, {
  genPromptv2,
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

export async function analyseUserInput(
  text: string
): Promise<number | Array<string>> {
  const systemPrompt = "You are a helpful assistant";
  const userPrompt = `"${text}" If more than 3 countries are mentioned, reply with the word "Less", else reply with each country's name only on each line`;
  const response = await query(systemPrompt, userPrompt, { model: "GPT3" });
  if (text.toLowerCase() === "yes") {
    return 0;
  } else if (text.toLowerCase() === "less") {
    return 2;
  }

  console.log("User input response: ", response);
  const listOfCountries = response.split("\n");
  return listOfCountries;
}

const countries = ["United States", "Japan", "Sweden"];
const countryString = generateCountries(countries);
const usev2: boolean = true;
// const userPrompt = usev2
//   ? genPromptv2(countryString)
//   : genUserPrompts(generateDuration(), countryString, generateStyleOfHumor());

const systemPrompt = process.env.SYSTEM_PROMPT;

const RUN_QUERY = true;

const SAMPLE_SYSTEM_PROMPT = "You are a helpful assistant.";
const SAMPLE_USER_PROMPT = "Whats 1 + 2?";

export async function main(userPrompt: string) {
  // Generate text content for page
  if (process.env.SYSTEM_PROMPT == null) {
    console.log("System prompt is not set!");
  } else {
    // console.log('System prompt is set to: "' + process.env.SYSTEM_PROMPT + '"');
    // console.log("User prompt is set to: " + userPrompt);
    return query(process.env.SYSTEM_PROMPT, userPrompt, { model: "GPT3" })
      .then(async (response) => {
        await incrementNumberOfRuns(RESULTS_PATH);
        await appendResults(
          RESULTS_PATH,
          process.env.SYSTEM_PROMPT,
          userPrompt,
          response
        );
        console.log("Xuan 2: ", response);
        return response;
      })
      .catch((err) => console.error(err));
  }
}

// main("London, Paris, and Japan.");
