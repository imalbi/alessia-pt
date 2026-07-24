import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // A static snapshot (see `yarn preview:static`) is served without the Next
  // image optimizer route, so images there are emitted as plain <img>. The
  // real Workers deploy is unaffected and keeps optimisation on.
  images: { unoptimized: process.env.STATIC_PREVIEW === '1' },
};

export default withNextIntl(nextConfig);
