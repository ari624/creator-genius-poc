'use client';

import { useState } from 'react';
import { Copy, Check } from '@/components/Icon';
import { toast } from 'sonner';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export default function CodeBlock({
  code,
  language = 'text',
  title,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  const lines = code.split('\n');

  return (
    <div className="relative group">
      {title && (
        <div className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-t-lg border-b border-gray-700">
          {title}
        </div>
      )}
      <div
        className={`relative bg-gray-50 border-2 border-gray-200 ${
          title ? 'rounded-b-lg' : 'rounded-lg'
        } overflow-hidden`}
      >
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-white shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100 z-10"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-600" />
          )}
        </button>

        <pre className="p-4 overflow-x-auto">
          <code className={`language-${language} text-sm font-mono`}>
            {showLineNumbers ? (
              <table className="w-full">
                <tbody>
                  {lines.map((line, i) => (
                    <tr key={i}>
                      <td className="pr-4 text-gray-400 text-right select-none w-8">
                        {i + 1}
                      </td>
                      <td className="text-gray-800">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span className="text-gray-800 whitespace-pre-wrap">{code}</span>
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
