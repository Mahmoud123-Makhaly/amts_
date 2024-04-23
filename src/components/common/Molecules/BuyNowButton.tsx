'use client';

import React from 'react';
import { IButtonProps, SubmitButton } from '@components';
import { useTranslate } from '@app/hooks';

interface IBuyNowProps extends IButtonProps {
  disabled: boolean;
  isLoading: boolean;
}

const BuyNowButton = (props: IBuyNowProps) => {
  const t = useTranslate('COMP_BuyNow');
  const { design, size, onClick, disabled = false, isLoading = false } = props;
  return (
    <SubmitButton
      title="Buy Now"
      block={true}
      isLoading={isLoading}
      size={size}
      text={disabled ? null : t('BUY_NOW')}
      design={`flex-center font-14 ${disabled ? 'disabled' : design}`}
      onClick={onClick}
    />
  );
};

export default BuyNowButton;
