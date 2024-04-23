'use client ';

import React, { useState } from 'react';
import { Label, Modal } from 'reactstrap';
import { Field } from 'formik';
import { useSession } from 'next-auth/react';

import { ButtonMaker, EmptyAddress, ImageMaker } from '@components';
import { useTranslate } from '@app/hooks';

import { IShipmentTemplateProps } from '../ShippingMethod';
import { AddressItem, Addresses, AddOrEditAddress } from './common';

interface IZoneRateProps extends IShipmentTemplateProps {}
const ZoneRate = ({ shipment, shippingMethod, availableAddresses, onAddressAddOrChange }: IZoneRateProps) => {
  const t = useTranslate('COMP_Shipping_Address');
  const [openedModal, setOpenedModal] = useState<'list' | 'form' | ''>('');
  const { data: session } = useSession();

  return (
    <div className="mb-1">
      <div style={{ visibility: 'hidden' }}>
        <Field
          className="form-check-input pointer "
          type="radio"
          id={shippingMethod.code}
          name="cartShipmentMethod"
          value={shippingMethod.code}
        />
        <Label htmlFor={shippingMethod.code} className="text-black ms-2  pointer">
          {t('SHIPPING_TO_YOUR_LOCATION')}
        </Label>
      </div>

      <div className="border rounded bg-white mb-3 pb-3 px-3">
        <div className="flex-between mb-3">
          <Modal isOpen={openedModal != ''} size="lg" centered>
            {openedModal === 'list' && (
              <Addresses
                availableAddresses={availableAddresses}
                onAddressAddOrChange={onAddressAddOrChange}
                cancel={() => setOpenedModal('')}
              />
            )}
            {openedModal === 'form' && (
              <AddOrEditAddress
                data={shipment?.deliveryAddress}
                onAddressAddOrChange={onAddressAddOrChange}
                cancel={() => setOpenedModal('')}
              />
            )}
          </Modal>
        </div>
        {shipment && shipment.deliveryAddress ? (
          <div className="flex-between flex-wrap">
            <AddressItem address={shipment.deliveryAddress} />
            <div className="flex-col-start gap-3 w-25">
              <ButtonMaker
                type="button"
                design="bg-primary border-primary text-white d-flex align-items-center font-14 box-shadow w-100"
                onClick={() => (session?.isAuthorized ? setOpenedModal('list') : setOpenedModal('form'))}
              >
                <ImageMaker src={'/images/svgs/checkout/change.svg'} />
                <p>{t('CHANGE')}</p>
              </ButtonMaker>
            </div>
          </div>
        ) : (
          <div className="flex-between flex-wrap">
            <EmptyAddress />
            <ButtonMaker
              text={t('ADD_NEW_ADDRESS')}
              type="button"
              design="bg-transparent border-0 underline text-primary font-14 pb-0"
              onClick={() => setOpenedModal(availableAddresses && availableAddresses.length ? 'list' : 'form')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoneRate;
