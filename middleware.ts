import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // `og` is excluded alongside `api`: it is a route handler, not a page, and
  // letting the locale middleware rewrite it to /it/og made it 404, which
  // silently broke every link preview on Instagram and WhatsApp.
  matcher: ['/((?!api|og|_next|_vercel|.*\\..*).*)'],
};
