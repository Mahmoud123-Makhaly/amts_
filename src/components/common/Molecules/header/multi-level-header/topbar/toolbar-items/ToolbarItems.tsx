'use client';

import React from 'react';

import Image from 'next/image';

import { Link } from '@navigation';

import { MiniCartMenu } from './mini-cart';
import AccountMenu from './AccountMenu';
import LanguageSelect from './LanguageSelect';
import FulfillmentMenu from './FulfillmentMenu';
import { ImageMaker } from '@components';

const ToolbarItems = () => {
  return (
    <div className="d-flex align-items-center flex-wrap">
      <MiniCartMenu />
      <Link href={'/profile/wishlist'} className="px-2 border-end rounded-0 flex-center">
        <ImageMaker src="/images/svgs/header/heart.svg" alt={'heart'} />
      </Link>
      <AccountMenu />
      <LanguageSelect />
      <FulfillmentMenu />
    </div>
  );
};

export default ToolbarItems;
