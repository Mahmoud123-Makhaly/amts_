import { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

import { locales, localePrefix, defaultLocale } from './navigation';

const protectedPages: Array<string> = [];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix,
  defaultLocale,
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  req => intlMiddleware(req),
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  },
);

export default function middleware(req: NextRequest) {
  const protectedPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${protectedPages.flatMap(p => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i',
  );

  req.headers.set('Accept-Language', req.cookies?.get('NEXT_LOCALE')?.value ?? defaultLocale);

  const isProtectedPathnameRegexPage = protectedPathnameRegex.test(req.nextUrl.pathname);

  if (isProtectedPathnameRegexPage && protectedPages.length > 0) {
    return (authMiddleware as any)(req);
  } else {
    return intlMiddleware(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    '/((?!api|_next|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images|icons|manifest.*\\..*).*)',
  ],
};
