import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import './style.css'; // 我们将在下一步创建这个文件
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ markdown }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          // 自定义组件渲染（可选）
          // h1: ({ node, ...props }) => <h1 className="markdown-h1" {...props} />,
          // h2: ({ node, ...props }) => <h2 className="markdown-h2" {...props} />,
          // h3: ({ node, ...props }) => <h3 className="markdown-h3" {...props} />,
          // a: ({ node, ...props }) => <a className="markdown-link" target="_blank" rel="noopener noreferrer" {...props} />,
          // img: ({ node, ...props }) => <img className="markdown-image" {...props} alt={props.alt || ''} />,
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="markdown-inline-code" {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;