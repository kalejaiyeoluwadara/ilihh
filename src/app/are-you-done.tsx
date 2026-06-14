import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export default function AreYouDoneScreen() {
  // Float offset for the water closet (bobs up and down forever).
  const floatY = useSharedValue(0);
  // Soft shadow scale so it feels like it's hovering, not pinned.
  const shadowScale = useSharedValue(1);

  const [moreTimeCount, setMoreTimeCount] = useState(0);

  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-16, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1400, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    shadowScale.value = withRepeat(
      withSequence(
        withTiming(0.85, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [floatY, shadowScale]);

  const closetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const shadowStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: shadowScale.value }],
    opacity: shadowScale.value * 0.18,
  }));

  const handleAbsolutely = () => {
    Alert.alert('Flush successful 🚽', 'Glad we could be of service.');
  };

  const handleMoreTime = () => {
    setMoreTimeCount((count) => count + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Title */}
      <View className="items-center pt-6">
        <Text className="font-poppins-bold text-3xl mt-12 text-text-primary">
          Are you done?
        </Text>
      </View>

      {/* Floating water closet */}
      <View className="flex-1 items-center justify-center">
        <Animated.Text style={closetStyle} className="text-[180px] leading-[200px]">
          🚽
        </Animated.Text>
        {/* Ground shadow */}
        <Animated.View style={[styles.shadow, shadowStyle]} />
      </View>

      {/* Actions */}
      <View className="px-6 pb-6 gap-4">
        <TouchableOpacity
          onPress={handleAbsolutely}
          activeOpacity={0.85}
          className="w-full bg-black py-5 rounded-full items-center justify-center"
        >
          <Text className="font-poppins-semibold text-white text-base">
            Absolutely
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleMoreTime}
          activeOpacity={0.7}
          style={styles.outlineButton}
          className="w-full py-5 rounded-full items-center justify-center"
        >
          <Text className="font-poppins-medium text-text-primary text-base">
            {moreTimeCount > 0 ? `More Time (${moreTimeCount})` : 'More Time'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  shadow: {
    position: 'absolute',
    bottom: 24,
    width: 150,
    height: 22,
    borderRadius: 999,
    backgroundColor: '#000000',
  },
  outlineButton: {
    borderWidth: 1.5,
    borderColor: '#d8d8d8',
  },
});
