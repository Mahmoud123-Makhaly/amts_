'use client';

import React, { useEffect, useState } from 'react';

import { DTO } from '@tot/core/types';
import { useAppStore, useTranslate } from '@app/hooks';
import { Actions } from '@libs/actions';

import { CheckInput, DropDown, SpinnerGroup } from '@components';

type VariationsProps = {
  master?: DTO.IVariationTypeDTO | undefined;
  variations?: Array<DTO.IVariationTypeDTO> | undefined;
  selectedVariantsSlugs?: Array<string>;
  onSelect?(variant: DTO.IVariationTypeDTO): void;
  type?: 'dropdown' | 'checkbox';
};

type VariationProps = VariationsProps & ({ master?: never } | { variations?: never });
const Variation = ({ selectedVariantsSlugs, onSelect, master, variations, type = 'checkbox' }: VariationProps) => {
  const t = useTranslate('COMP_Variation');

  const [variationsList, setVariationsList] = useState<Array<DTO.IVariationTypeDTO> | undefined>(
    variations ? variations : undefined,
  );
  const { changePreloader } = useAppStore(state => ({ changePreloader: state.layout.changePreloader }));
  const selectedVariant = variationsList?.find(x => x.slug === selectedVariantsSlugs?.at(0));
  useEffect(() => {
    if (master?.id) {
      const loadMasterProductData = async () => {
        const {
          data: _masterProduct,
          validationErrors,
          serverError,
        } = await Actions.products.getProductById({ id: master.id! });
        if (_masterProduct?.data && _masterProduct.data.variations && _masterProduct.data.variations.length)
          setVariationsList([..._masterProduct.data.variations, master]);
        else setVariationsList([]);
      };
      loadMasterProductData();
    }
  }, [master]);

  return (
    <React.Fragment>
      {variationsList === undefined ? (
        <SpinnerGroup />
      ) : (
        <React.Fragment>
          {type === 'checkbox' &&
            variationsList.map((variant, indx) => (
              <CheckInput
                type="checkbox"
                key={`variant-${indx}`}
                name={variant.slug ?? `variant-${indx}`}
                className="variant-tag pointer text-primary border rounded py-2"
                defaultChecked={selectedVariantsSlugs?.some(s => s === variant.slug)}
                disabled={selectedVariantsSlugs?.some(s => s === variant.slug)}
                onClick={() => {
                  if (onSelect) {
                    changePreloader && changePreloader('enable');
                    onSelect(variant);
                  }
                }}
              >
                <p className=" px-2">{variant.name}</p>
              </CheckInput>
            ))}
          {type === 'dropdown' && (
            <DropDown
              className="w-100  "
              headerClassName="w-100 text-black py-3 border border-light-gray flex-between "
              title={selectedVariant ? selectedVariant.name : t('CHOOSE_SIZE')}
              menuItems={variationsList?.map((variant, indx) => ({
                text: variant.name ?? '',
                href: `/product/${variant.slug}`,
                className: `text-center border-bottom py-1 px-3 w-100 d-block ${selectedVariantsSlugs?.some(s => s === variant.slug) ? 'bg-primary text-white rounded ' : 'text-black pointer'}`,
              }))}
            ></DropDown>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Variation;
