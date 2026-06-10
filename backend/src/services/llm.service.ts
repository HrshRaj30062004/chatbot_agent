import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';
import { DOMAIN_KNOWLEDGE_BASE } from '../config/knowledgeBase.js';
import { Message, SenderType } from '@prisma/client';

export class LLMService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });
  }

  private async retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    try {
      return await fn();
    } catch (error: any) {
      if (retries <= 1 || (error.status && error.status !== 503 && error.status !== 429)) {
        throw error;
      }
      console.warn(`Upstream API busy (${error.status || 'Network Error'}). Retrying in ${delay}ms... (${retries - 1} attempts left)`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return this.retryWithBackoff(fn, retries - 1, delay * 2);
    }
  }

  async generateReply(history: Message[], userMessage: string): Promise<string> {
    const contents = history.map((msg) => ({
      role: msg.sender === SenderType.USER ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    contents.push({
      role: 'user',
      parts: [{ text: userMessage }],
    });

    try {
      const response = await this.retryWithBackoff(() =>
        this.ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: contents,
          config: {
            systemInstruction: DOMAIN_KNOWLEDGE_BASE,
            maxOutputTokens: 300,
            temperature: 0.3,
          }
        })
      );

      return response.text || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Isolated LLM Service Network Blackout:", error);
      throw new Error("Our AI engine is currently experiencing high demand. Please wait a moment and try your message again!");
    }
  }
}