'use client';

import React from 'react';
import { IButtonProps, SubmitButton } from '@components';
import { useTranslate } from '@app/hooks';

interface IAddToCartProps extends IButtonProps {
  disabled: boolean;
  isLoading: boolean;
}

const AddToCart = (props: IAddToCartProps) => {
  const t = useTranslate('COMP_AddToCart');
  const { design, size, onClick, disabled = false, isLoading = false } = props;
  return (
    <SubmitButton
      title="add to cart"
      block={true}
      isLoading={isLoading}
      size={size}
      text={disabled ? null : t('ADD_TO_CART')}
      design={`flex-center font-14 ${disabled ? 'disabled' : design}`}
      onClick={onClick}
    >
      {disabled && (
        <div className="flex-center">
          <i className="fa-solid fa-ban text-danger pe-2"></i>
          <p>{t('SOLD_OUT')}</p>
        </div>
      )}
    </SubmitButton>
  );
};

export default AddToCart;
