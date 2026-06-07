import { Text, View } from 'react-native';

import { formatMessageTime } from '@/lib/chat';
import type { ChatMessage } from '@/types/chat';
import type { UserRole } from '@/types/user';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  viewerRole: UserRole;
}

export function ChatMessageBubble({ message, viewerRole }: ChatMessageBubbleProps) {
  const isOwnMessage = message.senderRole === viewerRole;

  return (
    <View className={`mb-3 max-w-[82%] ${isOwnMessage ? 'self-end' : 'self-start'}`}>
      <View
        className={`rounded-2xl px-4 py-3 ${
          isOwnMessage
            ? 'rounded-br-md bg-primary-purple dark:bg-indigo-600'
            : 'rounded-bl-md border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
        }`}
      >
        <Text
          className={`font-poppins text-sm leading-relaxed ${
            isOwnMessage ? 'text-white' : 'text-text-primary dark:text-slate-100'
          }`}
        >
          {message.body}
        </Text>
      </View>
      <Text
        className={`mt-1 font-poppins text-[10px] text-text-secondary dark:text-slate-500 ${
          isOwnMessage ? 'text-right' : 'text-left'
        }`}
      >
        {formatMessageTime(message.createdAt)}
      </Text>
    </View>
  );
}
