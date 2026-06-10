import React, { useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { MessageSquare, Trash2 } from 'lucide-react';

export const ChatWidget: React.FC = () => {
  const { messages, loading, sendMessage, clearSession } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden mx-auto my-10">

      <div className="flex items-center justify-between bg-indigo-600 px-6 py-4 text-white">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold text-base leading-none">Spur Live Support</h2>
            <span className="text-xs text-indigo-200 inline-block mt-1">AI Support Agent Active</span>
          </div>
        </div>
        {messages.length > 0 && (
          <button 
            onClick={clearSession}
            title="Clear current session"
            className="p-2 text-indigo-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <MessageList 
        messages={messages} 
        loading={loading} 
        messagesEndRef={messagesEndRef} 
      />

      <ChatInput 
        onSendMessage={sendMessage} 
        loading={loading} 
      />
      
    </div>
  );
};