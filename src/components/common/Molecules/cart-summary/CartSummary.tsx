'use client';

import React from 'react';

import { ICartSummaryDataProps } from './ICartSummaryDataProps';
import { CardMaker } from '@components';

interface ICartSummaryProps {
  title?: string;
  data: Array<ICartSummaryDataProps>;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
const CartSummary = (props: ICartSummaryProps) => {
  const { data, title, children, className } = props;

  return (
    <CardMaker className={`bg-transparent ${className}`} header={title}>
      <table className="w-100 mb-0 mt-3">
        <tbody className="d-flex flex-column gap-2 w-100">
          {data.map((item, index) => {
            return (
              <tr key={index} className={`flex-between ${item.className ?? ''}`}>
                <td className="ps-0 font-12 fw-bold">{item?.text}</td>
                <td className="pe-0 font-12 ">{item?.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </CardMaker>
  );
};

export default CartSummary;
