import { ChatRepository } from '../repositories/chat.repository.js';
import { LLMService } from './llm.service.js';
import { Message, SenderType } from '@prisma/client';

export class ChatService {
    private chatRepository: ChatRepository;
    private llmService: LLMService;

    constructor() {
        this.chatRepository = new ChatRepository();
        this.llmService = new LLMService();
    }

    async handleUserMessage(text: string, sessionId?: string) {
        let conversationId = sessionId;

        if (conversationId) {
            const existingConversation = await this.chatRepository.findConversationById(conversationId);
            if (!existingConversation) {
                const newConversation = await this.chatRepository.createConversation();
                conversationId = newConversation.id;
            }
        } else {
            const newConversation = await this.chatRepository.createConversation();
            conversationId = newConversation.id;
        }

        await this.chatRepository.createMessage(conversationId, SenderType.USER, text);

        const history = await this.chatRepository.getConversationHistory(conversationId, 15);

        const aiReplyText = await this.llmService.generateReply(history, text);

        await this.chatRepository.createMessage(conversationId, SenderType.AI, aiReplyText);

        return {
            reply: aiReplyText,
            sessionId: conversationId,
        };
    }


    async getSessionHistory(sessionId: string): Promise<Message[]> {
        const conversation = await this.chatRepository.findConversationById(sessionId);
        if (!conversation) {
            throw new Error("Conversation session context not found.");
        }
        return this.chatRepository.getConversationHistory(sessionId, 50);
    }
}