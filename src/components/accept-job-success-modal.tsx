import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CheckCircleIcon } from '@/components/icons';
import { PrimaryButton } from '@/components/primary-button';
import type { BookingRequest } from '@/data/artisans';

interface AcceptJobSuccessModalProps {
  request: BookingRequest | null;
  visible: boolean;
  onDismiss: () => void;
  onGoToTasks: () => void;
}

export function AcceptJobSuccessModal({
  request,
  visible,
  onDismiss,
  onGoToTasks,
}: AcceptJobSuccessModalProps) {
  if (!request) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <Pressable style={styles.modalOverlay} onPress={onDismiss}>
        <Pressable onPress={(event) => event.stopPropagation()}>
          <View className="rounded-3xl bg-white p-6 dark:bg-slate-900">
            <View className="items-center">
              <View className="mb-4 h-16 w-16 items-center justify-center rounded-[24px] bg-emerald-50 dark:bg-emerald-950/40">
                <CheckCircleIcon size={36} color="#21C16B" />
              </View>
              <Text className="text-center font-poppins-bold text-xl text-text-primary dark:text-slate-50">
                Job accepted!
              </Text>
              <Text className="mt-2 text-center font-poppins text-sm leading-relaxed text-text-secondary dark:text-slate-400">
                {request.serviceNeeded} for {request.clientName} is now on your Tasks page. You can
                track and manage it from there.
              </Text>
            </View>

            <View className="mt-6">
              <PrimaryButton label="Go to Tasks" onPress={onGoToTasks} />
              <TouchableOpacity
                onPress={onDismiss}
                activeOpacity={0.8}
                className="mt-3 items-center rounded-2xl border border-slate-200 py-3.5 dark:border-slate-800"
              >
                <Text className="font-poppins-semibold text-sm text-text-primary dark:text-slate-200">
                  Stay on Dashboard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    paddingHorizontal: 24,
  },
});
