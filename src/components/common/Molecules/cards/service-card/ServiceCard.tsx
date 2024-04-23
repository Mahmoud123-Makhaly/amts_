'use client';
import React from 'react';
import { CardMaker, FavoriteForm, Rate } from '@components';
import { DTO } from '@tot/core/types';
import { Link } from '@navigation';
import { useTranslate } from '@app/hooks';

interface IServicesCardProps {
  title?: string;
  href?: string;
  imgSrc: string;
  product?: DTO.IProductDTO;
}
const ServiceCard = (props: IServicesCardProps) => {
  const { title, href, imgSrc, product } = props;
  const t = useTranslate('COMP_Services_Card');
  // const favButton = (
  //   <div className="d-flex justify-content-end position-absolute end-0 top-0 pt-3  px-2">
  //     <FavoriteForm
  //       product={product!}
  //       enableActionNotification
  //       className="border rounded-circle outline-icon-30  "
  //       size="lg"
  //     />
  //   </div>
  // );
  return (
    <div>
      <CardMaker img={imgSrc} className="border rounded overflow-hidden position-relative " imagePriority={false}>
        <div className="p-3 ">
          <p className="fw-semibold mb-3">{title}</p>
          <div className="flex-between">
            <Link href={href || ''} className="btn btn-primary">
              {t('VIEW_DETAILS')}
            </Link>
            <p className="d-flex gap-1">
              <Rate value={1} stars={1} />
              <p>4.2</p>
            </p>
          </div>
        </div>
      </CardMaker>
    </div>
  );
};

export default ServiceCard;
