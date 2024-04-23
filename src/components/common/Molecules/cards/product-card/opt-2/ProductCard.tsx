'use client';
import React, { ReactNode } from 'react';

import { BadgeMaker, CardMaker, FavoriteForm, Rate } from '@components';
import { ICardMakerProps } from '../../../../atoms/CardMaker';
import { DTO } from '@tot/core/types';
import { Link } from '@navigation';

interface IProductCardProps extends ICardMakerProps {
  product?: DTO.IProductDTO;
  badge?: string;
  actionButton?: ReactNode;
}
const VProductCard = (props: IProductCardProps) => {
  const { href, className, product, header, badge, actionButton } = props;
  const favButton = (
    <div className={`flex-between  product-fav ${!badge && 'flex-row-reverse'}`} style={{ right: '1rem' }}>
      {badge && <BadgeMaker text={badge} className="diagonal-rounded-8" />}
      <FavoriteForm
        product={product!}
        enableActionNotification
        className="border rounded-circle outline-icon-26 mt-2"
        size="sm"
      />
    </div>
  );
  return (
    <CardMaker
      img={product?.imgSrc ?? '/images/HProductNoImg.png'}
      href={href}
      className={`product-card v-basic-product-card position-relative h-100 border ${className}`}
      header={header ?? favButton}
      body={false}
    >
      <div className="flex-col-start gap-4 p-2 w-100">
        <Link href={`/product/${product?.slug}`} className="w-100">
          <div className="flex-between w-100">
            <p className="fw-bold">{product?.name}</p>
            <div className="flex-between gap-2">
              <Rate value={1} stars={1} />
              <p>4.5</p>
            </div>
          </div>
          <p className="fw-bold text-start mt-2">{product?.description}</p>
        </Link>

        <div className="flex-between mt-2">
          <p className="fw-bold ">{product?.price?.actual?.formattedAmount}</p>
          {actionButton}
        </div>
      </div>
    </CardMaker>
  );
};

export default VProductCard;
