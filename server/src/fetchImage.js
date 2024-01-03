import fs from "fs";
import { checkIfCountryImagesExist } from "./checkImage.js";
import {
  writeTextToFile,
  readTextFileAndConvertToJson,
} from "./utils/writeTextToFile.js";
import fetch from "node-fetch";
import { createApi } from "unsplash-js";
import { config } from "dotenv";
import path from "path";

global.fetch = fetch;
config();

export function generateImagePath(countryName, mode = "normal") {
  return process.cwd() + `/src/country_images/${countryName}_${mode}.txt`;
}

export function generateJsonPath(countryName) {
  return process.cwd() + `/src/country_json/${countryName}.txt`;
}

export async function fetchAndSaveImage(countryName) {
  const unsplash = createApi({ accessKey: process.env.UNSPLASH_ACCESS_KEY });
  const responses = await unsplash.search.getPhotos({ query: countryName });
  //   const responses = JSON.stringify(photos, null, 2);

  // temp
  // const jsonResponse = readTextFileAndConvertToJson(generateJsonPath(countryName));

  // console.log(responses);

  // Call the function with your response data and the desired filename
  writeTextToFile(
    JSON.stringify(responses, null, 2),
    generateJsonPath(countryName)
  );
  extractAndWriteURLsToFile(
    responses,
    `${generateImagePath(`${countryName}`)}`,
    "normal"
  );
  extractAndWriteURLsToFile(
    responses,
    `${generateImagePath(countryName, "landscape")}`,
    "landscape"
  );
}

// Function to extract and write URLs to a text file
function extractAndWriteURLsToFile(responses, filename, mode = "normal") {
  const rawURLs = responses.response.results
    .map((result) => {
      if (mode == "landscape" && result.width > result.height) {
        return result.urls.raw;
      } else if (mode == "normal" && result.width <= result.height) {
        return result.urls.raw;
      } else {
        return null;
      }
    })
    .filter((url) => url !== null);

  console.log("Xuan: ", rawURLs);
  // Join the URLs with newlines to create the text content
  const textContent = rawURLs.join("\n");

  // Write the content to a text file
  fs.writeFileSync(filename, textContent, "utf8");
  console.log(`URLs have been written to ${filename}`);
}

// Example Usage

// const countryName = "india";
// if (checkIfCountryImagesExist(countryName)) {
// } else {
//   fetchAndSaveImage(countryName);
// }

// console.log(generateImagePath("india", "landscape"));
