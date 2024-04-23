'use client';

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useSearchParams } from 'next/navigation';

import {
  ButtonMaker,
  CartForm,
  Paginator,
  VProductCard,
  ImageMaker,
  CarouselMaker,
  CardMaker,
  ServiceCard,
} from '@components';
import { usePathname, useRouter } from '@navigation';
import { useAppStore } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Utils } from '@libs';

import { Filter } from './filter';
import Empty from './Empty';

const CategoriesList = ({ products }: { products: DTO.IProductConnectionDTO | undefined }) => {
  const [isMobileFilterOpen, setIsisMobileFilterOpen] = useState<boolean>(false);
  const path = usePathname();
  const router = useRouter();
  const _query = useSearchParams();
  const { changePreloader } = useAppStore(state => ({ changePreloader: state.layout.changePreloader }));

  //Transfer term facet object to string
  //to make component to get the new search query and redirect page using the new values
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
  const getOutlineNamedFacets = products?.termFacets?.find(x => x.name === '__outline_named');

  useEffect(() => {
    if (products?.items && changePreloader) changePreloader('disable');
  }, [changePreloader, products?.items]);

  const enablePreLoader = () => {
    if (changePreloader) changePreloader('enable');
  };

  const cards = getOutlineNamedFacets?.terms?.map((cat, index) => (
    <CardMaker key={index} img="/images/list/cat.jpg" className="border p-2">
      <h6 className="text-center pt-3">{cat.label}</h6>
    </CardMaker>
  ));

  return (
    <Container>
      {cards && cards.length > 0 && (
        <div>
          {cards.length > 3 ? (
            <CarouselMaker
              items={cards}
              numVisible={3}
              spaceBetween={20}
              breakpoints={{ 320: { slidesPerView: 1.5 }, 768: { slidesPerView: 2 }, 991: { slidesPerView: 3 } }}
            />
          ) : (
            <Row>
              {cards.map((card, index) => (
                <Col md={3} key={index}>
                  {card}
                </Col>
              ))}
            </Row>
          )}
        </div>
      )}
      <Row>
        <Col lg={3} className="mt-2">
          <Filter
            isMobileFilterOpen={isMobileFilterOpen}
            setIsisMobileFilterOpen={setIsisMobileFilterOpen}
            facets={{
              terms: getOutlineNamedFacets?.terms,
              sort: products?.sort,
              defaultPriceRange: { from: _query.get('priceFrom') || '0', to: _query.get('priceTo') || '0' },
            }}
            handleSearch={handleSearch}
          />
        </Col>

        <Col lg={9} className="d-flex flex-col mb-4 px-0 ">
          <div className="w-100 pe-2 mb-2">
            <ButtonMaker
              design="bg-white border-border p-1 d-lg-none text-end w-100 d-flex justify-content-end"
              onClick={() => setIsisMobileFilterOpen(true)}
            >
              <ImageMaker src={'/images/svgs/list/mobile-filter.svg'} />
            </ButtonMaker>
          </div>

          {products?.items && products?.items.length > 0 ? (
            <React.Fragment>
              <Row className="w-100 row-gap-4 mb-3">
                {products?.items?.map((item, index) => (
                  <React.Fragment key={index}>
                    <Col md={6} lg={6} className="h-100">
                      <ServiceCard
                        title={item.name}
                        href={`/product/${item.slug}`}
                        imgSrc={item.imgSrc ?? '/images/list/cat.jpg'}
                        product={item}
                      />
                    </Col>
                    <Col md={6} lg={6} className="h-100">
                      <ServiceCard
                        title={item.name}
                        href={`/product/${item.slug}`}
                        imgSrc={item.imgSrc ?? '/images/list/cat.jpg'}
                        product={item}
                      />
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
              {products?.items && products?.items.length > 0 && (
                <Col className="text-muted text-nowrap">
                  <Paginator
                    containerClassName="react-paginate"
                    breakLabel="..."
                    onPageChange={i => {
                      enablePreLoader();
                      handleSearch({ page: i.selected + 1 });
                    }}
                    pageRangeDisplayed={3}
                    pageCount={Math.ceil(
                      (products?.totalCount ? products?.totalCount : 1) / (Number(_query.get('pageSize')) || 12),
                    )}
                    renderOnZeroPageCount={null}
                    forcePage={(Number(_query.get('page')) || 1) - 1}
                  />
                </Col>
              )}
            </React.Fragment>
          ) : (
            <Empty />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CategoriesList;
