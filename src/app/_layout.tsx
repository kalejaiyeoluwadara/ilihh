import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import '@/global.css';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import OnboardingScreen from './onboarding';
import AreYouDoneScreen from './are-you-done';
import { useAppStore } from '@/store/use-app-store';

// TEMP: render the "Are you done?" screen first on launch. Set to false to
// restore the normal app flow (onboarding -> app).
const SHOW_ARE_YOU_DONE_FIRST = true;

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const hasCompletedOnboarding = useAppStore((state) => state.hasCompletedOnboarding);

  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // TEMP: show the joke screen as the first thing that renders.
  if (SHOW_ARE_YOU_DONE_FIRST) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AreYouDoneScreen />
      </ThemeProvider>
    );
  }

  if (!hasCompletedOnboarding) {
    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <OnboardingScreen />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
