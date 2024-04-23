'use client';

import React from 'react';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { ImageMaker } from '@components';

const AddressItem = ({ address }: { address: DTO.IMemberAddressDTO }) => {
  const t = useTranslate('COMP_CHECKOUT_AddressItem');
  return (
    <div className="flex-between align-items-start rounded">
      <div className="flex-col-start gap-3">
        <div className="d-flex align-items-center gap-2">
          <ImageMaker src={'/images/svgs/address/address-type.svg'} />
          <h6 className="text-black m-0 fw-bold">{address.addressType === 2 ? t('HOME') : t('WORK')}</h6>
        </div>

        <div className="d-flex align-items-center gap-2 text-medium-gray ">
          <ImageMaker src={'/images/svgs/address/user.svg'} />
          <p className="fw-semibold">
            {address.firstName} {address.lastName}
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 text-medium-gray">
          <ImageMaker src={'/images/svgs/address/address.svg'} />

          <p>
            {`${t('BUILDING')}: ${address?.building}, ${t('FLOOR')}: ${address?.floor} , ${t('FLAT')}: ${address?.flat}`}
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 text-medium-gray ">
          <ImageMaker src={'/images/svgs/address/phone.svg'} />
          <p> {address.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default AddressItem;
