'use client';

import React, { useEffect, useState } from 'react';

import { DTO } from '@tot/core/types';
import { useTranslate, useAppStore } from '@app/hooks';
import { ButtonMaker, OffcanvasMaker, Rate, RatingFilterItem } from '@components';
import { useRouter } from '@navigation';
import { MobileCategoryFilter } from './MobileCategoryFilter';
import { MobilePriceFilter } from './MobilePriceFilter';

const MobileFilter = ({
  facets,
  handleSearch,
  isMobileFilterOpen,
  setIsisMobileFilterOpen,
  handleChangeRate,
}: {
  facets: {
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
  handleChangeRate: () => void;
}) => {
  const { changePreloader } = useAppStore(state => ({ changePreloader: state.layout.changePreloader }));
  const t = useTranslate('COMP_MobileFilter');

  const [facet, setFacet] = useState<
    { type: 'sort' | 'filter'; value: DTO.IFacetTermTypeDTO | 'NONE' | string } | undefined
  >();
  const router = useRouter();

  useEffect(() => {
    if (facet)
      switch (facet.type) {
        case 'filter':
          if (changePreloader) changePreloader('enable');
          handleSearch({ termFacet: facet.value as DTO.IFacetTermTypeDTO | 'NONE', page: 1 });
          break;
        case 'sort':
          if (changePreloader) changePreloader('enable');
          handleSearch({ sortTerm: facet.value as string });
          break;
      }
  }, [changePreloader, facet, handleSearch]);

  return (
    <OffcanvasMaker
      className="rounded"
      isOpen={isMobileFilterOpen}
      offcavasToggler={() => setIsisMobileFilterOpen(false)}
      canvasBody={
        <div>
          {facets.terms && facets.terms.length && <MobileCategoryFilter terms={facets.terms} setFacet={setFacet} />}
          <div className="flex-col-start gap-2 border-top px-3 pt-2 rounded mb-3">
            <div className="flex-between w-100">
              <p className="text-black fw-bold">{t('REVIEW')}</p>
            </div>
            <RatingFilterItem
              onChange={handleChangeRate}
              id="5"
              type="checkbox"
              label={<Rate id="5" value={5} readOnly />}
            />
            <RatingFilterItem
              onChange={handleChangeRate}
              id="4"
              type="checkbox"
              label={<Rate id="4" value={4} readOnly />}
            />
            <RatingFilterItem
              onChange={handleChangeRate}
              id="3"
              type="checkbox"
              label={<Rate id="3" value={3} readOnly />}
            />
            <RatingFilterItem
              onChange={handleChangeRate}
              id="2"
              type="checkbox"
              label={<Rate id="2" value={2} readOnly />}
            />
            <RatingFilterItem
              onChange={handleChangeRate}
              id="1"
              type="checkbox"
              label={<Rate id="1" value={1} readOnly />}
            />
          </div>
        </div>
      }
      direction="end"
      header={
        <React.Fragment>
          {facets.terms && facets.terms.length && (
            <ButtonMaker
              className="btn btn-white border"
              onClick={() => {
                router.push('/list');
              }}
            >
              {t('REMOVE_ALL')}
            </ButtonMaker>
          )}
        </React.Fragment>
      }
    />
  );
};

export default MobileFilter;
