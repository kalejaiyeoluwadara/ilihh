import { useEffect, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

import { ChatComposer } from '@/components/chat-composer';
import { ChatMessageBubble } from '@/components/chat-message-bubble';
import { ChatThreadHeader } from '@/components/chat-thread-header';
import {
  getArtisanProfileIdForUser,
  getConversationParticipant,
  getMessagesForConversation,
} from '@/lib/chat';
import { useAuthStore } from '@/store/use-auth-store';
import { getConversationById, useChatStore } from '@/store/use-chat-store';

export default function ChatThreadScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const conversationId = typeof id === 'string' ? id : '';
  const flatListRef = useRef<FlatList>(null);

  const user = useAuthStore((state) => state.user);
  const conversations = useChatStore((state) => state.conversations);
  const messages = useChatStore((state) => state.messages);
  const sendMessage = useChatStore((state) => state.sendMessage);

  const conversation = getConversationById(conversations, conversationId);
  const viewerRole = user?.role ?? 'client';
  const threadMessages = getMessagesForConversation(messages, conversationId);

  useEffect(() => {
    if (!conversationId || !user) return;
    useChatStore.getState().markConversationRead(conversationId, viewerRole);
  }, [conversationId, user?.id, viewerRole]);

  useEffect(() => {
    if (threadMessages.length === 0) return;
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [threadMessages.length]);

  if (!conversation || !user) {
    return (
      <View className="flex-1 bg-white dark:bg-slate-950">
        <SafeAreaView style={styles.safeArea}>
          <View className="flex-1 items-center justify-center px-8">
            <Text className="text-center font-poppins-bold text-lg text-text-primary dark:text-slate-50">
              Conversation not found
            </Text>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8} className="mt-4">
              <Text className="font-poppins-semibold text-sm text-primary-purple dark:text-indigo-400">
                Go back
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const participant = getConversationParticipant(conversation, viewerRole);

  const handleSend = (text: string) => {
    const senderId =
      viewerRole === 'client' ? user.id : (getArtisanProfileIdForUser('artisan') ?? user.id);

    sendMessage({
      conversationId,
      senderId,
      senderRole: viewerRole,
      body: text,
    });
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ChatThreadHeader
          name={participant.name}
          avatar={participant.avatar}
          subtitle={participant.subtitle}
          onBackPress={() => router.back()}
        />

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <FlatList
            ref={flatListRef}
            data={threadMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ChatMessageBubble message={item} viewerRole={viewerRole} />
            )}
            contentContainerStyle={styles.messageList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
          />

          <ChatComposer onSend={handleSend} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  messageList: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
});
