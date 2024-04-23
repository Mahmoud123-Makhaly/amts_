'use client';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { ServiceCard, Filter, ViewOptions, Paginator } from '@components';
import { Link, useRouter, usePathname } from '@navigation';
import { Utils } from '@libs';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

import { data } from '../../../../public/data';
import Empty from './Empty';

const Services = () => {
  const t = useTranslate('COMP_Services');
  const [isMobileFilterOpen, setIsisMobileFilterOpen] = useState<boolean>(false);
  const [listView, setListView] = useState<string>('grid');

  const _query = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const handleSearch = ({
    termFacet,
    sortTerm,
    page,
    pageSize,
    priceFrom,
    priceTo,
    keyword,
  }: {
    termFacet?: DTO.IFacetTermTypeDTO | 'NONE';
    sortTerm?: string;
    page?: number;
    pageSize?: 12 | 50 | 100 | 150;
    priceFrom?: string;
    priceTo?: string;
    keyword?: string;
  }) => {
    const _buildFilter = () => {
      let _filter: string | null = _updatedQuery.filter ? _updatedQuery.filter : '';
      if ((!termFacet && !_filter) || termFacet === 'NONE') _filter = null;
      else if (termFacet && !termFacet.isSelected)
        _filter = _filter
          .split(',')
          .map(item => item.trim())
          .filter(term => term !== termFacet.term)
          .join(',');
      else if (termFacet && termFacet.isSelected) _filter += `,${termFacet.term}`;
      return _filter ? _filter?.replace(/^,\s*/, '') : null;
    };

    let _updatedQuery = {
      filter: _query.get('filter'),
      sort: _query.get('sort'),
      page: Number(_query.get('page')),
      pageSize: Number(_query.get('pageSize')),
      priceFrom: _query.get('priceFrom'),
      priceTo: _query.get('priceTo'),
      keyword: _query.get('keyword'),
    };
    _updatedQuery.filter = _buildFilter();

    _updatedQuery.sort = sortTerm ? sortTerm : _updatedQuery.sort;
    _updatedQuery.page = termFacet ? 1 : page ? page : _updatedQuery.page;
    _updatedQuery.pageSize = pageSize ? pageSize : _updatedQuery.pageSize;
    _updatedQuery.priceFrom = priceFrom ? (priceFrom === '0' ? '' : priceFrom) : _updatedQuery.priceFrom;
    _updatedQuery.priceTo = priceTo ? (priceTo === '0' ? '' : priceTo) : _updatedQuery.priceTo;
    _updatedQuery.keyword = keyword ? keyword : _updatedQuery.keyword;

    const queryStringExpression = Utils.generateQueryString(Utils.cleanEmptyAndZeros(_updatedQuery));
    if (queryStringExpression) router.push(`${path}${queryStringExpression}`);
  };
  const actionButton = (
    <Link className="p-1 px-2 text-primary fw-bold" href={'/'}>
      {t('GET_INSPECTION')}
      <Image src="/images/svgs/arrow.svg" alt="arrow" width={32} height={32} />
    </Link>
  );
  return (
    <React.Fragment>
      {data.length > 0 ? (
        <div>
          <Row>
            <Col lg={3} className="mt-5">
              <Filter
                isMobileFilterOpen={isMobileFilterOpen}
                setIsisMobileFilterOpen={setIsisMobileFilterOpen}
                handleSearch={handleSearch}
              />
            </Col>

            <Col lg={9}>
              <Row className="my-5">
                {data.map((item, index) => (
                  <Col md={6} lg={4} key={index}>
                    <ServiceCard imgSrc={item.imgSrc} title={item.name} />
                  </Col>
                ))}
              </Row>
            </Col>

            <Col className="text-muted text-nowrap">
              <Paginator
                containerClassName="react-paginate"
                breakLabel="..."
                pageRangeDisplayed={3}
                pageCount={10}
                renderOnZeroPageCount={null}
                forcePage={(Number(_query.get('page')) || 1) - 1}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <Empty />
      )}
    </React.Fragment>
  );
};

export default Services;
