import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { LocationIcon, MailIcon, PhoneIcon } from '@/components/icons';
import type { ArtisanContact } from '@/types/artisan-detail';

interface ContactDetailsSectionProps {
  contact: ArtisanContact;
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <View className="mb-3 flex-row items-start gap-3">
      <View className="mt-0.5 h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
        {icon}
      </View>
      <View className="flex-1">
        <Text className="font-poppins-medium text-[10px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
          {label}
        </Text>
        <Text className="mt-0.5 font-poppins text-sm text-text-primary dark:text-slate-100">
          {value}
        </Text>
      </View>
    </View>
  );
}

export function ContactDetailsSection({ contact }: ContactDetailsSectionProps) {
  return (
    <View className="mb-8">
      <Text className="mb-1 font-poppins-semibold text-base text-text-primary dark:text-slate-100">
        Contact & Location
      </Text>
      <Text className="mb-4 font-poppins text-xs text-text-secondary dark:text-slate-500">
        Reach out or visit the service area
      </Text>

      <View className="rounded-2xl border border-slate-100 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <ContactRow
          icon={<PhoneIcon size={16} color="#64748B" />}
          label="Phone"
          value={contact.phone}
        />
        <ContactRow
          icon={<MailIcon size={16} color="#64748B" />}
          label="Email"
          value={contact.email}
        />
        <ContactRow
          icon={<LocationIcon size={16} color="#64748B" />}
          label="Address"
          value={contact.address}
        />
        <View className="mt-1 border-t border-slate-50 pt-3 dark:border-slate-800">
          <Text className="font-poppins-medium text-[10px] uppercase tracking-wider text-text-secondary dark:text-slate-500">
            Service Area
          </Text>
          <Text className="mt-1 font-poppins text-xs leading-relaxed text-text-secondary dark:text-slate-400">
            {contact.serviceArea}
          </Text>
        </View>
      </View>
    </View>
  );
}
