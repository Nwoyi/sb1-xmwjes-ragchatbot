import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProcessingStatusProps {
  status: 'processing' | 'ready' | 'error';
  progress?: number;
}

export default function ProcessingStatus({ status, progress }: ProcessingStatusProps) {
  return (
    <div className="flex items-center space-x-2">
      {status === 'processing' && (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Processing... {progress !== undefined ? `${progress}%` : ''}
          </span>
        </>
      )}
      {status === 'ready' && (
        <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Ready for questions
        </span>
      )}
      {status === 'error' && (
        <span className="text-sm text-red-600 dark:text-red-400 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          Error processing document
        </span>
      )}
    </div>
  );
}