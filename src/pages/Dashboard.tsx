import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Send, FolderOpen } from 'lucide-react';
import DocumentItem from '../components/DocumentItem';
import ChatMessage from '../components/ChatMessage';

interface Document {
  id: string;
  name: string;
  size: number;
  status: 'processing' | 'ready' | 'error';
  progress?: number;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  sources?: Array<{ document: string; page?: number }>;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    onDrop: (acceptedFiles) => {
      const newDocs = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        status: 'processing' as const,
        progress: 0
      }));

      setDocuments(prev => [...prev, ...newDocs]);

      // Simulate document processing
      newDocs.forEach(doc => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setDocuments(prev =>
            prev.map(d =>
              d.id === doc.id
                ? { ...d, progress, status: progress === 100 ? 'ready' : 'processing' }
                : d
            )
          );
          if (progress === 100) clearInterval(interval);
        }, 500);
      });
    }
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isProcessing) return;

    const messageId = Math.random().toString(36).substr(2, 9);
    const userMessage = {
      id: messageId,
      type: 'user' as const,
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const botMessage = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'bot' as const,
        content: 'Based on the documents provided, here is the relevant information...',
        sources: [
          { document: 'sample.pdf', page: 5 },
          { document: 'document.docx', page: 12 }
        ]
      };
      setMessages(prev => [...prev, botMessage]);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-200 ${
              isDragActive
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {isDragActive
                ? 'Drop your files here...'
                : 'Drag & drop files here, or click to select'}
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              PDF, DOCX, TXT up to 10MB
            </p>
          </div>

          {/* Document List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                <FolderOpen className="h-5 w-5 mr-2" />
                Documents
              </h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {documents.map((doc) => (
                <DocumentItem
                  key={doc.id}
                  name={doc.name}
                  size={doc.size}
                  status={doc.status}
                  progress={doc.progress}
                  onDelete={() => setDocuments(prev => prev.filter(d => d.id !== doc.id))}
                />
              ))}
              {documents.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No documents uploaded
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow flex flex-col h-[calc(100vh-8rem)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                type={message.type}
                content={message.content}
                sources={message.sources}
              />
            ))}
            {isProcessing && (
              <ChatMessage
                type="bot"
                content="Thinking..."
                isLoading={true}
              />
            )}
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                Upload documents and start asking questions
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask a question about your documents..."
                className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                disabled={documents.length === 0 || documents.every(d => d.status === 'processing')}
              />
              <button
                type="submit"
                disabled={isProcessing || documents.length === 0 || documents.every(d => d.status === 'processing')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}