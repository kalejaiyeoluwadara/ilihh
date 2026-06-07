export type MessageSenderRole = 'client' | 'artisan';

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: MessageSenderRole;
  body: string;
  createdAt: string;
}

export interface Conversation {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  artisanCategory?: string;
  bookingId?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadByClient: number;
  unreadByArtisan: number;
}

export interface CreateConversationPayload {
  clientId: string;
  clientName: string;
  clientAvatar: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  artisanCategory?: string;
  bookingId?: string;
}
