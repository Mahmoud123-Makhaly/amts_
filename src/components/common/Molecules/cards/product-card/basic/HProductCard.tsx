'use client';
import React, { ReactNode } from 'react';

import { DTO } from '@tot/core/types';
import { BadgeMaker, CardMaker, FavoriteForm, Rate } from '@components';
import { ICardMakerProps } from '../../../../atoms/CardMaker';

interface IProductCardProps extends ICardMakerProps {
  product?: DTO.IProductDTO;
  badge?: string;
  actionButton?: ReactNode;
  children?: React.ReactNode;
}
const ProductCard = (props: IProductCardProps) => {
  const { img, product, href, className, actionButton, badge, children } = props;

  return (
    <div className={`product-card h-basic-product-card flex-column flex-md-row d-flex flex-row ${className}`}>
      <CardMaker
        img={img ?? '/images/HProductNoImg.png'}
        overlay
        overlayContent={
          <div className={`flex-between ${!badge && 'flex-row-reverse'}`}>
            {badge && <BadgeMaker text={badge} className="diagonal-rounded-8" />}
            <div className="w-100 flex-start pt-2">
              <FavoriteForm
                product={product!}
                enableActionNotification
                className="border rounded-circle outline-icon-26 box-shadow"
                size="sm"
              />
            </div>
          </div>
        }
      />
      {/* <Link href={`/product/${product?.slug}`} className="w-100"> */}
      <div className="flex-column  align-items-start flex-lg-row flex-between align-items-end w-100">
        <div className="flex-col-start gap-3 mt-3 mt-lg-0     w-100 ms-3 ">
          <p className="fw-semibold">Product No.1</p>
          <table className="flex-col-start gap-2  ">
            <tr className="d-flex gap-4">
              <td colSpan={10} className="fw-semibold font-14">
                Category{' '}
              </td>
              <td>: {product?.name}</td>
            </tr>
            <tr className="d-flex align-items-center gap-4">
              <td className="fw-semibold font-14"> Quantity </td>
              <td>{actionButton}</td>
            </tr>
            <tr className="d-flex gap-5">
              <td className="fw-semibold font-14"> Price </td>
              <td className="fw-semibold ">: ${product?.price?.actual?.formattedAmount}</td>
            </tr>
          </table>
        </div>
        <div className="flex-start w-100 justify-content-lg-end">{children}</div>
      </div>
      {product?.description && <p className="fw-bold py-3 border-bottom">{product?.description}</p>}
      {/* </Link> */}
    </div>
  );
};

export default ProductCard;
