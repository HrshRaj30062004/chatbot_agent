import { useState, useEffect } from 'react';
import { chatApi, type MessagePayload } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(() => {
    return localStorage.getItem('spur_chat_session_id');
  });

  useEffect(() => {
    if (sessionId) {
      const fetchHistory = async () => {
        try {
          const data = await chatApi.getHistory(sessionId);
          setMessages(data.history);
        } catch (err: any) {
          console.error("Failed to restore past chat history session context:", err);
          localStorage.removeItem('spur_chat_session_id');
          setSessionId(null);
        }
      };
      fetchHistory();
    }
  }, [sessionId]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const nativeUserMsg: MessagePayload = {
      id: crypto.randomUUID(),
      conversationId: sessionId || '',
      sender: 'USER',
      text: text,
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, nativeUserMsg]);
    
    setLoading(true);
    setError(null);

    try {
      const data = await chatApi.sendMessage(text, sessionId || undefined);

      if (!sessionId && data.sessionId) {
        localStorage.setItem('spur_chat_session_id', data.sessionId);
        setSessionId(data.sessionId);
      }

      const systemResponseMsg: MessagePayload = {
        id: crypto.randomUUID(),
        conversationId: data.sessionId,
        sender: 'AI',
        text: data.reply,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, systemResponseMsg]);
    } catch (err: any) {
      const fallbackErrorMessage = err.response?.data?.message || "Failed to deliver message package. Verify host networks.";
      setError(fallbackErrorMessage);
      
      const errorMsgPlaceholder: MessagePayload = {
        id: crypto.randomUUID(),
        conversationId: sessionId || '',
        sender: 'AI',
        text: ` Error: ${fallbackErrorMessage}`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, errorMsgPlaceholder]);
    } finally {
      setLoading(false);
    }
  };

  const clearSession = () => {
    localStorage.removeItem('spur_chat_session_id');
    setSessionId(null);
    setMessages([]);
    setError(null);
  };

  return { messages, loading, error, sendMessage, clearSession };
};