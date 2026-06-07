import { StyleSheet, Text, TextInput, View } from 'react-native';

interface AuthTextInputProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words';
  editable?: boolean;
  rightElement?: React.ReactNode;
}

export function AuthTextInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
  rightElement,
}: AuthTextInputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 font-poppins-medium text-xs text-text-primary dark:text-slate-200">
        {label}
      </Text>
      <View
        className={`flex-row items-center rounded-2xl border bg-slate-50 px-4 dark:bg-slate-900 ${
          error
            ? 'border-danger'
            : 'border-slate-200 dark:border-slate-800'
        }`}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          editable={editable}
          style={[styles.input, !editable && styles.inputDisabled]}
          className="font-poppins text-sm text-text-primary dark:text-slate-50"
        />
        {rightElement}
      </View>
      {error ? (
        <Text className="mt-1.5 font-poppins text-[11px] text-danger">{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 14,
  },
  inputDisabled: {
    opacity: 0.7,
  },
});
