import "./ArticleBubble.css";

export default function ArticleBubble(props: {
  title: string;
  path: string;
  imgSrc: string;
}) {
  const { title, path, imgSrc } = props;
  return (
    <div className="bubble">
      <a
        href={path}
        className="flex flex-col justify-between rounded-lg border border-border dark:border-none p-4 text-base hover:shadow-sm hover:-translate-y-0.5 transition-all"
      >
        {" "}
        <div className="relative aspect-ratio-16/9">
          <img
            src={imgSrc}
            alt="Image 2"
            className="object-cover w-full h-full rounded-lg bg-img "
          />
        </div>
        <span className="font-bold text-primary leading-5 line-clamp-2 overflow-ellipsis h-10">
          {title}
        </span>
        <div className="flex space-x-2 items-center"></div>
        <div className="flex space-x-2 items-center">stuff</div>
      </a>
    </div>
  );
}
