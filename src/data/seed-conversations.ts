import type { ChatMessage, Conversation } from '@/types/chat';

export const SEED_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-seed-1',
    clientId: 'demo-user-1',
    clientName: 'Dara',
    clientAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    artisanId: 'art-1',
    artisanName: 'Babajide Alao',
    artisanAvatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    artisanCategory: 'Carpentry',
    lastMessage: 'Sure, I can come by tomorrow morning to take measurements.',
    lastMessageAt: '2026-06-06T10:30:00.000Z',
    unreadByClient: 1,
    unreadByArtisan: 0,
  },
];

export const SEED_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-seed-1',
    conversationId: 'conv-seed-1',
    senderId: 'demo-user-1',
    senderRole: 'client',
    body: 'Hi Babajide! I need help fixing my kitchen cabinet doors. Are you available this week?',
    createdAt: '2026-06-06T09:15:00.000Z',
  },
  {
    id: 'msg-seed-2',
    conversationId: 'conv-seed-1',
    senderId: 'art-1',
    senderRole: 'artisan',
    body: 'Hello Dara! Yes, I have openings on Wednesday and Thursday. Can you share photos of the cabinets?',
    createdAt: '2026-06-06T09:42:00.000Z',
  },
  {
    id: 'msg-seed-3',
    conversationId: 'conv-seed-1',
    senderId: 'demo-user-1',
    senderRole: 'client',
    body: 'Thursday works for me. The hinges are broken on two doors.',
    createdAt: '2026-06-06T10:05:00.000Z',
  },
  {
    id: 'msg-seed-4',
    conversationId: 'conv-seed-1',
    senderId: 'art-1',
    senderRole: 'artisan',
    body: 'Sure, I can come by tomorrow morning to take measurements.',
    createdAt: '2026-06-06T10:30:00.000Z',
  },
];
