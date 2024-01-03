import ArticleBubble from "./ArticleBubble.js";

export function ArticlePage() {
  return (
    <div className="p-4 sm:p-8 flex flex-col max-w-6xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">Browse</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ArticleBubble title={"Title 1"} path={"#"} imgSrc={"japan.jpeg"} />
        <ArticleBubble title={"Title 2"} path={"#"} imgSrc={"london.jpeg"} />
        <ArticleBubble title={"Title 3"} path={"#"} imgSrc={"sa.jpeg"} />
      </div>
    </div>
  );
}

export default ArticlePage;
