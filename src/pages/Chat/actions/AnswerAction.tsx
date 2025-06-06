import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface AnswerActionProps {
  content: string;
}

const AnswerAction: React.FC<AnswerActionProps> = ({ content }) => {
  // 复制代码功能
  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      // 显示复制成功提示
      const button = event?.target as HTMLButtonElement;
      const originalText = button.textContent;
      button.textContent = '已复制!';
      button.style.color = '#10b981';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.color = '';
      }, 2000);
    } catch (error) {
      console.error('复制失败:', error);
      // 回退方案
      const textArea = document.createElement('textarea');
      textArea.value = code;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      const button = event?.target as HTMLButtonElement;
      const originalText = button.textContent;
      button.textContent = '已复制!';
      button.style.color = '#10b981';
      setTimeout(() => {
        button.textContent = originalText;
        button.style.color = '';
      }, 2000);
    }
  };

  // 预处理函数：将方括号格式的数学公式转换为美元符号格式
  const preprocessMath = (text: string): string => {
    // 将 \[ ... \] 转换为 $$ ... $$
    let processed = text.replace(/\\\[\s*([\s\S]*?)\s*\\\]/g, (_match, mathContent) => {
      return `$$${mathContent.trim()}$$`;
    });
    
    // 将 \( ... \) 转换为 $ ... $
    processed = processed.replace(/\\\(\s*([\s\S]*?)\s*\\\)/g, (_match, mathContent) => {
      return `$${mathContent.trim()}$`;
    });
    
    // 处理普通方括号格式 [ ... ] 转换为 $$ ... $$
    processed = processed.replace(/\[\s*(\\text\{[^}]*\}[\s\S]*?)\s*\]/g, (_match, mathContent) => {
      return `$$${mathContent.trim()}$$`;
    });
    
    return processed;
  };

  // 使用传入的content并进行预处理
  const markdownContent = preprocessMath(content);

  return (
    <div className="markdown-content mx-2 text-gray-900 dark:text-white w-full max-w-full">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ className, children, ...props }) {
            const isInline = !className;
            
            if (isInline) {
              return (
                <code className="bg-gray-200 dark:bg-gray-700 px-1 font-mono text-sm" {...props}>
                  {children}
                </code>
              );
            }
            
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');
            
            return (
              <div className="relative my-2 group">
                <div className="flex justify-between items-center absolute right-2 top-1 z-10">
                  {match && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                      {match[1]}
                    </span>
                  )}
                  <button
                    onClick={() => copyToClipboard(codeString)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-600 hover:bg-gray-500 text-white text-xs px-2 py-1 flex items-center gap-1"
                    title="复制代码"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    复制
                  </button>
                </div>
                <SyntaxHighlighter
                  language={(match && match[1]) || 'text'}
                  style={vscDarkPlus}
                  showLineNumbers
                  wrapLongLines
                  customStyle={{
                    borderRadius: '0',
                    margin: '0.5rem 0',
                    width: '100%'
                  }}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          },
          a({ children, href, ...props }) {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:underline" {...props}>
                {children}
              </a>
            );
          },
          
          // 表格样式 - 简洁版本
          table: ({...props}) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full bg-white dark:bg-gray-800" {...props} />
            </div>
          ),
          thead: ({...props}) => (
            <thead className="bg-gray-200 dark:bg-gray-600" {...props} />
          ),
          tbody: ({...props}) => (
            <tbody {...props} />
          ),
          tr: ({...props}) => (
            <tr {...props} />
          ),
          th: ({...props}) => (
            <th className="px-6 py-4 text-left text-sm font-bold text-gray-900 dark:text-gray-100" {...props} />
          ),
          td: ({...props}) => (
            <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100" {...props} />
          ),
          // 修复间距和样式
          h1: ({...props}) => <h1 className="text-2xl font-bold my-3 text-gray-900 dark:text-white" {...props} />,
          h2: ({...props}) => <h2 className="text-xl font-bold my-2 text-gray-900 dark:text-white" {...props} />,
          h3: ({...props}) => <h3 className="text-lg font-bold my-2 text-gray-900 dark:text-white" {...props} />,
          p: ({...props}) => <p className="my-2 text-gray-800 dark:text-gray-200" {...props} />,
          ul: ({...props}) => <ul className="list-disc pl-5 my-2 text-gray-800 dark:text-gray-200" {...props} />,
          ol: ({...props}) => <ol className="list-decimal pl-5 my-2 text-gray-800 dark:text-gray-200" {...props} />,
          li: ({...props}) => <li className="my-1 text-gray-800 dark:text-gray-200" {...props} />,
          blockquote: ({...props}) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 my-3 italic text-gray-700 dark:text-gray-300" {...props} />
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default AnswerAction;