'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { LenisProvider } from './providers/lenis-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="caldo"
      themes={['caldo', 'diretto', 'mediterraneo']}
      enableSystem={false}
      disableTransitionOnChange
    >
      <LenisProvider>{children}</LenisProvider>
    </NextThemesProvider>
  );
}
