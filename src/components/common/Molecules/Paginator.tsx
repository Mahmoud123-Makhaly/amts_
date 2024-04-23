'use client';
import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
interface IPaginatorProps extends ReactPaginateProps {}
const Paginator = (props: IPaginatorProps) => {
  const { pageCount, nextLabel = '', previousLabel = '', breakLabel, onPageChange, forcePage, ...rest } = props;
  return (
    <ReactPaginate
      containerClassName="react-paginate"
      breakLabel={breakLabel}
      nextLabel={nextLabel}
      onPageChange={onPageChange}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      previousLabel={previousLabel}
      renderOnZeroPageCount={null}
      forcePage={forcePage}
      {...rest}
    />
  );
};

export default Paginator;
