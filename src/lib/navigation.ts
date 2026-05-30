import type { Href } from 'expo-router';

export function getRedirectHref(redirect?: string | string[]): Href {
  const path = Array.isArray(redirect) ? redirect[0] : redirect;

  if (typeof path === 'string' && path.startsWith('/')) {
    return path as Href;
  }

  return '/';
}
