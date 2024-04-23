'use client';
import React from 'react';
import { useLocale } from 'next-intl';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

import { AccordionMaker, Avatar, ButtonMaker, VTabs } from '@components';
import { useTranslate } from '@app/hooks';
import { Actions } from '@libs/actions';

const ProfileTabs = () => {
  const t = useTranslate('COMP_ProfileTabs');
  const { data: session } = useSession();
  const locale = useLocale();
  const onLogout = async () => {
    await Actions.account.logout();

    await signOut({
      callbackUrl: `${window.location.origin}/${locale}`,
    });
  };

  return (
    <div className="mt-5">
      <div className="d-none d-lg-block rounded p-3 border">
        <div className="flex gap-2 mb-2">
          <Avatar img="/images/home/avatars/1.png" size="large" />
          <div className="flex gap-1">
            <h6 className="fw-bold mb-0">{session?.user?.firstName}</h6>
            <h6 className="fw-bold mb-0">{session?.user?.lastName}</h6>
          </div>
        </div>
        <VTabs
          icon="chevron"
          tabs={[
            {
              title: t('MY_ACCOUNT'),
              link: '/profile/my-account',
            },
            {
              title: t('MY_ORDERS'),
              link: '/profile/my-orders',
            },
            {
              title: t('MY_QUOTES'),
              link: '/profile/my-quotes',
            },
            {
              title: t('MY_SERVERS'),
              link: '/profile/addresses',
            },
            {
              title: t('WISHLIST'),
              link: '/profile/wishlist',
            },

            {
              title: t('SETTING'),
              link: '/profile/setting',
            },
          ]}
        />

        <ButtonMaker
          design="mt-2"
          block
          onClick={(e: any) => {
            e.preventDefault();
            onLogout();
          }}
          text={t('LOG_OUT')}
        />
      </div>
      <div className="d-lg-none">
        <AccordionMaker
          items={[
            {
              header: <p>{t('SECTIONS')}</p>,
              content: (
                <VTabs
                  icon="chevron"
                  tabs={[
                    {
                      title: t('MY_ACCOUNT'),
                      link: '/profile/my-account',
                    },
                    {
                      title: t('INSPECTION'),
                      link: '/profile/inspection',
                    },
                    {
                      title: t('MY_BOOKING'),
                      link: '/profile/booking',
                    },
                    {
                      title: t('MY_ORDERS'),
                      link: '/profile/my-orders',
                    },
                    {
                      title: t('WISHLIST'),
                      link: '/profile/wishlist',
                    },

                    {
                      title: t('LOCATION'),
                      link: '/profile/addresses',
                    },
                    {
                      title: t('SETTING'),
                      link: '/profile/setting',
                    },
                    {
                      title: t('LOG_OUT'),
                      link: 'logout',
                      onClick: e => {
                        e.preventDefault();
                        onLogout();
                      },
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProfileTabs;
