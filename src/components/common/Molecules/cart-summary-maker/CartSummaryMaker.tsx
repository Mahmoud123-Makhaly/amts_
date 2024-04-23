import React from 'react';

interface ICartSummaryMakerProps {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  items: Array<{ text: string; price: string | number }>;
}
const CartSummaryMaker = (props: ICartSummaryMakerProps) => {
  const { children, header, className, items, footer } = props;
  return (
    <div className={`p-4 ${className}`}>
      {header}
      <div className="d-flex flex-column gap-4 mt-4 w-100">
        {items.length &&
          items.map((item, index) => (
            <div className="flex-between" key={index}>
              <p className="fw-semibold">{item.text}</p>
              <p className="text-dark-gray">{item.price}</p>
            </div>
          ))}
      </div>
      {footer}
      {children}
    </div>
  );
};

export default CartSummaryMaker;
