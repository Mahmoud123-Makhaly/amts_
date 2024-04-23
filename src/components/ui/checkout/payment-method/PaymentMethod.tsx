'use client';

import React from 'react';
import { Field } from 'formik';
import { Label } from 'reactstrap';

import { DTO } from '@tot/core/types';
import { useTranslate } from '@app/hooks';

interface IPaymentMethodProps {
  cart: DTO.ICartDTO;
  onSubmitOrChangePayment: (method: DTO.IPaymentMethodTypeDTO, address?: DTO.IMemberAddressDTO) => void;
}
const PaymentMethod = ({ cart, onSubmitOrChangePayment }: IPaymentMethodProps) => {
  const t = useTranslate('COMP_PaymentMethod');

  return (
    <div id="cartPaymentMethod" role="group" aria-labelledby="cartPaymentMethod" className="my-3">
      {cart.availablePaymentMethods?.map((method, indx) => (
        <div className="mb-3 border rounded py-2 px-3" key={method.code}>
          <div className="pointer">
            <Field
              className="form-check-input pointer"
              type="radio"
              id={method.code}
              name="cartPaymentMethod"
              value={method.code}
              onChangeCapture={() => onSubmitOrChangePayment(method)}
            />

            <Label htmlFor={method.code} className="text-black ms-2 mb-0 pointer fw-semibold">
              {method.description ?? method.name ?? method.code}
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentMethod;
