'use client';
import React from 'react';
import { ButtonMaker, IButtonProps } from '@components';
import { Spinner } from 'reactstrap';

export interface IFavoriteProps extends Omit<IButtonProps, 'type'> {
  isLoading: boolean;
  isFilled: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}
const Favorite = (props: IFavoriteProps) => {
  const { isFilled, className, isLoading = false, size = 'lg', ...rest } = props;
  return (
    <div className="wrapper">
      <ButtonMaker design={className} block={false} {...rest}>
        <i className={`${isFilled ? 'fa-solid' : 'fa-regular'} fa-heart text-secondary fa-${size}`}></i>
      </ButtonMaker>
      {isLoading && (
        <div className="mask">
          <Spinner size="sm" type="grow" className="mx-2 flex-shrink-0" role="status" />
        </div>
      )}
    </div>
  );
};

export default Favorite;
