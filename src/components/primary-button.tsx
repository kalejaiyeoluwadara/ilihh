import { Text, TouchableOpacity } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function PrimaryButton({ label, onPress, disabled }: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      className={`mt-2 w-full items-center justify-center rounded-2xl py-4 shadow-lg shadow-primary-purple/20 ${
        disabled ? 'bg-slate-300 dark:bg-slate-700' : 'bg-primary-purple'
      }`}
    >
      <Text className="font-poppins-semibold text-base text-white">{label}</Text>
    </TouchableOpacity>
  );
}
