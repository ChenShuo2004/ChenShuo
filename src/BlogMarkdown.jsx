import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogMarkdown({ markdown }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ children, ...props }) => <a {...props} target="_blank" rel="noreferrer">{children}</a>,
        img: ({ alt, ...props }) => <img {...props} alt={alt || "文章配图"} loading="lazy" />,
      }}
    >{markdown}</ReactMarkdown>
  );
}
