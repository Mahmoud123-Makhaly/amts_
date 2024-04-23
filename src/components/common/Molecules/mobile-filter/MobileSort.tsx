'use client';

import React from 'react';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

interface MobileSortProps {
  sort?:
    | {
        label: string;
        term: string;
        isSelected: boolean;
      }[]
    | undefined;
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

export const MobileSort = ({ sort, setFacet }: MobileSortProps) => {
  const t = useTranslate('COMP_MobileFilter');
  return (
    <React.Fragment>
      <h6 className="fw-bold">{t('SORT')}</h6>
      <div className="w-100 filter-items d-flex">
        {sort?.map((item, indx) => (
          <button
            key={`sort-term-${indx}`}
            id={item.term}
            className={`btn ${item.isSelected ? 'btn-primary text-white' : 'btn-outline-secondary'} mx-1 filter-item`}
            onClick={(e: any) => {
              setFacet({ type: 'sort', value: e.target.id });
            }}
          >
            {t(item.label)}
          </button>
        ))}
      </div>
    </React.Fragment>
  );
};
