'use client';

import React, { useMemo } from 'react';
import { Button, ButtonProps } from 'reactstrap';

export interface IButtonProps extends Omit<ButtonProps, 'className' | 'cssModule' | 'tag' | 'type'> {
  design?: string;
  tag?: 'button' | 'span';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'block';
  type?: 'button' | 'reset' | 'submit';
}

const ButtonMaker = (props: IButtonProps) => {
  const {
    text,
    design,
    outline,
    color = 'primary',
    type = 'button',
    close,
    onClick,
    children,
    disabled = false,
    size,
    tag = 'button',
    ...rest
  } = props;

  const btnWidth = useMemo(() => {
    switch (size) {
      case 'xs':
        return '40px';
      case 'sm':
        return '60px';
      case 'md':
        return '84px';
      case 'lg':
        return '110px';
      case 'xl':
        return '130px';
      case 'xxl':
        return '150px';
      default:
        'fit-content';
    }
  }, [size]);

  return (
    <React.Fragment>
      {tag === 'button' && (
        <Button
          type={type}
          className={`button-maker flex-center ${design}`}
          outline={outline}
          color={color}
          block={size === 'block' ? true : false}
          close={close}
          onClick={onClick}
          disabled={disabled}
          {...rest}
          style={{ width: btnWidth }}
        >
          {text}
          {children}
        </Button>
      )}
      {tag === 'span' && (
        <span className={`button-maker ${design ?? ''}`} color={color} onClick={onClick} {...rest}>
          {text}
          {children}
        </span>
      )}
    </React.Fragment>
  );
};

export default ButtonMaker;
