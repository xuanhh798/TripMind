import fs from "fs";
import readline from "readline";
import { generateImagePath } from "./fetchImage.js";

function getRandomLineFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        const lines = data.split("\n");
        resolve(lines[Math.floor(Math.random() * lines.length)]);
      }
    });
  });
}

const countryName = "singapore";
const filename = generateImagePath(countryName, "normal"); // Replace with the path to your text file

// Async function to use await
export async function getAndPrintRandomLine(filePath) {
  try {
    const line = await getRandomLineFromFile(filePath);
    console.log(line);
    return line;
  } catch (error) {
    console.error(error);
  }
}

// console.log(await getAndPrintRandomLine(filename));
