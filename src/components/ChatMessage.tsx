import React from 'react';

interface Source {
  document: string;
  page?: number;
}

interface ChatMessageProps {
  type: 'user' | 'bot';
  content: string;
  sources?: Source[];
  isLoading?: boolean;
}

export default function ChatMessage({ type, content, sources, isLoading }: ChatMessageProps) {
  return (
    <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          type === 'user'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
        }`}
      >
        <div className={isLoading ? 'animate-pulse' : ''}>
          {content}
          {sources && sources.length > 0 && (
            <div className="mt-2 text-sm border-t border-gray-200 dark:border-gray-600 pt-2">
              <p className="font-medium text-gray-600 dark:text-gray-400">Sources:</p>
              <ul className="list-disc list-inside">
                {sources.map((source, index) => (
                  <li key={index} className="text-gray-500 dark:text-gray-400">
                    {source.document}
                    {source.page && ` (page ${source.page})`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}