import fs from "fs";

export function writeTextToFile(text, filePath) {
  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error("An error occurred:", err);
      return;
    }
    console.log("Text has been written to", filePath);
  });
}

export function readTextFileAndConvertToJson(filename) {
  try {
    // Read the content of the text file
    const fileContent = fs.readFileSync(filename, "utf8");

    // Parse the content into a JSON object
    const jsonObject = JSON.parse(fileContent);

    return jsonObject;
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return null;
  }
}
