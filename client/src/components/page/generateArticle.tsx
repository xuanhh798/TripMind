function generateArticle(articleContent: {
  title: string;
  subheadings: Array<string>;
  previewImages: Array<string>;
  contentImages: Array<string>;
  // Nested array of paragraphs
  paragraphs: Array<Array<string>>;
}) {
  const { title, subheadings, previewImages, paragraphs, contentImages } =
    articleContent;
  let imgIndex = 0;
  return (
    <div className="flex flex-col items-center pt-8 pb-32 px-4 sm:px-8">
      <div className="max-w-3xl w-full gap-4">
        {/* Preview section */}
        <div>
          <h1 className="sm:text-3xl text-2xl font-bold my-2">
            <span>{title}</span>
          </h1>
          <hr className="mt-4 mb-8 border-border"></hr>
        </div>

        <div className="flex flex-col space-y-6">
          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewImages.map((img, index) => (
              <div key={index} className="relative aspect-ratio-16/9">
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ))}
          </div>
          {/* Article section */}
          {(() => {
            const contentSections = [];
            for (let index = 0; index < paragraphs.length; index++) {
              contentSections.push(
                <div>
                  {subheadings[index] && (
                    <h2 className="text-2xl mb-4 text-bold">
                      {subheadings[index]}
                    </h2>
                  )}
                  <div className="max-w-3xl mx-auto">
                    <div className="relative w-full aspect-w-16 aspect-h-9">
                      {subheadings[index] && contentImages[imgIndex] && (
                        <img
                          src={contentImages[imgIndex]}
                          alt="Landscape Image"
                          className="object-cover w-full h-full rounded-lg"
                        />
                      )}
                    </div>
                    <br />
                  </div>
                  <article
                    key={index}
                    className="prose prose-sm sm:prose-base max-w-none dark:prose-invert"
                  >
                    {paragraphs[index].map((paragraph) => (
                      <span>
                        <p>{paragraph}</p>
                        {index < paragraphs[index].length - 1 && <br />}
                      </span>
                    ))}
                  </article>
                </div>
              );

              if (subheadings[index]) {
                imgIndex += 1;
              }
            }
            return contentSections;
          })()}
        </div>
      </div>
    </div>
  );
}

export default generateArticle;

// Example Usage
// <generateArticle
//   subheadings="A Madcap 7-Day Expedition: Saudi Arabia, Japan, and London – Embrace the Dark Side!"
//   previewImages={['japan.jpeg', 'london.jpeg', 'sa.jpeg']}
//   paragraphs={[
//     "Paragraph 1 text...",
//     "Paragraph 2 text...",
//     // Add more paragraphs as needed
//   ]}
// />
