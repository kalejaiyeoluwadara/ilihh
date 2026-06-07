import type { Conversation, ChatMessage } from '@/types/chat';
import type { UserRole } from '@/types/user';

export const DEMO_ARTISAN_PROFILE_ID = 'art-1';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200';

export function getUserAvatar(avatarUri?: string) {
  return avatarUri ?? DEFAULT_AVATAR;
}

export function getArtisanProfileIdForUser(role: UserRole) {
  return role === 'artisan' ? DEMO_ARTISAN_PROFILE_ID : null;
}

export function getConversationKey(clientId: string, artisanId: string) {
  return `${clientId}:${artisanId}`;
}

export function getConversationsForUser(
  conversations: Conversation[],
  userId: string,
  role: UserRole
) {
  const filtered =
    role === 'client'
      ? conversations.filter((c) => c.clientId === userId)
      : conversations.filter((c) => c.artisanId === getArtisanProfileIdForUser(role));

  return [...filtered].sort((a, b) => {
    const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
    const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
    return bTime - aTime;
  });
}

export function getUnreadCountForUser(
  conversations: Conversation[],
  userId: string,
  role: UserRole
) {
  const userConversations = getConversationsForUser(conversations, userId, role);

  return userConversations.reduce((total, conversation) => {
    if (role === 'client') {
      return total + conversation.unreadByClient;
    }
    return total + conversation.unreadByArtisan;
  }, 0);
}

export function getMessagesForConversation(messages: ChatMessage[], conversationId: string) {
  return messages
    .filter((message) => message.conversationId === conversationId)
    .sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
}

export function formatMessageTime(isoDate: string) {
  const date = new Date(isoDate);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' });
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }

  return date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

export function formatConversationPreviewTime(isoDate?: string) {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  if (isToday) {
    return date.toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit' });
  }

  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 7) {
    return date.toLocaleDateString('en-NG', { weekday: 'short' });
  }

  return date.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' });
}

function formatCategoryLabel(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function getConversationParticipant(
  conversation: Conversation,
  role: UserRole
) {
  if (role === 'client') {
    return {
      name: conversation.artisanName,
      avatar: conversation.artisanAvatar,
      subtitle: conversation.artisanCategory
        ? formatCategoryLabel(conversation.artisanCategory)
        : 'Artisan',
    };
  }

  return {
    name: conversation.clientName,
    avatar: conversation.clientAvatar,
    subtitle: 'Client',
  };
}
