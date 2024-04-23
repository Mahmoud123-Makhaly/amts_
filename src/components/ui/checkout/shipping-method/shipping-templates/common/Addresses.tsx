'use client';

import React, { useState } from 'react';

import { DTO } from '@tot/core/types';
import { ButtonMaker, Modal, EmptyAddress } from '@components';
import { useTranslate } from '@app/hooks';

import { AddOrEditAddress, AddressItem } from './index';

const Addresses = ({
  availableAddresses,
  onAddressAddOrChange,
  cancel,
}: {
  availableAddresses: Array<DTO.IMemberAddressDTO> | undefined;
  onAddressAddOrChange: (address: DTO.IMemberAddressDTO) => Promise<void>;
  cancel: () => void;
}) => {
  const t = useTranslate('COMP_Shipping_Address');
  const [selectedAddress, setSelectedAddress] = useState<DTO.IMemberAddressDTO>();
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);

  const handleSelect = (item: DTO.IMemberAddressDTO) => {
    setSelectedAddress(item);
  };

  return (
    <React.Fragment>
      <Modal isOpen={isFormModalOpen} size="lg" centered>
        <AddOrEditAddress onAddressAddOrChange={onAddressAddOrChange} cancel={() => setIsFormModalOpen(false)} />
      </Modal>
      <div className="py-4 px-3">
        <div>
          <div className="flex-between mb-3">
            <h6> {t('SHIPPING_ADDRESS')}</h6>
            <ButtonMaker text={t('ADD_NEW_ADDRESS')} type="button" onClick={() => setIsFormModalOpen(true)} />
          </div>
          {availableAddresses?.map(address => (
            <div
              key={address.id}
              className={`border mb-3 rounded py-2 pointer px-3 ${selectedAddress?.id === address.id ? 'border-primary' : ''} `}
              onClick={() => handleSelect(address)}
            >
              <AddressItem address={address} />
            </div>
          )) ?? <EmptyAddress />}
        </div>

        <div className="mt-3 flex-center w-100 ">
          <ButtonMaker
            text={t('CONFIRM')}
            design="me-2 paddingx-20"
            onClick={() => selectedAddress && onAddressAddOrChange(selectedAddress)}
            disabled={!selectedAddress}
          />
          <ButtonMaker text={t('CANCEL')} design="bg-white border-primary text-primary paddingx-20" onClick={cancel} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Addresses;
