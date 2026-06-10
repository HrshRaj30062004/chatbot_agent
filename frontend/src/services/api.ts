import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/chat';

export interface MessagePayload {
  id: string;
  conversationId: string;
  sender: 'USER' | 'AI';
  text: string;
  timestamp: string;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
}

export interface HistoryResponse {
  status: string;
  history: MessagePayload[];
}

export const chatApi = {
  sendMessage: async (message: string, sessionId?: string): Promise<ChatResponse> => {
    const response = await axios.post<ChatResponse>(`${API_BASE_URL}/message`, { message, sessionId });
    return response.data;
  },

  getHistory: async (sessionId: string): Promise<HistoryResponse> => {
    const response = await axios.get<HistoryResponse>(`${API_BASE_URL}/history/${sessionId}`);
    return response.data;
  }
};