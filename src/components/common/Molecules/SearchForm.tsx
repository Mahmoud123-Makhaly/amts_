'use client';

import React from 'react';
import { Form, Input } from 'reactstrap';
import { ButtonMaker } from '../..';
interface ISearchFormProps {
  className?: string;
  placeholder?: string;
  btnContent?: React.ReactNode;
}
const SearchForm = (props: ISearchFormProps) => {
  const { placeholder, btnContent = <i className="fa-solid fa-magnifying-glass"></i>, className } = props;
  return (
    <Form className={`d-flex flex-grow-1 ${className}`} role="search">
      <Input className="round-start-10" type="search" placeholder={placeholder} aria-label="Search" />
      <ButtonMaker className="search-btn rounded-0 round-end-10" type="submit">
        {btnContent}
      </ButtonMaker>
    </Form>
  );
};

export default SearchForm;
