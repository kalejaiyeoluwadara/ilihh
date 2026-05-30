import { Text, TouchableOpacity, View } from 'react-native';

import type { UserRole } from '@/types/user';

interface RoleSelectorProps {
  value: UserRole | null;
  onChange: (role: UserRole) => void;
  error?: string;
}

const ROLES: { id: UserRole; title: string; description: string }[] = [
  {
    id: 'client',
    title: 'Client',
    description: 'Find and hire local artisans',
  },
  {
    id: 'artisan',
    title: 'Artisan',
    description: 'Offer your skills and get hired',
  },
];

export function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 font-poppins-medium text-xs text-text-primary dark:text-slate-200">
        I want to join as
      </Text>
      <View className="flex-row gap-3">
        {ROLES.map((role) => {
          const isSelected = value === role.id;

          return (
            <TouchableOpacity
              key={role.id}
              onPress={() => onChange(role.id)}
              activeOpacity={0.8}
              className={`flex-1 rounded-2xl border p-4 ${
                isSelected
                  ? 'border-primary-purple bg-primary-purple/10 dark:border-indigo-400 dark:bg-indigo-500/10'
                  : 'border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900'
              }`}
            >
              <Text
                className={`font-poppins-semibold text-sm ${
                  isSelected
                    ? 'text-primary-purple dark:text-indigo-400'
                    : 'text-text-primary dark:text-slate-100'
                }`}
              >
                {role.title}
              </Text>
              <Text className="mt-1 font-poppins text-[10px] leading-4 text-text-secondary dark:text-slate-400">
                {role.description}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error ? (
        <Text className="mt-1.5 font-poppins text-[11px] text-danger">{error}</Text>
      ) : null}
    </View>
  );
}
