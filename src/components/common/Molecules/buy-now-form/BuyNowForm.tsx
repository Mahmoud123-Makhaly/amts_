'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikErrors, FormikHelpers } from 'formik';

import { Actions } from '@libs/actions';
import { DTO } from '@tot/core/types';
import { AppForm, Counter, FormFieldType, FormikValues } from '@components';
import { usePathname, useRouter } from '@navigation';
import { useAppStore, useTranslate, useToast } from '@app/hooks';
import BuyNowButton from '../BuyNowButton';

interface IBuyNowFormProps {
  product: DTO.IProductDTO;
  lineItemId?: string;
  btnClassName?: string;
  formClassName?: string;
  mode?: 'change' | 'add';
}

const BuyNowForm = (props: IBuyNowFormProps) => {
  const { product, formClassName, btnClassName, lineItemId, mode = 'add' } = props;
  const pathName = usePathname();
  const toast = useToast();
  const router = useRouter();
  const t = useTranslate('COMP_BuyNowForm');
  const { changeDefaultCart, reloadCart, isLoaded, cart } = useAppStore(state => ({
    changeDefaultCart: state.cart.changeDefaultCart,
    cart: state.cart.default,
    isLoaded: state.cart.isLoaded,
    reloadCart: state.cart.reload,
  }));
  const [formOptions, setFormOptions] = useState<
    { fields: Array<FormFieldType>; initialValues: Record<string, any> } | undefined
  >();

  const addToCartSchema = Yup.object().shape({
    productId: Yup.string().default(product.id),
    cartId: Yup.string().default(cart?.id),
  });

  const CounterActionComponent = ({
    setFieldValue,
    children,
    isSubmitting,
    errors,
    values,
  }: {
    children: React.ReactNode;
    isSubmitting: boolean;
    errors: FormikErrors<FormikValues>;
    values: FormikValues;
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined,
    ) => Promise<void | FormikErrors<FormikValues>>;
  }) => {
    return (
      <React.Fragment>
        <BuyNowButton
          isLoading={isSubmitting}
          disabled={!product.isInInventory}
          design={`p-0 ${btnClassName ?? ''}`}
          block
        />
      </React.Fragment>
    );
  };

  //Double check if the cart does not exist at the cart store reload the cart
  useEffect(() => {
    if (isLoaded && !cart) reloadCart && reloadCart();
  }, [cart, isLoaded, reloadCart]);

  useEffect(() => {
    if (pathName && cart && cart?.id) {
      const formFields: Array<FormFieldType> = [
        {
          name: 'productId',
          type: 'hidden',
          value: product.id,
        },
        {
          name: 'cartId',
          type: 'hidden',
          value: cart.id,
        },
      ];

      const defaultValues = {
        productId: product.id,
        cartId: cart.id,
        counter: 1,
      };

      setFormOptions({ fields: formFields, initialValues: defaultValues });
    }
  }, [cart, pathName, product]);

  const handleSubmission = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    if (cart?.id && product.inventoryAvailableQuantity > 0) {
      const {
        data: response,
        serverError,
        validationErrors,
      } = mode === 'change' && lineItemId
        ? await Actions.cart.changeProductQuantityInCart({
            lineItemId: lineItemId,
            cartId: cart.id,
            quantity: 1,
          })
        : await Actions.cart.addProductToCart({
            productId: product.id,
            cartId: cart.id,
            quantity: 1,
          });

      if (response?.data) {
        changeDefaultCart && changeDefaultCart(response.data);
        router.push('/checkout');
      } else {
        toast.error(t('GENERIC_ERR_MSG'));
      }
    } else if (!cart?.id) toast.warn(t('BUY_NOW_NOT_EXIST_MSG'));
    formikHelpers.setSubmitting(false);
  };

  return cart && formOptions && formOptions.fields ? (
    <AppForm
      formClassName={`w-100 ${formClassName ?? ''}`}
      fields={formOptions.fields}
      initialValues={formOptions.initialValues}
      onSubmit={handleSubmission}
      validationSchema={addToCartSchema}
      ActionComponent={CounterActionComponent}
    />
  ) : (
    <React.Fragment></React.Fragment>
  );
};

export default BuyNowForm;
