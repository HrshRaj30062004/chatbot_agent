import React from 'react';
import { type MessagePayload } from '../services/api';
import { Bot, User } from 'lucide-react';

interface MessageItemProps {
  msg: MessagePayload;
}

export const MessageItem: React.FC<MessageItemProps> = ({ msg }) => {
  const isUser = msg.sender === 'USER';
  const isError = msg.text.startsWith('Error:');

  return (
    <div className={`flex items-start space-x-2 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
      <div className={`p-2 rounded-full text-white shrink-0 ${isUser ? 'bg-indigo-600' : 'bg-gray-700'}`}>
        {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
      </div>

      <div className={`max-w-[75%] p-3.5 rounded-2xl text-sm leading-relaxed ${
        isUser 
          ? 'bg-indigo-600 text-white rounded-tr-none' 
          : isError
            ? 'bg-red-50 text-red-700 border border-red-200 rounded-tl-none font-medium'
            : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
      }`}>
        <p className="whitespace-pre-wrap">{msg.text}</p>
        <span className={`block text-[10px] mt-1.5 text-right ${isUser ? 'text-indigo-200' : 'text-gray-400'}`}>
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};