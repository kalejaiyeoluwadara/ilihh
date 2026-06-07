import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { SEED_CONVERSATIONS, SEED_MESSAGES } from '@/data/seed-conversations';
import { getConversationKey } from '@/lib/chat';
import { safeStorage } from '@/lib/storage';
import type {
  ChatMessage,
  Conversation,
  CreateConversationPayload,
  MessageSenderRole,
} from '@/types/chat';

interface SendMessagePayload {
  conversationId: string;
  senderId: string;
  senderRole: MessageSenderRole;
  body: string;
}

interface ChatState {
  conversations: Conversation[];
  messages: ChatMessage[];
  getOrCreateConversation: (payload: CreateConversationPayload) => Conversation;
  sendMessage: (payload: SendMessagePayload) => ChatMessage | null;
  markConversationRead: (conversationId: string, role: MessageSenderRole) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      conversations: SEED_CONVERSATIONS,
      messages: SEED_MESSAGES,

      getOrCreateConversation: (payload) => {
        const key = getConversationKey(payload.clientId, payload.artisanId);
        const existing = get().conversations.find(
          (conversation) =>
            getConversationKey(conversation.clientId, conversation.artisanId) === key
        );

        if (existing) {
          return existing;
        }

        const conversation: Conversation = {
          id: `conv-${Date.now()}`,
          clientId: payload.clientId,
          clientName: payload.clientName,
          clientAvatar: payload.clientAvatar,
          artisanId: payload.artisanId,
          artisanName: payload.artisanName,
          artisanAvatar: payload.artisanAvatar,
          artisanCategory: payload.artisanCategory,
          bookingId: payload.bookingId,
          unreadByClient: 0,
          unreadByArtisan: 0,
        };

        set({ conversations: [conversation, ...get().conversations] });
        return conversation;
      },

      sendMessage: (payload) => {
        const trimmedBody = payload.body.trim();
        if (!trimmedBody) return null;

        const conversation = get().conversations.find((c) => c.id === payload.conversationId);
        if (!conversation) return null;

        const message: ChatMessage = {
          id: `msg-${Date.now()}`,
          conversationId: payload.conversationId,
          senderId: payload.senderId,
          senderRole: payload.senderRole,
          body: trimmedBody,
          createdAt: new Date().toISOString(),
        };

        set({
          messages: [...get().messages, message],
          conversations: get().conversations.map((c) => {
            if (c.id !== payload.conversationId) return c;

            return {
              ...c,
              lastMessage: trimmedBody,
              lastMessageAt: message.createdAt,
              unreadByClient:
                payload.senderRole === 'artisan' ? c.unreadByClient + 1 : c.unreadByClient,
              unreadByArtisan:
                payload.senderRole === 'client' ? c.unreadByArtisan + 1 : c.unreadByArtisan,
            };
          }),
        });

        return message;
      },

      markConversationRead: (conversationId, role) => {
        const target = get().conversations.find((conversation) => conversation.id === conversationId);
        if (!target) return;

        const unreadCount =
          role === 'client' ? target.unreadByClient : target.unreadByArtisan;
        if (unreadCount === 0) return;

        set({
          conversations: get().conversations.map((conversation) => {
            if (conversation.id !== conversationId) return conversation;

            return {
              ...conversation,
              unreadByClient: role === 'client' ? 0 : conversation.unreadByClient,
              unreadByArtisan: role === 'artisan' ? 0 : conversation.unreadByArtisan,
            };
          }),
        });
      },
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => safeStorage),
    }
  )
);

export function getConversationById(conversations: Conversation[], conversationId: string) {
  return conversations.find((conversation) => conversation.id === conversationId);
}
