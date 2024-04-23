'use server';

import { createSafeActionClient } from 'next-safe-action';
import { cookies } from 'next/headers';

import { Actions } from '@libs/actions';
import { Context, env } from '@libs';
import { DTO } from '@tot/core/types';
import { decryptObject, isIUserDTO, getHashSubKey } from './session';

const _sessionCookieName = 'UAS_TOT';
export const client = createSafeActionClient({
  // If you need to access validated input, you can use `parsedInput` how you want
  // in your middleware. Please note that `parsedInput` is typed unknown, as it
  // comes from an action, while middleware is an (optional) instance function.
  // Can also be a non async function.
  async middleware(parsedInput) {
    let userId = undefined;
    const cookiesList = cookies();
    if (cookiesList.has(_sessionCookieName)) {
      try {
        const obj = JSON.parse(cookiesList.get(_sessionCookieName)?.value ?? '');
        const _decData = decryptObject<any>(obj?.DID ?? '', getHashSubKey(env.HASH_SECRET));
        if (isIUserDTO(_decData)) {
          userId = (_decData as DTO.IUserDTO).id;
        }
      } catch {}
    }

    const hasTokenKey = (obj: unknown): obj is { accessToken: string } => {
      return typeof obj === 'object' && obj !== null && 'accessToken' in obj;
    };

    const accessToken = hasTokenKey(parsedInput) ? parsedInput.accessToken : undefined;
    const selectedInventory = await Actions.session.getSessionAppSettingValueByKey<{ id: string; name?: string }>(
      'INV',
    );

    const _context = await new Context().buildServiceContext(accessToken, userId);
    return { _context: _context._services!, selectedInventory: selectedInventory };
  },
  // Can also be an async function.
  handleServerErrorLog(e) {
    // And also log it to the console.
  },
  // Can also be an async function.
  handleReturnedServerError(e) {
    return `${e.name}:${e.cause}:${e.message}:${e.stack}`;
  },
});
