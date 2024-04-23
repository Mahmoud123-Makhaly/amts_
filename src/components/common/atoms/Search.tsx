'use client';
import React from 'react';
import { Form, Input } from 'reactstrap';
import { ButtonMaker } from '@components';
import { InputProps, InputType } from 'reactstrap/types/lib/Input';

interface SearchProps extends Omit<InputProps, 'type' | 'onSubmit' | 'onKeyDown'> {
  className?: string;
  placeholder?: string;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  inputType?: InputType;
  searchButton: React.ReactNode;
  buttonClassName?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
}

const Search = ({
  className,
  inputType,
  onSubmit,
  placeholder,
  searchButton,
  buttonClassName,
  onKeyDown,
  ...rest
}: SearchProps) => {
  return (
    <Form className={`w-100 rounded d-flex ${className ? className : 'd-flex search'}`}>
      <Input
        type={inputType ? inputType : 'text'}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        className="round-end-0 round-start-5"
        {...rest}
      ></Input>
      {searchButton && (
        <ButtonMaker onClick={onSubmit} type={'submit'} design="round-start-0 round-end-5 bg-dark-blue">
          {searchButton}
        </ButtonMaker>
      )}
    </Form>
  );
};

export default Search;
