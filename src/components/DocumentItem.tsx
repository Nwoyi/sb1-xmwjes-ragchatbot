import React from 'react';
import { Trash2, FileText } from 'lucide-react';
import ProcessingStatus from './ProcessingStatus';

interface DocumentItemProps {
  name: string;
  size: number;
  status: 'processing' | 'ready' | 'error';
  progress?: number;
  onDelete: () => void;
}

export default function DocumentItem({ name, size, status, progress, onDelete }: DocumentItemProps) {
  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-gray-400 mr-2" />
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {name}
          </p>
        </div>
        <div className="mt-1 flex items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mr-4">
            {(size / 1024).toFixed(1)} KB
          </span>
          <ProcessingStatus status={status} progress={progress} />
        </div>
      </div>
      <button
        onClick={onDelete}
        className="ml-4 text-gray-400 hover:text-red-500 transition-colors duration-200"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
}