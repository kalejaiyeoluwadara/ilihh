import { router } from 'expo-router';

import { DEMO_ARTISAN_PROFILE_ID, getUserAvatar } from '@/lib/chat';
import { getArtisanDetail } from '@/lib/artisans';
import { getRedirectHref } from '@/lib/navigation';
import { useChatStore } from '@/store/use-chat-store';
import type { CreateConversationPayload } from '@/types/chat';
import type { User } from '@/types/user';

export function startConversation(
  payload: CreateConversationPayload,
  isAuthenticated: boolean,
  loginRedirectPath: string
) {
  if (!isAuthenticated) {
    router.push(`/login?redirect=${encodeURIComponent(loginRedirectPath)}`);
    return;
  }

  const conversation = useChatStore.getState().getOrCreateConversation(payload);
  router.push(getRedirectHref(`/messages/${conversation.id}`));
}

export function buildArtisanConversationPayload(
  client: {
    id: string;
    name: string;
    avatar: string;
  },
  bookingId?: string
): CreateConversationPayload | null {
  const artisan = getArtisanDetail(DEMO_ARTISAN_PROFILE_ID);
  if (!artisan) return null;

  return {
    clientId: client.id,
    clientName: client.name,
    clientAvatar: client.avatar,
    artisanId: artisan.id,
    artisanName: artisan.name,
    artisanAvatar: artisan.avatar,
    artisanCategory: artisan.category,
    bookingId,
  };
}

export function buildClientConversationPayload(
  user: User,
  artisan: {
    id: string;
    name: string;
    avatar: string;
    category: string;
  },
  bookingId?: string
): CreateConversationPayload {
  return {
    clientId: user.id,
    clientName: user.fullName,
    clientAvatar: getUserAvatar(user.avatarUri),
    artisanId: artisan.id,
    artisanName: artisan.name,
    artisanAvatar: artisan.avatar,
    artisanCategory: artisan.category,
    bookingId,
  };
}
