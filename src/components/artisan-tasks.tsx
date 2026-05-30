import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ArtisanTaskCard } from '@/components/artisan-task-card';
import { TasksIcon } from '@/components/icons';
import type { ArtisanTask } from '@/lib/artisan-tasks';

interface ArtisanTasksProps {
  tasks: ArtisanTask[];
}

export function ArtisanTasks({ tasks }: ArtisanTasksProps) {
  if (tasks.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-8 dark:bg-slate-950">
        <View className="max-w-[280px] items-center">
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-[28px] border border-indigo-100/50 bg-indigo-50 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <TasksIcon size={32} color="#7C3AED" />
          </View>

          <Text className="mb-2 text-center font-poppins-bold text-lg text-text-primary dark:text-slate-50">
            No active tasks
          </Text>

          <Text className="text-center font-poppins text-xs leading-[18px] text-text-secondary dark:text-slate-400">
            Accepted jobs will show up here with the client&apos;s service details, location, schedule,
            and budget.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View className="px-6 pt-4">
          <Text className="mb-1 font-poppins-bold text-lg text-text-primary dark:text-slate-50">
            Active Tasks
          </Text>
          <Text className="mb-4 font-poppins text-xs text-text-secondary dark:text-slate-400">
            Jobs you&apos;ve accepted — review client details and get to work.
          </Text>

          {tasks.map((task) => (
            <ArtisanTaskCard key={task.id} task={task} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: Platform.OS === 'web' ? 100 : 80,
  },
});
