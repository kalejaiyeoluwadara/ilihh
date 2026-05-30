import { useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { router } from 'expo-router';

import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { AuthTextInput } from '@/components/auth-text-input';
import { BackIcon, EyeIcon, EyeSlashIcon } from '@/components/icons';
import { PrimaryButton } from '@/components/primary-button';
import { images } from '@/constants/images';
import { validateLogin } from '@/lib/auth-validation';
import { useAuthStore } from '@/store/use-auth-store';
import type { AuthValidationErrors } from '@/types/auth';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<AuthValidationErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const iconColor = isDark ? '#94A3B8' : '#64748B';

  const handleLogin = () => {
    const validation = validateLogin({ email, password });
    setErrors(validation.errors);

    if (!validation.isValid) {
      setFormError(null);
      return;
    }

    const result = login({ email, password });
    if (!result.success) {
      setFormError(result.error ?? 'Unable to sign in');
      return;
    }

    router.replace('/');
  };

  return (
    <AuthScreenLayout
      header={
        <View className="pt-2">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="mb-6 h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-900"
          >
            <BackIcon size={18} color={iconColor} />
          </TouchableOpacity>

          <View className="mb-8 items-center">
            <Image source={images.mascotHappy} style={{ width: 72, height: 72, borderRadius: 24 }} />
            <Text className="mt-4 font-poppins-bold text-3xl text-text-primary dark:text-slate-50">
              Welcome back
            </Text>
            <Text className="mt-2 px-4 text-center font-poppins text-sm text-text-secondary dark:text-slate-400">
              Sign in to manage bookings, messages, and your ilihh profile.
            </Text>
          </View>
        </View>
      }
    >
      <AuthTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
      />

      <AuthTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        error={errors.password}
        rightElement={
          <TouchableOpacity
            onPress={() => setShowPassword((current) => !current)}
            activeOpacity={0.7}
            className="pl-2"
          >
            {showPassword ? (
              <EyeSlashIcon size={18} color={iconColor} />
            ) : (
              <EyeIcon size={18} color={iconColor} />
            )}
          </TouchableOpacity>
        }
      />

      {formError ? (
        <Text className="mb-2 font-poppins text-xs text-danger">{formError}</Text>
      ) : null}

      <PrimaryButton label="Sign In" onPress={handleLogin} />

      <Text className="mt-4 text-center font-poppins text-[11px] text-text-secondary dark:text-slate-500">
        Demo account: dara@ilihh.demo / demo123
      </Text>

      <View className="mt-8 flex-row items-center justify-center">
        <Text className="font-poppins text-sm text-text-secondary dark:text-slate-400">
          Don&apos;t have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => router.push('/sign-up')} activeOpacity={0.7}>
          <Text className="font-poppins-semibold text-sm text-primary-purple dark:text-indigo-400">
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </AuthScreenLayout>
  );
}
