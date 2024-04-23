'use client';

import React from 'react';
import { Label } from 'reactstrap';
import { Field } from 'formik';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { ZoneRate } from './shipping-templates';

interface IShippingMethodProps {
  cart: DTO.ICartDTO;
  onSubmitOrChangeShipment: (method: DTO.IShippingMethodTypeDTO, address?: DTO.IMemberAddressDTO) => Promise<void>;
  availableAddresses?: Array<DTO.IMemberAddressDTO> | undefined;
}

export interface IShipmentTemplateProps {
  shipment?: DTO.IShipmentTypeDTO;
  onAddressAddOrChange: (address?: DTO.IMemberAddressDTO) => Promise<void>;
  shippingMethod: DTO.IShippingMethodTypeDTO;
  availableAddresses?: Array<DTO.IMemberAddressDTO> | undefined;
}

const ShippingMethod = ({ cart, onSubmitOrChangeShipment, availableAddresses }: IShippingMethodProps) => {
  const t = useTranslate('COMP_Shipping_Address');

  const DefaultShipmentTemplate = ({ shipment, shippingMethod, onAddressAddOrChange }: IShipmentTemplateProps) => {
    return (
      <div className="mb-3">
        <div className="pointer ">
          <Field
            className="form-check-input pointer"
            type="radio"
            id={shippingMethod.code}
            name="cartShipmentMethod"
            value={shippingMethod.code}
            onChangeCapture={() =>
              onAddressAddOrChange({
                countryCode: 'EGY',
                countryName: 'Egypt',
                city: '701',
                firstName: 'Guest',
                lastName: 'Guest',
                addressType: 3,
                address: '6 أكتوبر /مركز جمجوم الدولي - الحي المتميز',
                building: '6',
                floor: '6',
                flat: '6',
                isDefault: false,
                postalCode: '7011',
                regionId: '701',
                regionName: '6 أكتوبر',
                phone: '01015159913',
                email: 'info@sab-cleaning.com',
              })
            }
          />

          <Label htmlFor={shippingMethod.code} className="text-black ms-2  pointer">
            {shippingMethod.name ?? shippingMethod.optionName}
          </Label>
        </div>
      </div>
    );
  };

  const getTemplate = async (method: DTO.IShippingMethodTypeDTO) => {
    const props: IShipmentTemplateProps = {
      shipment: cart.shipments?.at(0),
      shippingMethod: method,
      onAddressAddOrChange: (address?: DTO.IMemberAddressDTO) => onSubmitOrChangeShipment(method, address),
      availableAddresses,
    };
    switch (method.code) {
      case 'ZoneRate':
        return <ZoneRate {...props} />;
      default:
        return <DefaultShipmentTemplate {...props} />;
    }
  };

  return (
    <div
      id="cartShipmentMethod"
      role="group"
      aria-labelledby="cartShipmentMethod"
      className="bg-light-gray rounded pt-3 pb-2"
    >
      {cart.availableShippingMethods?.map((elem, indx) => (
        <React.Fragment key={indx}>{getTemplate(elem)}</React.Fragment>
      ))}
    </div>
  );
};

export default ShippingMethod;
