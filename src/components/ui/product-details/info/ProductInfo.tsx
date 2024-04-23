'use client';
import React from 'react';

import { useTranslate } from '@app/hooks';
import { DTO } from '@tot/core/types';
import { Tabs } from '@components';

const ProductInfo = ({ data }: { data: DTO.IProductDTO }) => {
  const t = useTranslate('COMP_ProductDetails.Info');

  const overviewTab = {
    header: <p>{t('PRODUCT_NOTES')}</p>,
    content: (
      <div className="flex-col-start border rounded p-3">
        <ul className="flex-col-start gap-2 list-disc">need to be discus</ul>
      </div>
    ),
  };

  const ingredients = data?.properties?.filter(x => x.value);

  const ingredientsTab = ingredients?.length
    ? {
        header: <p>{t('PRODUCT_SPECS')}</p>,
        content: (
          <div className="flex-col-start border rounded p-3">
            <ul className="flex-col-start gap-2 list-disc">
              {ingredients.map((item, index) => (
                <li key={index}>{item.value}</li>
              ))}
            </ul>
          </div>
        ),
      }
    : {};

  const tabs =
    Object.keys(overviewTab).length > 0 || Object.keys(ingredientsTab).length > 0
      ? [overviewTab, ingredientsTab]
      : undefined;

  return (
    <React.Fragment>
      {tabs && (
        <div className="mb-3">
          <Tabs tabs={tabs} className="frameless" align="start" />
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductInfo;
