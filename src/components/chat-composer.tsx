import { useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SendIcon } from '@/components/icons';

interface ChatComposerProps {
  onSend: (text: string) => void;
  placeholder?: string;
}

export function ChatComposer({
  onSend,
  placeholder = 'Type a message...',
}: ChatComposerProps) {
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const canSend = text.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    onSend(text);
    setText('');
  };

  return (
    <View
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}
      className="border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950"
    >
      <View className="flex-row items-end gap-2 px-4 pt-3">
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
          multiline
          maxLength={1000}
          style={[
            styles.input,
            {
              color: isDark ? '#F8FAFC' : '#0F172A',
              backgroundColor: isDark ? '#1E293B' : '#F8FAFC',
              borderColor: isDark ? '#334155' : '#E2E8F0',
            },
          ]}
        />

        <TouchableOpacity
          onPress={handleSend}
          disabled={!canSend}
          activeOpacity={0.85}
          className={`mb-0.5 h-11 w-11 items-center justify-center rounded-2xl ${
            canSend
              ? 'bg-primary-purple shadow-sm shadow-primary-purple/30 dark:bg-indigo-600'
              : 'bg-slate-100 dark:bg-slate-800'
          }`}
        >
          <SendIcon size={18} color={canSend ? '#FFFFFF' : isDark ? '#64748B' : '#94A3B8'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
      default: {},
    }),
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 12 : 10,
    paddingBottom: Platform.OS === 'ios' ? 12 : 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 20,
  },
});
