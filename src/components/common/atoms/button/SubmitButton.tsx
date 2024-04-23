'use client';

import { Spinner } from 'reactstrap';

import ButtonMaker, { IButtonProps } from './ButtonMaker';
import { useFormStatus } from 'react-dom';

export interface ISubmitButtonProps extends Omit<IButtonProps, 'type'> {
  isLoading: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'block';
}
const SubmitButton = (props: ISubmitButtonProps) => {
  const {
    text,
    design,
    outline,
    color = 'primary',
    block = false,
    close,
    onClick,
    children,
    disabled = false,
    isLoading = false,
    size,
    ...rest
  } = props;

  return (
    <ButtonMaker
      type="submit"
      className={`button-maker ${design}`}
      outline={outline}
      color={color}
      block={block}
      close={close}
      onClick={onClick}
      disabled={disabled}
      text={isLoading ? null : text}
      {...rest}
      size={size}
    >
      {isLoading ? <Spinner size="sm" type="grow" className="mx-2 flex-shrink-0" role="status" /> : children}
    </ButtonMaker>
  );
};

export default SubmitButton;
