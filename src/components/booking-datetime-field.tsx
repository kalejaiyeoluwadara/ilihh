import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { DateTimePicker } from '@expo/ui/community/datetime-picker';

import { CalendarIcon, ClockIcon } from '@/components/icons';
import { formatBookingDate, formatBookingTime } from '@/lib/booking-format';

interface BookingDateTimeFieldProps {
  label: string;
  mode: 'date' | 'time';
  value: Date | null;
  onChange: (value: Date) => void;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  placeholder?: string;
}

export function BookingDateTimeField({
  label,
  mode,
  value,
  onChange,
  error,
  minimumDate,
  maximumDate,
  placeholder,
}: BookingDateTimeFieldProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showPicker, setShowPicker] = useState(false);

  const displayValue = value
    ? mode === 'date'
      ? formatBookingDate(value)
      : formatBookingTime(value)
    : '';

  const resolvedPlaceholder =
    placeholder ?? (mode === 'date' ? 'Select preferred date' : 'Select preferred time');

  const Icon = mode === 'date' ? CalendarIcon : ClockIcon;
  const pickerValue = value ?? (mode === 'date' ? minimumDate ?? new Date() : new Date());

  const handleOpenPicker = () => {
    setShowPicker(true);
  };

  const handlePickerChange = (_event: unknown, selectedDate: Date) => {
    onChange(selectedDate);

    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
  };

  return (
    <View className="mb-4">
      <Text className="mb-2 font-poppins-medium text-xs text-text-primary dark:text-slate-200">
        {label}
      </Text>

      <Pressable
        onPress={handleOpenPicker}
        style={({ pressed }) => [pressed && styles.pressed]}
        className={`flex-row items-center rounded-2xl border bg-slate-50 px-4 dark:bg-slate-900 ${
          error ? 'border-danger' : 'border-slate-200 dark:border-slate-800'
        }`}
      >
        <Text
          className={`flex-1 py-3.5 font-poppins text-sm ${
            displayValue
              ? 'text-text-primary dark:text-slate-50'
              : 'text-slate-400 dark:text-slate-500'
          }`}
        >
          {displayValue || resolvedPlaceholder}
        </Text>
        <Icon size={18} color={isDark ? '#94A3B8' : '#64748B'} />
      </Pressable>

      {Platform.OS === 'ios' && showPicker ? (
        <View className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <DateTimePicker
            value={pickerValue}
            mode={mode}
            display="spinner"
            onValueChange={handlePickerChange}
            minimumDate={mode === 'date' ? minimumDate : undefined}
            maximumDate={mode === 'date' ? maximumDate : undefined}
            themeVariant={isDark ? 'dark' : 'light'}
            accentColor="#7C3AED"
          />
          <TouchableOpacity
            onPress={() => setShowPicker(false)}
            activeOpacity={0.8}
            className="border-t border-slate-100 py-3 dark:border-slate-800"
          >
            <Text className="text-center font-poppins-semibold text-sm text-primary-purple dark:text-indigo-400">
              Done
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {Platform.OS === 'android' && showPicker ? (
        <DateTimePicker
          value={pickerValue}
          mode={mode}
          presentation="dialog"
          onValueChange={handlePickerChange}
          onDismiss={() => setShowPicker(false)}
          minimumDate={mode === 'date' ? minimumDate : undefined}
          maximumDate={mode === 'date' ? maximumDate : undefined}
          accentColor="#7C3AED"
        />
      ) : null}

      {error ? (
        <Text className="mt-1.5 font-poppins text-[11px] text-danger">{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.85,
  },
});
