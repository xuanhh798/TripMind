import generateArticle from "./generateArticle.tsx";
import { useLocation } from "react-router-dom";

export function ArticlePage() {
  const location = useLocation();
  const sampleContent = location.state;
  if (sampleContent != null) {
    const { title, subheadings, previewImages, contentImages, paragraphs } =
      sampleContent;

    return generateArticle({
      title,
      subheadings,
      previewImages,
      paragraphs,
      contentImages,
    });
  }

  return (
    <div className="flex flex-col items-center pt-8 pb-32 px-4 sm:px-8">
      <div className="max-w-3xl w-full gap-4">
        <div>
          {/* Title section */}
          <div>
            {/* Title */}
            <h1 className="sm:text-3xl text-2xl font-bold my-2">
              <span>
                A Madcap 7-Day Expedition: Saudi Arabia, Japan, and London –
                Embrace the Dark Side!
              </span>
            </h1>
            {/* User info + Misc (github) */}
            <div className="flex justify-between items-end">
              {/* User info */}
              <div className="flex space-x-2 items-center"></div>
            </div>
            <hr className="mt-4 mb-8 border-border"></hr>
          </div>
        </div>
        {/* Article section */}
        <div className="flex flex-col space-y-6">
          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* <!-- Image 1 --> */}
            <div className="relative aspect-ratio-16/9">
              <img
                src="japan.jpeg"
                alt="Image 1"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            {/* <!-- Image 2 --> */}
            <div className="relative aspect-ratio-16/9">
              <img
                src="london.jpeg"
                alt="Image 2"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            {/* <!-- Image 3 --> */}
            <div className="relative aspect-ratio-16/9">
              <img
                src="sa.jpeg"
                alt="Image 3"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
          <article className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <p>
              Hold on tight, adventurous souls! We're about to embark on a
              chaotic, yet strangely thrilling escapade across the lands of
              Saudi Arabia, Japan, and London. This unconventional 7-day journey
              promises not only fantastic sights and cultural experiences but
              also a touch of dark humor that'll keep you on your toes. Get
              ready for a wild ride where unexpected encounters and hilariously
              bizarre mishaps await. Let the madness begin!
            </p>
          </article>
          <h2 className="text-2xl mb-4 text-bold">
            Day 1-3: Riyadh, Saudi Arabia
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative w-full aspect-w-16 aspect-h-9">
              <img
                src="sa-ls.jpeg"
                alt="Landscape Image"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
          <article className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <p>
              Sandstorms and Souq Shenanigans Welcome to the desert land of
              Riyadh, where adventure and sandstorms go hand in hand. Brace
              yourself for a unique experience as you attempt to navigate
              through the maze-like Souq Al Zal, where getting lost is part of
              the fun... or the terror, depending on how you look at it!
            </p>
            <br></br>
            <p>
              But that's not all. Hold onto your hats as we venture into the
              desert, conjuring visions of exhilarating dune bashing and getting
              buried in sand. Just remember to keep your sunglasses within reach
              to protect yourself from the unexpected desert fashion statement –
              a layer of gritty sand over every inch of your face!
            </p>
          </article>
          <h2 className="text-2xl mb-4 text-bold">Day 4-5: Tokyo, Japan</h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative w-full aspect-w-16 aspect-h-9">
              <img
                src="japan-ls.jpeg"
                alt="Landscape Image"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
          <article className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <p>
              Lost in Translation... and in Sushi Rolls In Tokyo, prepare to get
              lost in translation, and not just linguistically! As we navigate
              the neon-lit streets of Shibuya Crossing, be prepared for the
              quintessential tourist right of passage – walking headfirst into a
              lamppost while capturing the perfect selfie. Remember, it's all
              part of the initiation!
            </p>
            <br></br>
            <p>
              And let's not forget the culinary adventures that await! Sushi,
              the delicate art of raw fish, can quickly turn into a comedic
              affair. You might find yourself wrestling with a rogue piece of
              nigiri or attempting to figure out how to consume temaki without
              it collapsing into a mess. But hey, nobody said mastering
              chopsticks was easy!
            </p>
          </article>
          <h2 className="text-2xl mb-4 text-bold">
            Day 6-7: London, United Kingdom
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="relative w-full aspect-w-16 aspect-h-9">
              <img
                src="london-ls.jpeg"
                alt="Landscape Image"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
          <article className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <p>
              London, United Kingdom – Pomp, Pageantry, and Pretending to be
              Royalty Hold onto your crowns as we venture into the realm of
              London, where we shall immerse ourselves in pomp, pageantry, and
              total tomfoolery. Stand tall and regal in front of Buckingham
              Palace, and join fellow tourists in our synchronized "royal wave"
              to unsuspecting passersby. Don't be shy – the Queen might just be
              watching!
            </p>
            <br></br>
            <p>
              Embark on a quest to navigate the Tube, where getting trapped in
              the closing doors is an art form of its own. And let's not forget
              the joy of trying to decipher the Cockney accent – a language all
              its own! Be prepared to smile and nod, regardless of having the
              faintest clue about what's being said.
            </p>
          </article>
          <h2 className="text-2xl mb-4 text-bold">Conclusion</h2>
          <article className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
            <p>
              Brace yourself, fearless travelers, for an extraordinary journey
              through Saudi Arabia, Japan, and London, where chaos, unexpected
              mishaps, and a twisted sense of humor will accompany you every
              step of the way. Embrace the dark side of travel and create
              unforgettable memories, because sometimes it's the amusing
              misadventures that make a trip truly extraordinary.
            </p>
            <br></br>
            <p>
              So, buckle up, keep your sense of humor intact, and get ready to
              embrace the madness that awaits in Saudi Arabia, Japan, and
              London. After all, laughter is the best souvENIR—yes, even when
              it's spelled wrong. Bon voyage, you brave souls!
            </p>
          </article>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
    </div>
  );
}

export default ArticlePage;
