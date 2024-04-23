'use client';

import React from 'react';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

interface MobileCategoryFilterProps {
  terms?: DTO.IFacetTermTypeDTO[] | undefined;
  setFacet: (
    value: React.SetStateAction<
      | {
          type: 'sort' | 'filter';
          value: DTO.IFacetTermTypeDTO | 'NONE' | string;
        }
      | undefined
    >,
  ) => void;
}

export const MobileCategoryFilter = ({ terms, setFacet }: MobileCategoryFilterProps) => {
  const t = useTranslate('COMP_MobileFilter');
  return (
    <div className="w-100 filter-items d-flex flex-col px-3 pb-2">
      <div className="text-muted d-flex justify-content-between align-items-center mb-3 w-100">
        <span className="fw-bold">{t('SERVICES')} </span>
      </div>
      <div className="w-100  d-flex px-0">
        {terms?.map((item, indx) => (
          <button
            key={`filter-term-${indx}`}
            id={item.term}
            className={`btn ${item.isSelected ? 'btn-primary text-white' : 'btn-outline-primary'} mx-1 filter-item`}
            onClick={(e: any) => {
              setFacet({ type: 'filter', value: { ...item, isSelected: e.target.id } });
            }}
          >
            {item?.label}
          </button>
        ))}
      </div>
    </div>
  );
};
