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

  //   console.log("Section: ", sections);
  // Process text
  sections.forEach((section: string) => {
    const lines = section.split("\n");
    // console.log("Lines", lines);
    // const content = lines.slice(0).join("\n").trim();
    lines.forEach((content: string) => {
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
  });

  return result;
}

// Example usage:
const textData = `[Introduction]

Take a deep breath, folks, because you're about to embark on a wild ride, a roller-coaster of a journey across three continents like no other. We're setting our GPS to the nooks and crannies of India, Belgium, and London, and believe me, it's no average tour. When I say roller-coaster, I mean it. Prepare for a whirlwind of flavors, sights, smells, cultures... and perhaps the occasionally dodgy public toilet. 

[India: Dances, Desert, and Delicacies]
 
India, the spicy subcontinent where intensity is not just a character trait, but a way of life. Here, you'll swerve, parry, and thrust through traffic that would make a New York cabbie flinch. Cows have the right of way, and don't you forget it. Forever immortalized through the cinematic lens in "Slumdog Millionaire," this country's chaos and calm is as mixed as their famous masala chai.

Your travel trajectory should start from Delhi, with its gloriously historical architecture and endearing attempts at traffic rules. Next stop, the iconic Taj Mahal, because who wouldn't want a brokenhearted dude's monument to love etched forever in gleaming white marble? From there, direct your camel (yes, you heard it right!) to the sand dunes of Rajasthan, where age-old traditions converse with you through vivid colors and vibrant dances. Do remember to indulge your taste buds with Indian delicacies. If they don't burn your tongue numb, you're doing it all wrong.

[Belgium: Beer, Waffles and More B]
 
Next, we jaunt off somewhat abruptly to Belgium—a place so rainy, they have their own brand of "waterproof happiness." This is the land where beer flows like water, chocolatiers dare to concoct absurdly delicious creations, and the humble waffle has risen to near royal status. 

In Brussels, watch out for the sulking statue, Manneken Pis, that attempts to accessorize the perfectly-cobbled streets with a steady stream of, shall we say, “refreshments.” The Grand Palace will make your eyes pop with an overdose of decorative opulence, while the Atomium, a 335-feet tall homage to an iron crystal cell, will bemuse you with its bizarre beauty. 

Coupled with jolly locals who pursue the philosophy 'why frown when you can laugh with a mouth full of fries?' it's fair to say Belgium is a small country where boredom is outlawed.

[London: Pints, Pomp and Peculiarities]

Robbie Burns once wrote, "The best-laid plans of mice and men often go awry." He must have been talking about the London Underground during peak hours. Welcome to London, the grand old dame who never fails to surprise you with her mishmash of pomp, history, and quirky sense of fun.

Take a cultured turn around the British Museum, arguably the largest case of institutional kleptomania in the world. Wander through the labyrinth of Soho, dodging overly enthusiastic theater promoters and running into the occasional celebrity hiding behind quintessentially British dark glasses. Make sure to enjoy a pint (or two) in London's traditional pubs, where each ale tells a unique story (some of them even true).

Ever watched the ‘Changing the Guard’ ceremony at the Buckingham Palace? It’s hard to decipher if it’s the ultimate show of discipline or a Monty Python sketch in real life. Either way, it’s unique. And the grandiose Tower of London? It's the perfect Instagram backdrop, provided you don’t mind a thousand disgruntled faces scowling from behind Beefeater hats.

Concluding America's renegade father Benjamin Franklin's words, "In this world, nothing can be said to be certain, except death, taxes, and a bit of weirdness in your travel tale.” So, if you're up for a trek through the peculiar and extraordinary, India, Belgium, and London are all geared up to welcome, bewilder, and bedazzle you in ways you've never imagined. Safe travels, and remember - you can't control the lunacy that unfolds abroad, but you can control who you share that lunacy with. Choose wisely!`;
// Example usage:

const processedData = await processTextData(textData, [
  "India",
  "belgium",
  "london",
]);
console.log(processedData);
