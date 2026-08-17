import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // The share card used to be a route handler here, and letting the locale
  // middleware rewrite `/og` to `/it/og` made it 404, which silently broke every
  // link preview on Instagram and WhatsApp. It is a file now (public/og.jpg,
  // built by `yarn og`) and the dotted-path rule below already excludes it.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
