import { SymbolView } from 'expo-symbols';
import type { StyleProp, ViewStyle } from 'react-native';

type IconProps = {
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
};

export function SearchIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'magnifyingglass', android: 'search', web: 'search' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function CalendarIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'calendar', android: 'calendar_today', web: 'calendar_today' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function MessageIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{
        ios: 'bubble.left.and.bubble.right',
        android: 'chat_bubble_outline',
        web: 'chat_bubble_outline',
      }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function ProfileIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'person', android: 'person', web: 'person' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function DashboardIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{
        ios: 'square.grid.2x2',
        android: 'dashboard',
        web: 'dashboard',
      }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function TasksIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{
        ios: 'wrench.and.screwdriver',
        android: 'build',
        web: 'build',
      }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function BackIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'chevron.left', android: 'arrow_back', web: 'arrow_back' }}
      size={size}
      weight="semibold"
      tintColor={color}
      style={style}
    />
  );
}

export function MailIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'envelope', android: 'mail', web: 'mail' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function LockIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'lock', android: 'lock', web: 'lock' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function EyeIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'eye', android: 'visibility', web: 'visibility' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function EyeSlashIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'eye.slash', android: 'visibility_off', web: 'visibility_off' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function UserIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'person.text.rectangle', android: 'badge', web: 'badge' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function PhoneIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'phone', android: 'phone', web: 'phone' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function LocationIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'location', android: 'location_on', web: 'location_on' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function StarIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'star.fill', android: 'star', web: 'star' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function VerifiedIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'checkmark.seal.fill', android: 'verified', web: 'verified' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function BriefcaseIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'bag.fill', android: 'work', web: 'work' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function ClockIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'clock', android: 'schedule', web: 'schedule' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function CheckCircleIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function SendIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'paperplane.fill', android: 'send', web: 'send' }}
      size={size}
      weight="semibold"
      tintColor={color}
      style={style}
    />
  );
}

export function CameraIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'camera.fill', android: 'photo_camera', web: 'photo_camera' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function PhotoLibraryIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'photo.on.rectangle', android: 'photo_library', web: 'photo_library' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function PencilIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'pencil', android: 'edit', web: 'edit' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function LogOutIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'rectangle.portrait.and.arrow.right', android: 'logout', web: 'logout' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function RefreshIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'arrow.clockwise', android: 'refresh', web: 'refresh' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function SwapIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'arrow.left.arrow.right', android: 'swap_horiz', web: 'swap_horiz' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function InfoIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{
        ios: 'info.circle',
        android: 'info',
        web: 'info',
      }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function ShieldIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'shield', android: 'shield', web: 'shield' }}
      size={size}
      weight="medium"
      tintColor={color}
      style={style}
    />
  );
}

export function ChevronRightIcon({ size = 20, color, style }: IconProps) {
  return (
    <SymbolView
      name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }}
      size={size}
      weight="semibold"
      tintColor={color}
      style={style}
    />
  );
}
