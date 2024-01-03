import { getAndPrintRandomLine } from "./getRandomImageURL.js";
import { checkIfCountryImagesExist } from "./checkImage.js";
import { generateImagePath, fetchAndSaveImage } from "./fetchImage.js";

export async function processTextData(text: string, listOfCountries: string[]) {
  const sections = text.split(/\n\n/); // Split the text into sections based on double line breaks

  const result = {
    title: "",
    subheadings: [],
    paragraphs: [],
    previewImages: [],
    contentImages: [],
  };

  let index = 0;

  // Process images

  const previewImages: string[] = [];
  const contentImages: string[] = [];
  for (let i = 0; i < listOfCountries.length; i++) {
    let country = listOfCountries[i];
    if (!checkIfCountryImagesExist(country)) {
      // fetch and save images
      await fetchAndSaveImage(country);
    }

    const landscapeImagePath = generateImagePath(country, "landscape");
    const normalImagePath = generateImagePath(country, "landscape");
    result.previewImages.push(await getAndPrintRandomLine(landscapeImagePath));
    result.contentImages.push(await getAndPrintRandomLine(normalImagePath));
  }

  // Process text
  sections.forEach((section: string) => {
    const lines = section.split("\n");
    // const heading = lines[0].trim();
    const content = lines.slice(0).join("\n").trim();

    if (content === "") {
      // Empty section, skip it
      return;
    }

    if (content.startsWith("[") && content.endsWith("]")) {
      // This is a title or subheading
      if (result.title === "") {
        // The first non-empty section is considered the title
        result.title = content.substring(1, content.length - 1);
        result.subheadings.push(null);
      } else {
        result.subheadings.push(content.substring(1, content.length - 1));
        // Next paragraph
        index += 1;
      }
    } else {
      // Other non-empty sections are considered paragraphs
      if (result.paragraphs.length < index + 1) {
        result.paragraphs.push([]);
      }
      result.paragraphs[index].push(content);
    }
  });

  return result;
}

// Example usage:
const textData = `[Title: Embark on a Wild Journey through Thailand, Malaysia, and Indonesia]

Introduction:
Buckle up, fellow adventurers! Are you ready to embark on an unforgettable journey through the vibrant and enchanting lands of Thailand, Malaysia, and Indonesia? Get ready to be swept off your feet as we explore these captivating countries, uncovering hidden gems, indulging in exotic cuisines, and immersing ourselves in the rich cultures that await us. So, grab your sense of adventure and let's dive headfirst into this thrilling escapade!

[Section 1: Thailand - The Land of Smiles]

Picture-perfect beaches, glittering temples, and bustling street markets - welcome to Thailand, the Land of Smiles! But don't be fooled by the friendly faces; this country has a wild side that's just waiting to be discovered. 

1. Unleash Your Inner Party Animal in Bangkok:
Start your Thai adventure in the vibrant capital of Bangkok, where the chaos is oddly charming. Explore the buzzing night markets, sample mouth-watering street food, and lose yourself in the notorious nightlife scene. Just remember to dance like nobody's watching (because, let's face it, they probably are!).

2. Chill Out in the Tropical Paradise of Krabi:
Escape the city madness and head down to the idyllic beaches of Krabi. With its crystal-clear waters, limestone cliffs, and stunning sunsets, this is the perfect spot to unwind. Soak up the sun, indulge in some water activities, and let the worries of the world drift away.

3. Get Adventurous in Chiang Mai:
Craving a bit of adrenaline? Chiang Mai has got you covered! Try your hand at jungle trekking, ride an elephant (responsibly, of course!), and explore the awe-inspiring temples that dot the city. Just be prepared for a few surprises along the way – this is Southeast Asia, after all!

[Section 2: Malaysia - Where Culture Meets Nature]

Diverse cultures, lush rainforests, and tantalizing street food - Malaysia is a hidden gem that will leave you wanting more. Get ready to venture off the beaten path and discover the wonders that await you.

1. Explore the Melting Pot of Cultures in Kuala Lumpur:
Start your Malaysian escapade in the vibrant melting pot of Kuala Lumpur. Immerse yourself in the colorful blend of Malay, Chinese, and Indian influences as you explore the bustling streets, iconic Petronas Towers, and feast on mouth-watering street food that will blow your taste buds away.

2. Venture into the Enchanting Rainforests of Borneo:
No trip to Malaysia is complete without a journey into the wild heart of Borneo. Discover the awe-inspiring biodiversity as you trek through dense jungles, spot orangutans swinging from treetops, and sail along winding rivers. Get ready to be awestruck by Mother Nature's awe-inspiring creations.

3. Unwind in the Pristine Beauty of Langkawi:
End your Malaysian adventure on the tranquil shores of Langkawi, a tropical paradise that will leave you breathless. Indulge in some island hopping, snorkeling in crystal-clear waters, or simply relax on the white sandy beaches. Just be careful not to become a permanent beach bum!

[Section 3: Indonesia - A Fest of Paradise Islands]

Prepare to be enchanted by the mesmerizing beauty of Indonesia. With its postcard-worthy landscapes, ancient temples, and warm-hearted locals, this country is a feast for the senses.

1. Lose Yourself in the Majestic Temples of Bali:
Begin your Indonesian adventure in the magical island of Bali, where ancient temples and spiritual vibes abound. Explore the famous Tanah Lot, marvel at the intricate carvings of Pura Besakih, and find your zen in the lush rice terraces of Ubud. Who knows, you might even find your spirit animal along the way!

2. Dive into the Underwater Wonderland of Raja Ampat:
Looking for an underwater adventure like no other? Look no further than the mesmerizing Raja Ampat Islands. Dive into the crystal-clear waters, swim alongside colorful coral reefs, and get up close and personal with an array of marine life. Just keep your eyes peeled for any fishy characters!

3. Get Lost in Paradise on the Gili Islands:
As your Indonesian journey comes to an end, make sure to pay a visit to the enchanting Gili Islands. Picture swaying palm trees, pristine white sand, and turquoise waters that stretch as far as the eye can see. Channel your inner castaway as you sip on fresh coconuts, soak up the sunshine, and let the island vibes wash over you.

Conclusion:
And there you have it, fellow adventure-seekers – a wild journey through Thailand, Malaysia, and Indonesia that will leave you with memories to last a lifetime. From bustling cities to tranquil beaches, from ancient temples to vibrant street markets, these three countries have it all. So, pack your bags, leave your worries behind, and get ready to embrace the unknown. Remember, life is too short to stay in one place, so let's go out and explore the world – one crazy adventure at a time! Bon voyage!`;

// Example usage:

// const processedData = await processTextData(textData, [
//   "Thailand",
//   "malaysia",
//   "Indonesia",
// ]);
// console.log(processedData);
