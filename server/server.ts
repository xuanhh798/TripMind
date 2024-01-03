import assert from "assert";
import express from "express";
import { analyseUserInput, main } from "./src/index.tsx";
import { config } from "dotenv";
import { genPromptv2, generateCountries } from "./src/generatePrompts.tsx";
import { processTextData } from "./src/processTextData.tsx";
import {
  writeObjectToFile,
  readObjectFromFile,
  generateCachePath,
} from "./cacheContent.js";

config();

const app = express();
app.use(express.json());

// npx tsx server.ts --watch
app.post("/api", async (req, res) => {
  try {
    // user input text
    const { inputText } = req.body;
    console.log("Submitted value:", inputText);

    const listOfCountries = await analyseUserInput(inputText);

    // TODO: Update code to inform user that the input is not valid
    if (listOfCountries == null) {
      console.error("User input is not valid");
      return res.status(418).send("User input is not valid");
    }

    // Read cache if country combination exists already
    // If so, we can just return the cached response
    const cache = await readObjectFromFile(generateCachePath());
    const countryKey = listOfCountries.join("").toLowerCase();
    const potentialHit = cache[countryKey];
    if (potentialHit) {
      return res.status(200).send({ response: potentialHit });
    }

    console.log("list of countries", listOfCountries);

    assert(Array.isArray(listOfCountries));
    const userPrompt = genPromptv2(generateCountries(listOfCountries));

    // OpenAI API call
    const gptTextResponse = await main(userPrompt, "GPT4");
    console.log("Xuan response:", gptTextResponse);

    if (gptTextResponse != null) {
      const response = await processTextData(gptTextResponse, listOfCountries);
      console.log("Final response to be returned:", response);

      // cache result
      await writeObjectToFile(
        { ...cache, [countryKey]: response },
        generateCachePath()
      );
      res.status(200).send({ response });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Error processing the request");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server runni ng on port ${PORT}`);
});
