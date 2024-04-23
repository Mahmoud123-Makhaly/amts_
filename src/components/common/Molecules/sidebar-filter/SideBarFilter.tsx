'use client';

import React, { useEffect, useState } from 'react';

import { DTO } from '@tot/core/types';
import { Rate, RatingFilterItem } from '@components';
import { useTranslate, useAppStore } from '@app/hooks';
import { Link } from '@navigation';

import SidebarFilterItem from './SidebarFilterItem';

const SidebarFilter = ({
  facets,
  handleSearch,
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
  handleChangeRate: () => void;
}) => {
  const { changePreloader } = useAppStore(state => ({ changePreloader: state.layout.changePreloader }));
  const [facet, setFacet] = useState<
    { type: 'sort' | 'filter'; value: DTO.IFacetTermTypeDTO | 'NONE' | string } | undefined
  >();

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
  const t = useTranslate('COMP_SidebarFilter');

  return (
    <aside className="sidebar-filter d-none d-md-block mb-3 border rounded p-2" id="sidebar-filter">
      <div className="flex-between border-bottom pb-2">
        <p className="text-black fw-bold">{t('FILTER_BY')}</p>
        <Link href={'/list'} style={{ color: '#2E96FF' }}>
          {t('REMOVE_ALL')}
        </Link>
      </div>

      {facets.terms && facets.terms.some(x => x.isSelected === true) && (
        <div className="flex-col-start gap-2 px-1 pt-2 rounded border-bottom pb-1">
          <div className="bg-white p-2 rounded w-100 d-flex align-items-center overflow-auto">
            {facets.terms
              ?.filter(x => x.isSelected)
              ?.map((term, indx) => (
                <div
                  className="flex-between bg-gray rounded px-1 w-fit text-nowrap"
                  key={`filter-outline-named-term-${indx}`}
                >
                  <p className="text-black font-15 p-1 rounded">{term.label}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      <ul className="flex-col-start gap-2 px-1 rounded my-2">
        <p className="text-black fw-bold">{t('SERVICES')}</p>
        {facets.terms?.map((term, indx) => (
          <SidebarFilterItem
            key={`filter-term-${indx}`}
            label={term.label}
            id={term.term}
            name="product-filter-terms"
            type="checkbox"
            disabled={facet ? true : false}
            onChange={e => {
              setFacet({ type: 'filter', value: { ...term, isSelected: e.target.checked } });
            }}
            defaultChecked={term.isSelected}
          />
        ))}
      </ul>
      <ul className="flex-col-start gap-2 border-top px-1 pt-2 rounded my-2">
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
      </ul>
    </aside>
  );
};

export default SidebarFilter;
