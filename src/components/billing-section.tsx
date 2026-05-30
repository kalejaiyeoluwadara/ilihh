import { Text, View } from 'react-native';

import type { ArtisanBilling } from '@/types/artisan-detail';

interface BillingSectionProps {
  billing: ArtisanBilling;
}

export function BillingSection({ billing }: BillingSectionProps) {
  return (
    <View className="mb-8">
      <Text className="mb-1 font-poppins-semibold text-base text-text-primary dark:text-slate-100">
        Billing & Payment
      </Text>
      <Text className="mb-4 font-poppins text-xs text-text-secondary dark:text-slate-500">
        How this artisan charges for work
      </Text>

      <View className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Text className="font-poppins text-sm leading-relaxed text-text-primary dark:text-slate-100">
          {billing.summary}
        </Text>

        <Text className="mb-2 mt-4 font-poppins-medium text-[10px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
          Payment Methods
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {billing.paymentMethods.map((method) => (
            <View
              key={method}
              className="rounded-full bg-slate-100 px-3 py-1.5 dark:bg-slate-800"
            >
              <Text className="font-poppins-medium text-[11px] text-text-secondary dark:text-slate-300">
                {method}
              </Text>
            </View>
          ))}
        </View>

        {billing.notes.length > 0 && (
          <>
            <Text className="mb-2 mt-4 font-poppins-medium text-[10px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
              Important Notes
            </Text>
            {billing.notes.map((note) => (
              <View key={note} className="mb-2 flex-row gap-2">
                <Text className="font-poppins text-xs text-text-secondary dark:text-slate-500">•</Text>
                <Text className="flex-1 font-poppins text-xs leading-relaxed text-text-secondary dark:text-slate-400">
                  {note}
                </Text>
              </View>
            ))}
          </>
        )}
      </View>
    </View>
  );
}
