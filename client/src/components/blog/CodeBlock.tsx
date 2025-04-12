import React from 'react';

interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  return (
    <div className="my-6 rounded-lg overflow-hidden">
      <div className="bg-slate-800 px-4 py-2 text-xs text-slate-300 flex justify-between">
        <span>{language.toUpperCase()}</span>
        <button 
          className="text-slate-400 hover:text-white transition-colors"
          onClick={() => {
            navigator.clipboard.writeText(children);
            // You could add a toast notification here
          }}
        >
          Copy
        </button>
      </div>
      <pre className="bg-slate-900 p-4 overflow-x-auto text-slate-100 text-sm">
        <code>{children}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;