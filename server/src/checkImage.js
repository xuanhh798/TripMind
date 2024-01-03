import fs from "fs";

function doesFileExistInDirectory(directoryPath, filename) {
  try {
    const files = fs.readdirSync(directoryPath);
    return files.includes(filename);
  } catch (error) {
    // Handle any errors that may occur while reading the directory
    console.error(
      `Error checking if ${filename} exists in ${directoryPath}: ${error}`
    );
    return false; // Return false in case of an error
  }
}

export function checkIfCountryImagesExist(countryName) {
  // Example usage:
  const filenameToCheck = `${countryName}_normal.txt`; // Replace with the filename you want to check
  const directoryPath = process.cwd() + "/src/country_images"; // Replace with the actual directory path

  const fileExists = doesFileExistInDirectory(directoryPath, filenameToCheck);
  if (fileExists) {
    console.log(`${filenameToCheck} exists in ${directoryPath}`);
    return true;
  } else {
    console.log(`${filenameToCheck} does not exist in ${directoryPath}`);
    return false;
  }
}
