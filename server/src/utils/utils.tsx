import path from "path";
import fs from "fs/promises";

export const RESULTS_PATH = process.cwd() + "/src/results/results.txt";

function testWriteTo() {
  const fs = require("fs");
  fs.appendFile("test.txt", "Hey there!", function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
}

async function getNumberOfRuns(fileName) {
  try {
    const data = await fs.readFile(fileName, "utf8");
    const lines = data.split("\n");
    if (lines.length > 0) {
      const firstLine = lines[0];
      const lastChar = firstLine[firstLine.length - 1];
      const number = parseInt(lastChar, 10);

      if (!isNaN(number)) {
        return number;
      } else {
        throw new Error("Last character is not a number");
      }
    } else {
      throw new Error("File is empty");
    }
  } catch (err) {
    console.error("Error:", err);
    throw err; // or handle the error as needed
  }
}

export async function incrementNumberOfRuns(fileName) {
  try {
    let data = await fs.readFile(fileName, "utf8");
    let lines = data.split("\n");

    if (lines.length > 0) {
      let firstLine = lines[0];
      let lastChar = firstLine[firstLine.length - 1];
      let number = parseInt(lastChar, 10);

      if (!isNaN(number)) {
        // Increment the number
        number++;

        // Replace the last character with the new number
        firstLine = firstLine.substring(0, firstLine.length - 1) + number;
        console.log(firstLine);
        lines[0] = firstLine;

        // Join the lines back into a single string
        data = lines.join("\n");

        console.log(data);
        // Write the updated content back to the file
        await fs.writeFile(fileName, data, { encoding: "utf8", flag: "w+" });
        console.log("File updated successfully");
        return number;
      } else {
        throw new Error("Last character is not a number");
      }
    } else {
      throw new Error("File is empty");
    }
  } catch (err) {
    console.error("Error:", err);
    throw err; // or handle the error as needed
  }
}

export async function appendResults(filename, string1, string2, string3) {
  try {
    await fs.appendFile(filename, "\n");
    await fs.appendFile(filename, string1 + "\n");
    await fs.appendFile(filename, string2 + "\n");
    await fs.appendFile(filename, string3);
    console.log("Strings appended successfully");
  } catch (err) {
    console.error("Error appending to file:", err);
    throw err;
  }
}

// Example usage:
async function main() {
  const res = await getNumberOfRuns(RESULTS_PATH)
    .then((number) =>
      console.log(
        "Operation completed successfully: Number of runs so far is: ",
        number
      )
    )
    .catch((err) => console.error(err));

  console.log(res);

  // Example usage:
  const res2 = await incrementNumberOfRuns(RESULTS_PATH)
    .then((number) =>
      console.log(
        "Operation completed successfully: incremented number of runs to " +
          number
      )
    )
    .catch((err) => console.error(err));
}
