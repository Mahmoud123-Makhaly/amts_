'use client';
import React from 'react';

import { Link } from '@navigation';
import { DTO } from '@tot/core/types';
import { ImageMaker } from '@components';

const MiniCartItem = ({ item }: { item: DTO.ILineItemTypeDTO }) => {
  return (
    <Link
      href={`/product/${item.product?.slug}`}
      className="flex-between align-items-start gap-2 py-2 border-bottom w-100 border-light-gray"
    >
      <div className="d-flex gap-3">
        <ImageMaker src={item.imageUrl ?? '/images/HProductNoImg.png'} alt="" className="rounded w-25 border" />
        <div className="flex-col-start">
          <h6 className="text-black">{`${item.product?.name && (item.product?.name.length > 15 ? `${item.product?.name.slice(0, 15)}...` : item.product?.name)}`}</h6>
          <p className="text-start">{item.extendedPrice?.formattedAmount}</p>
        </div>
      </div>
      <p className="text-black">{`x${item.quantity?.toLocaleString()}`}</p>
    </Link>
  );
};

export default MiniCartItem;
