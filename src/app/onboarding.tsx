import { useRef, useState } from 'react';
import { Dimensions, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants/images';
import { useAppStore } from '@/store/use-app-store';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  {
    title: 'Find Local Experts',
    description: 'Connect with skilled local artisans in Ilisan—from master carpenters and plumbers to tailors and builders.',
    image: images.onboardingTools,
  },
  {
    title: 'Choose Your Role',
    description: 'Join as a Client to hire verified local talents, or register as an Artisan to promote your craft and grow your income.',
    image: images.onboardingConnect,
  },
  {
    title: 'Book & Chat Securely',
    description: 'Discuss project requirements, agree on pricing, and manage service bookings all in one unified, real-time workspace.',
    image: images.onboardingBooking,
  },
];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (activeIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    scrollViewRef.current?.scrollTo({
      x: (SLIDES.length - 1) * SCREEN_WIDTH,
      animated: true,
    });
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <SafeAreaView style={styles.safeArea}>
        
        {/* Skip button (top-right) */}
        <View className="h-12 items-end justify-center px-6">
          {activeIndex < SLIDES.length - 1 && (
            <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
              <Text className="font-poppins-medium text-sm text-text-secondary dark:text-slate-400">
                Skip
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Sliding Slides */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollView}
        >
          {SLIDES.map((slide, index) => (
            <View key={index} style={styles.slideContainer} className="items-center px-6">
              
              {/* Illustration Wrapper */}
              <View className="flex-1 justify-center items-center py-4 w-full">
                <Image
                  source={slide.image}
                  style={styles.illustration}
                  resizeMode="contain"
                />
              </View>

              {/* Text Specs */}
              <View className="w-full items-center mb-16 gap-3">
                <Text className="font-poppins-bold text-3xl text-text-primary dark:text-slate-50 text-center leading-tight">
                  {slide.title}
                </Text>
                <Text className="font-poppins text-sm text-text-secondary dark:text-slate-400 text-center px-4 leading-relaxed">
                  {slide.description}
                </Text>
              </View>

            </View>
          ))}
        </ScrollView>

        {/* Bottom Pagination & Action Bar */}
        <View className="px-6 pb-8 gap-6 w-full items-center">
          
          {/* Dots Indicator */}
          <View className="flex-row gap-2">
            {SLIDES.map((_, index) => (
              <View
                key={index}
                className={`h-2.5 rounded-full ${
                  activeIndex === index
                    ? 'w-6 bg-primary-purple'
                    : 'w-2.5 bg-slate-200 dark:bg-slate-800'
                }`}
              />
            ))}
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className="w-full bg-primary-purple py-4 rounded-2xl items-center justify-center shadow-lg shadow-primary-purple/20"
          >
            <Text className="font-poppins-semibold text-white text-base">
              {activeIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </TouchableOpacity>

        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    flex: 1,
    justifyContent: 'space-between',
  },
  illustration: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_WIDTH * 0.8,
    maxHeight: 300,
    borderRadius: 72,
    ...({ cornerCurve: 'continuous' } as any),
  },
});
