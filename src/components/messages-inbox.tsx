import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { ConversationListItem } from '@/components/conversation-list-item';
import { MessagesEmptyState } from '@/components/messages-empty-state';
import { getConversationsForUser } from '@/lib/chat';
import { useAuthStore } from '@/store/use-auth-store';
import { useChatStore } from '@/store/use-chat-store';
import type { UserRole } from '@/types/user';

interface MessagesInboxProps {
  role: UserRole;
  emptyTitle: string;
  emptyDescription: string;
  emptyActionLabel?: string;
  onEmptyActionPress?: () => void;
}

export function MessagesInbox({
  role,
  emptyTitle,
  emptyDescription,
  emptyActionLabel,
  onEmptyActionPress,
}: MessagesInboxProps) {
  const user = useAuthStore((state) => state.user);
  const conversations = useChatStore((state) => state.conversations);

  const userConversations = user
    ? getConversationsForUser(conversations, user.id, role)
    : [];

  const handleConversationPress = (conversationId: string) => {
    router.push(`/messages/${conversationId}`);
  };

  if (userConversations.length === 0) {
    return (
      <MessagesEmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={emptyActionLabel}
        onActionPress={onEmptyActionPress}
      />
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="px-6 pt-4">
          <Text className="mb-1 font-poppins-bold text-lg text-text-primary dark:text-slate-50">
            Messages
          </Text>
          <Text className="mb-4 font-poppins text-xs text-text-secondary dark:text-slate-400">
            {role === 'client'
              ? 'Chat with artisans about quotes, pricing, and project updates.'
              : 'Direct messages and booking conversations with your clients.'}
          </Text>

          {userConversations.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
              role={role}
              onPress={handleConversationPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 100,
  },
});
