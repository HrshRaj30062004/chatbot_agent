import React from 'react';
import { type MessagePayload } from '../services/api';
import { MessageItem } from './MessageItem';
import { Bot } from 'lucide-react';

interface MessageListProps {
  messages: MessagePayload[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, loading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-3 px-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full">
            <Bot className="h-8 w-8" />
          </div>
          <p className="text-gray-500 text-sm font-medium">Hello! Welcome to Spur Gadgets support. How can I help you today?</p>
          <p className="text-xs text-gray-400">Ask about our shipping, 30-day return policies, or operating operational support hours!</p>
        </div>
      ) : (
        messages.map((msg) => (
          <MessageItem key={msg.id} msg={msg} />
        ))
      )}

      {loading && (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-full bg-gray-700 text-white shrink-0">
            <Bot className="h-3.5 w-3.5" />
          </div>
          <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex items-center space-x-1">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};