import { PrismaClient, Conversation, Message, SenderType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { env } from '../config/env.js';

const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export class ChatRepository {
  async createConversation(): Promise<Conversation> {
    return prisma.conversation.create({
      data: {
        channel: 'WEB',
      },
    });
  }

  async findConversationById(id: string): Promise<Conversation | null> {
    return prisma.conversation.findUnique({
      where: { id },
    });
  }

  async createMessage(conversationId: string, sender: SenderType, text: string): Promise<Message> {
    return prisma.message.create({
      data: {
        conversationId,
        sender,
        text,
      },
    });
  }

  async getConversationHistory(conversationId: string, limit = 15): Promise<Message[]> {
    return prisma.message.findMany({
      where: { conversationId },
      orderBy: { timestamp: 'asc' },
      take: limit,
    });
  }
}