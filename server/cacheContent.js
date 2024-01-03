import fs from "fs/promises";

export async function writeObjectToFile(obj, filename) {
  const jsonString = JSON.stringify(obj, null, 2); // Stringify the object with pretty print

  fs.writeFile(filename, jsonString, "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
}

export async function readObjectFromFile(filename) {
  try {
    const data = await fs.readFile(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("An error occurred:", err);
    throw err; // Rethrow the error for the caller to handle
  }
}

export function generateCachePath() {
  return process.cwd() + `/src/content_cache/contentCache.txt`;
}

// Example usage
// writeObjectToFile(myObject, generateCachePath);
