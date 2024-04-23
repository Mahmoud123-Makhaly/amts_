'use client';

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';

import {
  ButtonMaker,
  BuyNowForm,
  CarouselMaker,
  CartForm,
  Counter,
  FavoriteForm,
  ImageMaker,
  ProductProperty,
  Share,
  Variation,
} from '@components';
import { Link, usePathname, useRouter } from '@navigation';
import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';

const Details = ({ product }: { product: DTO.IProductDTO }) => {
  const t = useTranslate('COMP_ProductDetails');
  const router = useRouter();
  const pathname = usePathname();
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    const fullPath =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '') +
      pathname;
    setPath(fullPath);
  }, [pathname]);

  const productImgs = [
    product.imgSrc ?? '/images/HProductNoImg.png',
    ...(product.images?.length ? product.images.map(img => img.url) : []),
  ];

  const handleVariantSelection = (variant: DTO.IVariationTypeDTO) => {
    router.push(`/product/${variant.slug}`);
  };

  return (
    <div className="my-4 product-details">
      <Row className="mb-3 ps-3">
        <Col>
          {product.name && <h4 className="mt-md-3 text-center text-md-start fw-bold">{product.name}</h4>}
          <div className="d-flex align-items-center gap-1">
            {product.code && (
              <React.Fragment>
                <div className="d-flex align-items-center gap-1">
                  <strong>{t('PRODUCT_CODE')} :</strong>
                  <p>{product.code}</p>
                </div>
                |
              </React.Fragment>
            )}
            <div className="d-flex align-items-center gap-1">
              <strong>{t('AVAILABILITY')} :</strong>
              <p>{product.availabilityData?.isInStock ? t('IN_STOCK') : t('OUT_OF_STOCK')}</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={5}>
          <CarouselMaker
            outNav={false}
            numVisible={1}
            items={productImgs}
            showThumbs
            navigation={false}
            pagination={false}
            className="product-details-slider"
          />
        </Col>
        <Col md={7}>
          <div className="flex-col-start gap-3">
            {product.description && <p className="py-3">{product.description}</p>}
            <h3 className="fw-bold text-center text-md-start w-100">{product.price?.actual?.formattedAmount}</h3>
            {(product?.hasVariations || product?.masterVariation) && (
              <div className="d-flex gap-3 align-items-center py-3 w-100">
                {product?.hasVariations && product.variations?.length && (
                  <Variation variations={product.variations} onSelect={handleVariantSelection} type="dropdown" />
                )}
                {!product?.hasVariations && product?.masterVariation && (
                  <Variation
                    master={product.masterVariation}
                    selectedVariantsSlugs={[product.slug ?? '']}
                    onSelect={handleVariantSelection}
                    type="dropdown"
                  />
                )}
              </div>
            )}
            <div className="d-flex gap-3 align-items-center w-100">
              <CartForm
                product={product}
                formClassName="d-flex gap-3 align-items-center"
                btnClassName="bg-transparent text-primary border fw-semibold"
                counterClassName="text-primary"
                enableCounter={true}
              />
              <div className="border rounded p-1">
                <FavoriteForm
                  product={product}
                  enableActionNotification
                  className="border rounded-circle outline-icon-35 border-primary"
                />
              </div>
            </div>
            {product.inventoryAvailableQuantity > 0 && <BuyNowForm product={product} />}
            <div>
              <h6 className="fw-bold mb-0">{t('SHARE')}</h6>
              <div className="d-flex gap-3 align-items-center py-3">
                <Share shareTo="facebook" url={path}>
                  <ImageMaker src={'/images/svgs/product-details/facebook.svg'} alt="facebook" />
                </Share>
                <Share shareTo="whatsapp" url={path}>
                  <ImageMaker src={'/images//svgs/product-details/whatsapp.svg'} alt="whatsapp" />
                </Share>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
