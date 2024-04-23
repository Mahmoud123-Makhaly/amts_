'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, notFound } from 'next/navigation';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Modal, ButtonMaker, ImageMaker } from '@components';

import RemoveAddressModal from './RemoveAddressModal';

const AddressItem = ({
  address,
  onEdit,
}: {
  address: DTO.IMemberAddressDTO;
  onEdit: (address: DTO.IMemberAddressDTO) => void;
}) => {
  const t = useTranslate('COMP_AddressItem');
  const [deleteModal, setDeleteModal] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const onDismiss = () => {
    setDeleteModal(false);
    router.push('/profile/addresses');
  };

  if (!session || !session.isAuthorized || !session.user?.memberId) notFound();

  return (
    <div className="p-4 mb-4 flex-between align-items-start border rounded">
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
      <div className="flex-col-start gap-3">
        <ButtonMaker
          block
          design="gap-2 align-items-center d-flex"
          onClick={() => {
            onEdit(address);
          }}
        >
          <ImageMaker src={'/images/svgs/address/edit.svg'} className="d-inline-block" />
          <p>{t('EDIT')}</p>
        </ButtonMaker>
        <ButtonMaker
          block
          outline
          design="text-danger bg-white border-danger gap-2 align-items-center d-flex"
          onClick={() => setDeleteModal(true)}
        >
          <ImageMaker src={'/images/svgs/address/remove.svg'} className="d-inline-block" />
          <p>{t('DELETE')}</p>
        </ButtonMaker>
      </div>
      {/* <div className="d-flex align-items-center gap-3">
        <Input type="checkbox" id="default" />
        <label htmlFor="default" className="text-medium-gray">
          {t('Default_ADDRESS')}
        </label>
      </div> */}
      <Modal toggleShow={() => setDeleteModal(false)} isOpen={deleteModal}>
        <RemoveAddressModal onDismiss={onDismiss} address={address} />
      </Modal>
    </div>
  );
};

export default AddressItem;
