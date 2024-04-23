'use client';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';

import {
  BackButton,
  CartForm,
  EmptyWishlist,
  HProductCard,
  SubmitButton,
  VProductCard,
  ViewOptions,
} from '@components';
import { useTranslate, useAppStore, useToast } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Link, useRouter, usePathname } from '@navigation';
import { useSearchParams } from 'next/navigation';
import { Utils } from '@libs';
import { Actions } from '@libs/actions';

const Wishlist = ({ data }: { data: DTO.IWishlistTypeDTO }) => {
  const [listView, setListView] = useState<string>('grid');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _query = useSearchParams();
  const path = usePathname();

  const t = useTranslate('COMP_Wishlist');
  const router = useRouter();
  const toast = useToast();
  const { changePreloader } = useAppStore(state => ({ changePreloader: state.layout.changePreloader }));

  const { cart, reloadCart, changeDefaultCart } = useAppStore(state => ({
    cart: state.cart.default,
    reloadCart: state.cart.reload,
    changeDefaultCart: state.cart.changeDefaultCart,
  }));

  const moveWishlistToCart = async () => {
    setIsLoading(true);
    if (!cart) reloadCart && reloadCart();
    else {
      const {
        data: mergeResponse,
        serverError,
        validationErrors,
      } = await Actions.cart.mergeCart({
        cartId: cart.id!,
        secondCartId: data.id!,
      });
      if (mergeResponse?.data) {
        changeDefaultCart && changeDefaultCart(mergeResponse?.data);
        router.push('/cart');
      } else {
        toast.error(t('ERR_MOVE_TO_CART_MSG'));
      }
    }
  };
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

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end gap-4 my-3">
        <div className="d-flex align-items-center gap-2">
          <div>
            <ViewOptions
              view={listView}
              setView={setListView}
              grid
              list
              activeGridImg="/images/svgs/list/list-active.svg"
              gridImg="/images/svgs/list/grid.svg"
              listActiveImg="/images/svgs/list/grip-active.svg"
              listImg="/images/svgs/list/list.svg"
              className="gap-2"
              buttonClass="border-0"
            />
          </div>
        </div>
      </div>
      {data.items?.length ? (
        <React.Fragment>
          <Row>
            <Col className="row-gap-4 mb-3">
              <SubmitButton
                isLoading={isLoading}
                text={t('MOVE_TO_CART_BTN_LBL')}
                design="btn-success rounded-5 px-5"
                onClick={moveWishlistToCart}
              />
            </Col>
          </Row>
          <Row className="row-gap-4 mb-3 h-100">
            {data.items?.map(item =>
              listView === 'grid' ? (
                <Col lg={4} key={item.id}>
                  <VProductCard
                    product={item?.product}
                    badge="Best Seller"
                    actionButton={<CartForm product={item?.product!} enableCounter={false} btnClassName="px-2" />}
                  />
                </Col>
              ) : (
                <Col key={item.id} className="col-12">
                  <HProductCard
                    product={item?.product}
                    badge="Best Seller"
                    actionButton={<CartForm product={item.product!} enableCounter={false} btnClassName="px-2" />}
                  />
                </Col>
              ),
            )}
          </Row>
        </React.Fragment>
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
};

export default Wishlist;
