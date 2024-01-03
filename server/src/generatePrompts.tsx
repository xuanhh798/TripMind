export function genPromptv2(countryString: string) {
  const resultString = [
    "Imagine you are writing a medium article,",
    "write an article for a trip to",
    countryString,
    "that keeps readers hooked,",
    "with an undertone of dark humor,",
    "without using the word dark and humor,",
    "in 1500 words. separate section by country with title in square brackets, always start with an introduction title and paragraph",
  ].join(" ");

  return resultString;
}

function genUserPrompts(
  duration: string,
  countries: string,
  humor: string,
  opts?: { translateLanguage?: boolean }
) {
  const resultString = [
    "Imagine you are writing a medium article,",
    "write an article for a",
    duration,
    "trip to",
    countries,
    "that keeps readers hooked,",
    humor,
  ].join(" ");

  return resultString;
}

export function generateStyleOfHumor(
  humorType?: string,
  explicitExclude?: boolean
) {
  const DEFAULT_STYLE = "USEFULDARK";

  // Useful + dark is very effective in text generation.
  const styles = {
    DARK: "with an undertone of dark humor,",
    USEFULDARK:
      "providing a mix of useful travel advice with an undertone of dark humor,",
  };

  let ret = humorType != null ? styles[humorType] : styles[DEFAULT_STYLE];

  if (explicitExclude) {
    return [ret, "without using the word dark or humor,"].join(" ");
  }

  return ret;
}

// A function that accepts number of days and returns a string in the form of "w years, x months, y weeks, z days".
export function generateDuration(days?: number) {
  if (days == null) {
    return "1 week";
  }
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  const weeks = Math.floor(((days % 365) % 30) / 7);
  const days2 = Math.floor(((days % 365) % 30) % 7);

  let res = "";
  if (years > 0) {
    res += `${years} years, `;
  }
  if (months > 0) {
    res += `${months} months, `;
  }
  if (weeks > 0) {
    res += `${weeks} weeks, `;
  }
  if (days2 > 0) {
    res += `${days2} days`;
  }

  return res;
}

// Write a function that accepts an array of countries and returns a grammtically correct string of countries with "and" concatenated.
export function generateCountries(countries?: string[]) {
  if (countries == null) {
    return "Japan";
  }

  if (countries.length == 1) {
    return countries[0];
  }
  let res = "";
  for (let i = 0; i < countries.length - 1; i++) {
    res += `${countries[i]}, `;
  }
  res += `and ${countries[countries.length - 1]}`;
  return res;
}

function generateLanguages() {
  const DEFAULT_LANGUAGE = "Chinese";

  const languages = new Set([
    "English",
    "Chinese",
    "Hindi",
    "Spanish",
    "French",
    "Standard Arabic",
    "Bengali",
    "Russian",
    "Portuguese",
    "Indonesian",
    "Urdu",
    "German",
    "Japanese",
    "Swahili",
    "Marathi",
    "Telugu",
    "Turkish",
    "Korean",
    "Vietnamese",
    "Tamil",
  ]);

  return DEFAULT_LANGUAGE;
}

export default genUserPrompts;
