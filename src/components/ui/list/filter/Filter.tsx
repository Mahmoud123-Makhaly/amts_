'use client';

import React from 'react';
import { DTO } from '@tot/core/types';

import { MobileFilter, SideBarFilter } from '@components';

const Filter = ({
  facets,
  handleSearch,
  setIsisMobileFilterOpen,
  isMobileFilterOpen,
}: {
  facets?: {
    terms?: DTO.IFacetTermTypeDTO[] | undefined;
    sort?:
      | {
          label: string;
          term: string;
          isSelected: boolean;
        }[]
      | undefined;
    defaultPriceRange?: { from: string; to: string };
  };
  handleSearch: ({
    termFacet,
    sortTerm,
    page,
    pageSize,
    priceFrom,
    priceTo,
  }: {
    termFacet?: DTO.IFacetTermTypeDTO | 'NONE';
    sortTerm?: string;
    page?: number;
    pageSize?: 50 | 100 | 150;
    priceFrom?: string;
    priceTo?: string;
  }) => void;
  setIsisMobileFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isMobileFilterOpen: boolean;
}) => {
  const handleChangeRate = () => {
    window.location.reload();
  };

  return (
    <div>
      <div className="d-none d-lg-block">
        <SideBarFilter
          handleChangeRate={handleChangeRate}
          facets={{ terms: facets?.terms, sort: facets?.sort, defaultPriceRange: facets?.defaultPriceRange }}
          handleSearch={handleSearch}
        />
      </div>

      <div className="d-block d-lg-none">
        <MobileFilter
          handleChangeRate={handleChangeRate}
          isMobileFilterOpen={isMobileFilterOpen}
          setIsisMobileFilterOpen={setIsisMobileFilterOpen}
          facets={{ terms: facets?.terms, sort: facets?.sort, defaultPriceRange: facets?.defaultPriceRange }}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default Filter;
