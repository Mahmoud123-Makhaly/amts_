'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { useLocale } from 'next-intl';

import { DropDown, ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';
import { Actions } from '@libs/actions';
import { Link, usePathname } from '@navigation';

const AccountMenu = () => {
  const t = useTranslate('COMP_AccountMenu');
  const { data: session } = useSession();
  const pathName = usePathname();
  const locale = useLocale();

  const onLogout = async () => {
    await Actions.account.logout();
    signOut({
      callbackUrl: `${window.location.origin}/${locale}`,
    });
  };

  const loginItems = [
    {
      text: t('MY_ACCOUNT'),
      href: '/profile/my-account',
      className: 'text-center text-black pb-1',
      divider: true,
    },
    {
      text: t('MY_ORDERS'),
      href: '/profile/my-orders',
      className: 'text-center text-black border-0  pb-1',
      divider: true,
    },

    {
      text: t('ADDRESS'),
      href: '/profile/addresses',
      className: 'text-center text-black border-0  pb-1',
      divider: true,
    },
    {
      text: t('WISHLIST'),
      href: '/profile/wishlist',
      className: 'text-center text-black border-0  pb-1',
      divider: true,
    },
    {
      text: t('SIGN_OUT'),
      className: 'text-center text-black border-0 fw-semibold pb-1 w-100',
      onClick: onLogout,
    },
  ];
  const unLoginItems = [
    {
      text: t('LOGIN'),
      href: `/auth/login?redirectURL=${pathName}`,
      className: 'text-center text-black border-0  pb-1',
      divider: true,
    },

    {
      text: t('SIGN_UP'),
      href: `/auth/sign-up?redirectURL=${pathName}`,
      className: 'text-center text-black border-0  pb-1',
    },
  ];
  return (
    <DropDown
      menuItems={session?.isAuthorized ? loginItems : unLoginItems}
      headerClassName="border-0 bg-white py-0 px-2 border-end rounded-0"
      menuClassName="mt-1 px-4 account-dropdown"
      caret={false}
      title={<ImageMaker src="/images/svgs/icon.svg" alt={'account'} />}
    />
  );
};

export default AccountMenu;
