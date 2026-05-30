import { useState } from 'react';
import { Appearance, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '@/constants/images';
import { WebBadge } from '@/components/web-badge';
import { useAppStore } from '@/store/use-app-store';

export default function DesignSystemScreen() {
  const systemColorScheme = useColorScheme();
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const resetOnboarding = useAppStore((state) => state.resetOnboarding);

  const toggleTheme = () => {
    Appearance.setColorScheme(
      Appearance.getColorScheme() === 'dark' ? 'light' : 'dark'
    );
  };

  const handleColorPress = (colorName: string, hex: string) => {
    // For web, copy to clipboard
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(hex);
      setCopiedColor(colorName);
      setTimeout(() => setCopiedColor(null), 2000);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-slate-950">
      <SafeAreaView style={styles.safeArea}>
        
        {/* Top Control Bar */}
        <View className="flex-row justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <View>
            <Text className="font-poppins-bold text-lg text-primary-purple">
              ilihh Workspace
            </Text>
            <Text className="font-poppins text-xs text-slate-400 dark:text-slate-500">
              Active Design System Specimen
            </Text>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={resetOnboarding}
              activeOpacity={0.8}
              className="px-4 py-2 bg-primary-purple/10 rounded-xl"
            >
              <Text className="font-poppins-semibold text-xs text-primary-purple">
                Reset Onboarding
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleTheme}
              activeOpacity={0.8}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl"
            >
              <Text className="font-poppins-semibold text-xs text-slate-700 dark:text-slate-200">
                Toggle Theme ({systemColorScheme})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View className="flex-1 flex-col lg:flex-row gap-8">
            
            {/* LEFT COLUMN: BRAND & COLORS */}
            <View className="flex-1 gap-6">
              
              {/* Brand Panel */}
              <View className="bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
                <Text className="font-poppins-bold text-xs text-primary-purple uppercase tracking-wider mb-6">
                  Brand
                </Text>
                <View className="flex-row items-center gap-6">
                  <Image 
                    source={images.mascotHappy} 
                    style={styles.logoImage}
                    resizeMode="contain"
                  />
                  <View>
                    <Text className="font-poppins-bold text-4xl text-primary-purple tracking-tight leading-none">
                      lingua
                    </Text>
                    <Text className="font-poppins text-xs text-slate-400 dark:text-slate-500 mt-1">
                      Mascot Fox & Typemark
                    </Text>
                  </View>
                </View>
              </View>

              {/* Colors Panel */}
              <View className="bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 gap-6">
                <Text className="font-poppins-bold text-xs text-primary-purple uppercase tracking-wider">
                  Colors
                </Text>

                {/* Primary Colors */}
                <View>
                  <Text className="font-poppins-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                    Primary
                  </Text>
                  <View className="flex-row flex-wrap gap-4">
                    <TouchableOpacity 
                      onPress={() => handleColorPress('Lingua Purple', '#6C4EF5')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[70px]"
                    >
                      <View className="w-16 h-16 bg-primary-purple rounded-2xl shadow-sm border border-black/5 dark:border-white/5" />
                      <Text className="font-poppins-semibold text-[10px] text-slate-900 dark:text-slate-100 mt-2 text-center" numberOfLines={1}>
                        Purple
                      </Text>
                      <Text className="font-poppins text-[10px] text-slate-400 dark:text-slate-500">
                        #6C4EF5
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Deep Purple', '#5B3BF6')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[70px]"
                    >
                      <View className="w-16 h-16 bg-primary-deep-purple rounded-2xl shadow-sm border border-black/5 dark:border-white/5" />
                      <Text className="font-poppins-semibold text-[10px] text-slate-900 dark:text-slate-100 mt-2 text-center" numberOfLines={1}>
                        Deep Purple
                      </Text>
                      <Text className="font-poppins text-[10px] text-slate-400 dark:text-slate-500">
                        #5B3BF6
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Lingua Blue', '#4D8BFF')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[70px]"
                    >
                      <View className="w-16 h-16 bg-primary-blue rounded-2xl shadow-sm border border-black/5 dark:border-white/5" />
                      <Text className="font-poppins-semibold text-[10px] text-slate-900 dark:text-slate-100 mt-2 text-center" numberOfLines={1}>
                        Blue
                      </Text>
                      <Text className="font-poppins text-[10px] text-slate-400 dark:text-slate-500">
                        #4D8BFF
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Lingua Green', '#21C16B')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[70px]"
                    >
                      <View className="w-16 h-16 bg-primary-green rounded-2xl shadow-sm border border-black/5 dark:border-white/5" />
                      <Text className="font-poppins-semibold text-[10px] text-slate-900 dark:text-slate-100 mt-2 text-center" numberOfLines={1}>
                        Green
                      </Text>
                      <Text className="font-poppins text-[10px] text-slate-400 dark:text-slate-500">
                        #21C16B
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Semantic Colors */}
                <View>
                  <Text className="font-poppins-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                    Semantic
                  </Text>
                  <View className="flex-row flex-wrap gap-4">
                    <TouchableOpacity 
                      onPress={() => handleColorPress('Success', '#21C16B')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-success rounded-xl shadow-sm" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Success
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #21C16B
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Warning', '#FFC800')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-warning rounded-xl shadow-sm" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Warning
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #FFC800
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Streak', '#FF8A00')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-streak rounded-xl shadow-sm" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Streak
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #FF8A00
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Error', '#FF4D4F')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-danger rounded-xl shadow-sm" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Error
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #FF4D4F
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Info', '#4D8BFF')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-info rounded-xl shadow-sm" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Info
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #4D8BFF
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Neutrals */}
                <View>
                  <Text className="font-poppins-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                    Neutrals
                  </Text>
                  <View className="flex-row flex-wrap gap-4">
                    <TouchableOpacity 
                      onPress={() => handleColorPress('Text Primary', '#0D132B')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-text-primary rounded-xl shadow-sm" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Primary
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #0D132B
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Text Secondary', '#6B7280')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-text-secondary rounded-xl shadow-sm" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Secondary
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #6B7280
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Border', '#E5E7EB')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-border-neutral rounded-xl shadow-sm border border-black/5" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Border
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #E5E7EB
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Surface', '#F6F7FB')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-surface rounded-xl shadow-sm border border-black/5" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Surface
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #F6F7FB
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      onPress={() => handleColorPress('Background', '#FFFFFF')}
                      activeOpacity={0.9} 
                      className="items-center flex-1 min-w-[60px]"
                    >
                      <View className="w-12 h-12 bg-background rounded-xl shadow-sm border border-black/5" />
                      <Text className="font-poppins text-[10px] text-slate-900 dark:text-slate-100 mt-1 text-center">
                        Background
                      </Text>
                      <Text className="font-poppins text-[9px] text-slate-400 dark:text-slate-500">
                        #FFFFFF
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {copiedColor && (
                  <View className="bg-primary-purple/10 border border-primary-purple/20 p-3 rounded-2xl items-center">
                    <Text className="font-poppins-semibold text-xs text-primary-purple">
                      Copied {copiedColor} hex to clipboard!
                    </Text>
                  </View>
                )}
              </View>

            </View>

            {/* RIGHT COLUMN: TYPOGRAPHY */}
            <View className="flex-1 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 gap-6">
              
              <View>
                <Text className="font-poppins-bold text-xs text-primary-purple uppercase tracking-wider">
                  Typography
                </Text>
                <View className="mt-4">
                  <Text className="font-poppins text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Font Family
                  </Text>
                  <Text className="font-poppins-bold text-4xl text-slate-900 dark:text-slate-100 mt-1">
                    Poppins
                  </Text>
                  <Text className="font-poppins text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Poppins is a modern, geometric sans-serif typeface that provides excellent readability and a friendly personality.
                  </Text>
                </View>
              </View>

              {/* Specimen Sheet */}
              <View className="border-t border-slate-150 dark:border-slate-800 pt-4 gap-4">
                
                {/* H1 Row */}
                <View className="flex-row items-baseline justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
                  <View className="flex-1 pr-4">
                    <Text className="font-poppins-bold text-3xl text-slate-900 dark:text-slate-50 leading-none">
                      H1
                    </Text>
                    <Text className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Page / Screen Title
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-poppins text-xs text-slate-500">32px</Text>
                    <Text className="font-poppins-semibold text-xs text-slate-500">Bold</Text>
                    <Text className="font-poppins text-xs text-slate-500">1.2</Text>
                  </View>
                </View>

                {/* H2 Row */}
                <View className="flex-row items-baseline justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
                  <View className="flex-1 pr-4">
                    <Text className="font-poppins-semibold text-2xl text-slate-900 dark:text-slate-50 leading-none">
                      H2
                    </Text>
                    <Text className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Section Title
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-poppins text-xs text-slate-500">24px</Text>
                    <Text className="font-poppins-semibold text-xs text-slate-500">SemiBold</Text>
                    <Text className="font-poppins text-xs text-slate-500">1.3</Text>
                  </View>
                </View>

                {/* H3 Row */}
                <View className="flex-row items-baseline justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
                  <View className="flex-1 pr-4">
                    <Text className="font-poppins-semibold text-xl text-slate-900 dark:text-slate-50 leading-none">
                      H3
                    </Text>
                    <Text className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Card / Module Title
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-poppins text-xs text-slate-500">20px</Text>
                    <Text className="font-poppins-semibold text-xs text-slate-500">SemiBold</Text>
                    <Text className="font-poppins text-xs text-slate-500">1.3</Text>
                  </View>
                </View>

                {/* H4 Row */}
                <View className="flex-row items-baseline justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
                  <View className="flex-1 pr-4">
                    <Text className="font-poppins-medium text-base text-slate-900 dark:text-slate-50 leading-none">
                      H4
                    </Text>
                    <Text className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Subheading
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-poppins text-xs text-slate-500">16px</Text>
                    <Text className="font-poppins-semibold text-xs text-slate-500">Medium</Text>
                    <Text className="font-poppins text-xs text-slate-500">1.4</Text>
                  </View>
                </View>

                {/* Body Large Row */}
                <View className="flex-row items-baseline justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
                  <View className="flex-1 pr-4">
                    <Text className="font-poppins text-base text-slate-900 dark:text-slate-50 leading-none">
                      Body Large
                    </Text>
                    <Text className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Important content
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-poppins text-xs text-slate-500">16px</Text>
                    <Text className="font-poppins-semibold text-xs text-slate-500">Regular</Text>
                    <Text className="font-poppins text-xs text-slate-500">1.6</Text>
                  </View>
                </View>

                {/* Body Medium Row */}
                <View className="flex-row items-baseline justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
                  <View className="flex-1 pr-4">
                    <Text className="font-poppins text-sm text-slate-900 dark:text-slate-50 leading-none">
                      Body Medium
                    </Text>
                    <Text className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Body text
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-poppins text-xs text-slate-500">14px</Text>
                    <Text className="font-poppins-semibold text-xs text-slate-500">Regular</Text>
                    <Text className="font-poppins text-xs text-slate-500">1.6</Text>
                  </View>
                </View>

                {/* Body Small Row */}
                <View className="flex-row items-baseline justify-between border-b border-slate-100 dark:border-slate-800/50 pb-3">
                  <View className="flex-1 pr-4">
                    <Text className="font-poppins text-[13px] text-slate-900 dark:text-slate-50 leading-none">
                      Body Small
                    </Text>
                    <Text className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                      Supporting text
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-poppins text-xs text-slate-500">13px</Text>
                    <Text className="font-poppins-semibold text-xs text-slate-500">Regular</Text>
                    <Text className="font-poppins text-xs text-slate-500">1.6</Text>
                  </View>
                </View>

                {/* Caption Row */}
                <View className="flex-row items-baseline justify-between pb-3">
                  <View className="flex-1 pr-4">
                    <Text className="font-poppins text-[11px] text-slate-900 dark:text-slate-50 leading-none">
                      Caption
                    </Text>
                    <Text className="font-poppins text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                      Labels, meta text
                    </Text>
                  </View>
                  <View className="flex-row gap-4 items-center">
                    <Text className="font-poppins text-xs text-slate-500">11px</Text>
                    <Text className="font-poppins-semibold text-xs text-slate-500">Regular</Text>
                    <Text className="font-poppins text-xs text-slate-500">1.4</Text>
                  </View>
                </View>

              </View>

            </View>

          </View>
        </ScrollView>

        <View className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 items-center bg-slate-50 dark:bg-slate-900/30">
          <Text className="font-poppins text-[11px] text-slate-400 dark:text-slate-500 text-center">
            Designed for mobile-first layout • Replicated with NativeWind & Poppins
          </Text>
          {Platform.OS === 'web' && <WebBadge />}
        </View>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    gap: 24,
  },
  logoImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
});
