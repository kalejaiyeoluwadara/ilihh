import { useState } from 'react';
import { Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';

import { AuthScreenLayout } from '@/components/auth-screen-layout';
import { AuthTextInput } from '@/components/auth-text-input';
import { BackIcon, EyeIcon, EyeSlashIcon } from '@/components/icons';
import { PrimaryButton } from '@/components/primary-button';
import { RoleSelector } from '@/components/role-selector';
import { images } from '@/constants/images';
import { validateSignUp } from '@/lib/auth-validation';
import { getRedirectHref } from '@/lib/navigation';
import { useAuthStore } from '@/store/use-auth-store';
import type { AuthValidationErrors } from '@/types/auth';
import type { UserRole } from '@/types/user';

export default function SignUpScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const signUp = useAuthStore((state) => state.signUp);
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('Ilisan, Ogun State');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<AuthValidationErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const iconColor = isDark ? '#94A3B8' : '#64748B';

  const handleSignUp = () => {
    if (!role) {
      setErrors((current) => ({ ...current, role: 'Select a role to continue' }));
      setFormError(null);
      return;
    }

    const payload = {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      role,
      location,
    };

    const validation = validateSignUp(payload);
    setErrors(validation.errors);

    if (!validation.isValid) {
      setFormError(null);
      return;
    }

    const result = signUp(payload);
    if (!result.success) {
      setFormError(result.error ?? 'Unable to create account');
      return;
    }

    router.replace(getRedirectHref(redirect));
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

          <View className="mb-6 items-center">
            <Image source={images.mascotHappy} style={{ width: 64, height: 64, borderRadius: 22 }} />
            <Text className="mt-4 font-poppins-bold text-3xl text-text-primary dark:text-slate-50">
              Create account
            </Text>
            <Text className="mt-2 px-2 text-center font-poppins text-sm text-text-secondary dark:text-slate-400">
              Join ilihh as a client or artisan in Ilisan.
            </Text>
          </View>
        </View>
      }
    >
      <RoleSelector value={role} onChange={setRole} error={errors.role} />

      <AuthTextInput
        label="Full name"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Your full name"
        autoCapitalize="words"
        error={errors.fullName}
      />

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
        label="Phone"
        value={phone}
        onChangeText={setPhone}
        placeholder="+234 801 234 5678"
        keyboardType="phone-pad"
        error={errors.phone}
      />

      <AuthTextInput
        label="Location"
        value={location}
        onChangeText={setLocation}
        placeholder="Ilisan, Ogun State"
        error={errors.location}
      />

      <AuthTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="At least 6 characters"
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

      <AuthTextInput
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Re-enter your password"
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        error={errors.confirmPassword}
      />

      {formError ? (
        <Text className="mb-2 font-poppins text-xs text-danger">{formError}</Text>
      ) : null}

      <PrimaryButton label="Create Account" onPress={handleSignUp} />

      <View className="mt-8 flex-row items-center justify-center">
        <Text className="font-poppins text-sm text-text-secondary dark:text-slate-400">
          Already have an account?{' '}
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push(
              redirect ? `/login?redirect=${encodeURIComponent(String(redirect))}` : '/login'
            )
          }
          activeOpacity={0.7}
        >
          <Text className="font-poppins-semibold text-sm text-primary-purple dark:text-indigo-400">
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </AuthScreenLayout>
  );
}
