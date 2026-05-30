import { Text, View } from 'react-native';

export function ClientMessages() {
  return (
    <View className="flex-1 justify-center items-center px-8 bg-white dark:bg-slate-950">
      <View className="items-center max-w-[280px]">
        {/* Rounded speech bubble container */}
        <View className="w-20 h-20 bg-indigo-50 dark:bg-slate-900 border border-indigo-100/50 dark:border-slate-800 rounded-[28px] items-center justify-center mb-6 shadow-sm">
          <Text className="text-4xl">💬</Text>
        </View>

        <Text className="font-poppins-bold text-lg text-text-primary dark:text-slate-50 text-center mb-2">
          Your Inbox is Empty
        </Text>
        
        <Text className="font-poppins text-xs text-text-secondary dark:text-slate-400 text-center leading-[18px]">
          Chats with artisans about quotes, pricing, and project updates will appear here when you start a conversation.
        </Text>
      </View>
    </View>
  );
}
