'use client';
import React from 'react';
import { ButtonMaker, IButtonProps } from '@components';
interface IBackButtonProps extends IButtonProps {
  icon?: 'chevron' | 'arrow' | 'caret';
  direction?: 'right' | 'left';
}
const BackButton = (props: IBackButtonProps) => {
  const { icon = 'arrow', direction = 'right' } = props;
  return (
    <ButtonMaker design="border rounded-circle bg-primary outline-icon-40" {...props}>
      <i className={`fa-solid fa-${icon}-${direction} text-white fa-lg`}></i>
    </ButtonMaker>
  );
};

export default BackButton;
