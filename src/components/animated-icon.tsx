import { Image } from 'expo-image';
import * as React from 'react';
import { Dimensions, Text as RNText, StyleSheet, View } from 'react-native';
import Animated, { Easing, FadeOut, Keyframe, ZoomIn } from 'react-native-reanimated';

import { images } from '@/constants/images';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    // Hold splash screen for 2.5 seconds, then fade out
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Animated.View
      exiting={FadeOut.duration(500)}
      className="absolute inset-0 bg-[#6C4EF5] justify-center items-center z-[9999]"
    >
      <View className="justify-center items-center">
        {/* Xcode-style logo container */}
        <Animated.View
          entering={ZoomIn.duration(600).easing(Easing.out(Easing.quad))}
          className="w-[140px] h-[140px] rounded-[36px] p-1.5 justify-center items-center mb-6"
          style={styles.logoWrapperShadow}
        >
          <Image source={images.artisanLogo} style={styles.logoImage} />
        </Animated.View>

        {/* Brand Text */}
        <RNText className="font-poppins-bold text-[40px] text-white tracking-[-1px]">
          Ilihh
        </RNText>
      </View>
    </Animated.View>
  );
}

const keyframe = new Keyframe({
  0: {
    transform: [{ scale: INITIAL_SCALE_FACTOR }],
  },
  100: {
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const logoKeyframe = new Keyframe({
  0: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
  },
  40: {
    transform: [{ scale: 1.3 }],
    opacity: 0,
    easing: Easing.elastic(0.7),
  },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.elastic(0.7),
  },
});

const glowKeyframe = new Keyframe({
  0: {
    transform: [{ rotateZ: '0deg' }],
  },
  100: {
    transform: [{ rotateZ: '7200deg' }],
  },
});

export function AnimatedIcon() {
  return (
    <View className="justify-center items-center w-32 h-32 z-[100]">
      <Animated.View entering={glowKeyframe.duration(60 * 1000 * 4)} className="absolute w-[201px] h-[201px]">
        <Image style={styles.glowImage} source={require('@/assets/images/logo-glow.png')} />
      </Animated.View>

      <Animated.View
        entering={keyframe.duration(DURATION)}
        className="absolute w-32 h-32 rounded-[40px] bg-[#6C4EF5] web:bg-gradient-to-b web:from-[#818CF8] web:to-[#6C4EF5]"
      />
      <Animated.View
        className="justify-center items-center"
        entering={logoKeyframe.duration(DURATION)}
      >
        <Image style={styles.logoImageInner} source={images.artisanLogo} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapperShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  glowImage: {
    width: '100%',
    height: '100%',
  },
  logoImageInner: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
});
