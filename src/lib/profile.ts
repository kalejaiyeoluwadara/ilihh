import { images } from '@/constants/images';
import type { User } from '@/types/user';

export function getProfileImageSource(user?: Pick<User, 'avatarUri'> | null) {
  return user?.avatarUri ? { uri: user.avatarUri } : images.mascotHappy;
}
