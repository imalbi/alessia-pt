'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { LenisProvider } from './providers/lenis-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      themes={['light', 'dark', 'dark-noir', 'dark-neon', 'light-warm']}
      enableSystem
      disableTransitionOnChange
    >
      <LenisProvider>{children}</LenisProvider>
    </NextThemesProvider>
  );
}
