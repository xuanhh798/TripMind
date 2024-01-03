import assert from "assert";
import express from "express";
import axios from "axios";
import { analyseUserInput, main } from "./src/index.tsx";
import { config } from "dotenv";
import { genPromptv2, generateCountries } from "./src/generatePrompts.tsx";
import { processTextData } from "./src/processTextData.tsx";

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
    console.log("list of countries", listOfCountries);
    // TODO: Update code to inform user that the input is not valid
    if (listOfCountries === 0) {
      console.error("User input is not valid");
      res.status(418).send("User input is not valid");
    } else if (listOfCountries === 2) {
      console.error(
        "User input has more than 3 countries which is more than what is supported currently."
      );
      res
        .status(418)
        .send(
          "User input has more than 3 countries which is more than what is supported currently."
        );
    }

    assert(Array.isArray(listOfCountries));
    const userPrompt = genPromptv2(generateCountries(listOfCountries));

    // OpenAI API call
    const gptTextResponse = await main(userPrompt);
    console.log("Xuan response:", gptTextResponse);

    if (gptTextResponse != null) {
      const response = await processTextData(gptTextResponse, listOfCountries);
      console.log("Final response to be returned:", response);
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
