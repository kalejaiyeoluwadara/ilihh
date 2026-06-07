import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

import { ChevronRightIcon } from '@/components/icons';
import { formatConversationPreviewTime } from '@/lib/chat';
import type { Conversation } from '@/types/chat';
import type { UserRole } from '@/types/user';

interface ConversationListItemProps {
  conversation: Conversation;
  role: UserRole;
  onPress: (conversationId: string) => void;
}

export function ConversationListItem({
  conversation,
  role,
  onPress,
}: ConversationListItemProps) {
  const participantName =
    role === 'client' ? conversation.artisanName : conversation.clientName;
  const participantAvatar =
    role === 'client' ? conversation.artisanAvatar : conversation.clientAvatar;
  const participantSubtitle =
    role === 'client'
      ? conversation.artisanCategory
        ? conversation.artisanCategory.charAt(0).toUpperCase() +
          conversation.artisanCategory.slice(1)
        : 'Artisan'
      : 'Client';
  const unreadCount =
    role === 'client' ? conversation.unreadByClient : conversation.unreadByArtisan;
  const hasUnread = unreadCount > 0;

  return (
    <TouchableOpacity
      onPress={() => onPress(conversation.id)}
      activeOpacity={0.75}
      className="mb-3 flex-row items-center gap-3 rounded-3xl border border-slate-100 bg-white p-4 dark:border-slate-800/80 dark:bg-slate-900"
    >
      <View className="relative">
        <Image source={{ uri: participantAvatar }} style={styles.avatar} contentFit="cover" />
        {hasUnread ? (
          <View className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-primary-purple dark:border-slate-900 dark:bg-indigo-400" />
        ) : null}
      </View>

      <View className="min-w-0 flex-1">
        <View className="mb-0.5 flex-row items-center justify-between gap-2">
          <Text
            className={`flex-1 font-poppins-bold text-sm text-text-primary dark:text-slate-50 ${
              hasUnread ? '' : ''
            }`}
            numberOfLines={1}
          >
            {participantName}
          </Text>
          {conversation.lastMessageAt ? (
            <Text
              className={`font-poppins text-[10px] ${
                hasUnread
                  ? 'font-poppins-semibold text-primary-purple dark:text-indigo-400'
                  : 'text-text-secondary dark:text-slate-500'
              }`}
            >
              {formatConversationPreviewTime(conversation.lastMessageAt)}
            </Text>
          ) : null}
        </View>

        <Text className="mb-1 font-poppins text-[10px] text-text-secondary dark:text-slate-500">
          {participantSubtitle}
        </Text>

        <Text
          className={`font-poppins text-xs leading-[18px] ${
            hasUnread
              ? 'font-poppins-semibold text-text-primary dark:text-slate-200'
              : 'text-text-secondary dark:text-slate-400'
          }`}
          numberOfLines={2}
        >
          {conversation.lastMessage ?? 'Start the conversation'}
        </Text>
      </View>

      <ChevronRightIcon size={16} color="#94A3B8" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
  },
});
