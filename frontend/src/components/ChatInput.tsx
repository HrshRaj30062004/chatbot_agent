import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => Promise<void>;
  loading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, loading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const textToSend = input;
    setInput(''); 
    await onSendMessage(textToSend);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex items-center space-x-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
        disabled={loading}
        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white disabled:opacity-50 transition-all"
      />
      <button
        type="submit"
        disabled={loading || !input.trim()}
        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 active:scale-95 disabled:opacity-40 disabled:hover:bg-indigo-600 disabled:active:scale-100 transition-all cursor-pointer shadow-md shadow-indigo-100"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
};