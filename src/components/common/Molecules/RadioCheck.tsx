'use client';
import React from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { CheckInput, ImageMaker } from '@components';

interface IRadioCheck {
  icon?: string | StaticImport;
  activeIcon?: string | StaticImport;
  text?: string;
  checkedColor?: string;
  unCheckedColor?: string;
  className?: string;
  value: string | number | readonly string[];
  name: string;
  id?: string;
  as?: 'input' | 'field';
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}
const RadioCheck = (props: IRadioCheck) => {
  const {
    icon,
    text,
    checkedColor,
    unCheckedColor,
    id,
    as = 'input',
    value,
    className,
    activeIcon,
    name,
    onChange,
    onClick,
  } = props;

  return (
    <CheckInput
      name={name}
      type="radio"
      id={id}
      as={as}
      className={`border rounded ${className}`}
      value={value}
      onChange={onChange}
      onClick={onClick}
    >
      <div className="flex-col gap-4">
        {icon && (
          <div className="check-icon">
            {activeIcon && <ImageMaker src={activeIcon} className="active-icon" />}
            <ImageMaker src={icon} className="icon" />
          </div>
        )}
        <p className="check-text">{text}</p>
      </div>
    </CheckInput>
  );
};

export default RadioCheck;
