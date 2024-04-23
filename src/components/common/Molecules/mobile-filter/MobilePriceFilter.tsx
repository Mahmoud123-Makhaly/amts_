'use client';

import React from 'react';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { PriceRange } from '@components';

interface MobilePriceFilterProps {
  defaultRange?:
    | {
        from: string;
        to: string;
      }
    | undefined;
  handleSearch: ({
    termFacet,
    sortTerm,
    page,
    pageSize,
    priceFrom,
    priceTo,
  }: {
    termFacet?: DTO.IFacetTermTypeDTO | 'NONE' | undefined;
    sortTerm?: string | undefined;
    page?: number | undefined;
    pageSize?: 50 | 100 | 150 | undefined;
    priceFrom?: string | undefined;
    priceTo?: string | undefined;
  }) => void;
}

export const MobilePriceFilter = ({ defaultRange, handleSearch }: MobilePriceFilterProps) => {
  const t = useTranslate('COMP_MobileFilter');
  return (
    <div className="px-3">
      <div className="text-muted d-flex justify-content-between align-items-center mb-3 w-100">
        <span className="fw-bold">{t('PRICE')} </span>
      </div>
      <PriceRange
        onChange={(from: string, to: string) => handleSearch({ priceFrom: from, priceTo: to })}
        defaultRange={defaultRange}
      />
    </div>
  );
};
