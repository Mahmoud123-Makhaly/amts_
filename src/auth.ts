import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { DTO } from '@tot/core/types';
import { Actions } from '@libs/actions';

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://');
const cookiePrefix = process.env.SITE_NAME?.replace(' ', '-');
//NextAuth Options: https://next-auth.js.org/configuration/options#providers

async function refreshAccessToken(jwt: DTO.IJWT, user: DTO.IUserDTO) {
  try {
    const { data: result, serverError, validationErrors } = await Actions.account.refreshToken(jwt.refreshToken ?? '');

    if (result?.data) {
      return {
        user,
        jwt: {
          ...result.data,
          expiresIn: (Date.now() + Number.parseInt((result?.data.expiresIn || '0').toString()) * 1000).toString(),
        },
      };
    } else {
      throw { user, jwt };
    }
  } catch (error) {
    console.error('RefreshAccessTokenError', error);
    return {
      error: 'RefreshAccessTokenError',
    };
  }
}

const options: AuthOptions = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/sign-up',
  },
  providers: [
    CredentialsProvider({
      id: 'default',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        jwt: { type: 'object' },
        user: { type: 'object' },
      },
      //Step:1
      authorize(credentials) {
        // console.group('---------------------authorize---------------------');
        // console.log('authorize has credentials ------> ', !!credentials);
        // console.log('authorize ------> ', credentials);
        // console.groupEnd();

        let user = null;
        if (credentials?.user) {
          user = JSON.parse(credentials.user);
          if (credentials?.jwt) {
            const jwt = JSON.parse(credentials.jwt);
            return {
              user,
              jwt: {
                ...jwt,
                expiresIn: (Date.now() + Number.parseInt((jwt.expiresIn || '0').toString()) * 1000).toString(),
              },
            };
          } else return user;
        } else return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    //Step:2 double call token undefined props, then with values
    async jwt({ token, user, account, profile, trigger, session }) {
      // console.group('---------------------jwt---------------------');
      // console.log('token ------> ', token);
      // console.log('user ------> ', user);
      // console.log('account ------> ', account);
      // console.log('profile ------> ', profile);
      // console.log('trigger ------> ', trigger);
      // console.log('session ------> ', session);
      // console.groupEnd();
      // Return previous token if the access token has not expired yet
      if (
        (trigger === 'signIn' && user.jwt && Date.now() < Number.parseInt(user.jwt.expiresIn || '0')) ||
        ('jwt' in token && Date.now() < Number.parseInt(((token.jwt as DTO.IJWT).expiresIn || '0').toString()))
      ) {
        return { ...token, ...user };
      } else {
        // console.log('use is not authorized');
        // console.log(refreshAccessToken((token.jwt ?? user.jwt) as DTO.IJWT, (token.user ?? user.user) as DTO.IUserDTO));
      }
      return { ...token, ...user };
    },
    //Step:3
    session({ session, token, user }) {
      const _jwt = token.jwt as DTO.IJWT | undefined;
      const _user = token.user as DTO.IUserDTO | undefined;
      /* Step 2: update the session.user based on the token object */
      session.user = _user;
      session.jwt = _jwt;
      session.isAuthorized = !!_jwt?.accessToken;
      // console.group('---------------------session---------------------');
      // console.log('session ------> ', session);
      // console.log('token ------> ', token);
      // console.log('user ------> ', user);
      // console.groupEnd();
      return session;
    },
  },
  logger: {
    error(code, metadata) {
      console.error(`next-auth-${code}:`, JSON.stringify(metadata));
    },
    warn(code) {
      console.warn(`next-auth-warning: ${JSON.stringify(code)}`);
    },
    debug(code, metadata) {
      //console.debug(`next-auth-${code}:`, metadata);
    },
  },
  useSecureCookies,
  cookies: {
    sessionToken: {
      name: useSecureCookies
        ? `__Secure-next-auth.session-token.${cookiePrefix}`
        : `next-auth.session-token.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    callbackUrl: {
      name: useSecureCookies
        ? `__Secure-next-auth.callback-url.${cookiePrefix}`
        : `next-auth.callback-url.${cookiePrefix}`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    csrfToken: {
      name: useSecureCookies ? `__Host-next-auth.csrf-token.${cookiePrefix}` : `next-auth.csrf-token.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
    pkceCodeVerifier: {
      name: `next-auth.pkce.code_verifier.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
    state: {
      name: `next-auth.state.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        maxAge: 900,
      },
    },
    nonce: {
      name: `next-auth.nonce.${cookiePrefix}`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
  },
};
export default options;
