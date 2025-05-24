import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

interface AnswerActionProps {
  content: string;
}

const AnswerAction: React.FC<AnswerActionProps> = ({ content }) => {
  // 使用传入的content替代模拟内容
  const markdownContent = content;

  return (
    <div className="markdown-content mx-2 rounded-md dark:text-white w-full max-w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            if (inline) {
              return (
                <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded font-mono text-sm" {...props}>
                  {children}
                </code>
              );
            }
            
            const match = /language-(\w+)/.exec(className || '');
            return (
              <div className="relative my-2">
                {match && (
                  <div className="absolute right-2 top-1 text-xs text-gray-500 dark:text-gray-400 z-10">
                    {match[1]}
                  </div>
                )}
                <SyntaxHighlighter
                  language={(match && match[1]) || 'text'}
                  style={vscDarkPlus}
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    borderRadius: '0.375rem',
                    margin: '0.5rem 0',
                    width: '100%'
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            );
          },
          a({ node, children, href, ...props }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline" {...props}>
                {children}
              </a>
            );
          },
          // 修复间距和样式
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-3" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold my-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold my-2" {...props} />,
          p: ({node, ...props}) => <p className="my-2" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
          li: ({node, ...props}) => <li className="my-1" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-3 italic" {...props} />
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default AnswerAction;