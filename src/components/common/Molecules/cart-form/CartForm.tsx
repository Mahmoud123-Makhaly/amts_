'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { FormikErrors, FormikHelpers } from 'formik';

import { Actions } from '@libs/actions';
import { DTO } from '@tot/core/types';
import { AppForm, Counter, FormFieldType, FormikValues } from '@components';
import { usePathname } from '@navigation';
import { useAppStore, useTranslate, useToast } from '@app/hooks';

import AddToCart from '../AddToCart';

interface ICartFormProps {
  product: DTO.IProductDTO;
  enableCounter: boolean;
  lineItemId?: string;
  btnClassName?: string;
  counterClassName?: string;
  formClassName?: string;
  mode?: 'change' | 'add';
}

const CartForm = (props: ICartFormProps) => {
  const { product, enableCounter, formClassName, btnClassName, counterClassName, lineItemId, mode = 'add' } = props;
  const pathName = usePathname();
  const toast = useToast();
  const t = useTranslate('COMP_CartForm');
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
    counter: Yup.number().required().min(1).default(1),
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
        {enableCounter && product.isInInventory && (
          <Counter
            defaultValue={1}
            min={1}
            max={product.inventoryAvailableQuantity}
            design={`${counterClassName ?? ''} ${(errors.counter || values.counter > product.inventoryAvailableQuantity) && 'border-danger'}`}
            onChange={val => {
              setFieldValue('counter', val);
            }}
          />
        )}
        <AddToCart
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
      if (!enableCounter) {
        formFields.push({
          name: 'counter',
          type: 'hidden',
          value: 1,
        });
      }
      setFormOptions({ fields: formFields, initialValues: defaultValues });
    }
  }, [cart, enableCounter, pathName, product]);

  const handleSubmission = async (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => {
    if (cart?.id && values.counter <= product.inventoryAvailableQuantity) {
      const {
        data: response,
        serverError,
        validationErrors,
      } = mode === 'change' && lineItemId
        ? await Actions.cart.changeProductQuantityInCart({
            lineItemId: lineItemId,
            cartId: cart.id,
            quantity: values.counter,
          })
        : await Actions.cart.addProductToCart({
            productId: product.id,
            cartId: cart.id,
            quantity: values.counter,
          });

      if (response?.data) {
        changeDefaultCart && changeDefaultCart(response.data);
        toast.success(t('ADD_TO_CART_SUCCESS_MSG', { name: product.name }));
      } else {
        toast.error(t('GENERIC_ERR_MSG'));
      }
    } else if (!cart?.id) toast.warn(t('ADD_TO_CART_CART_NOT_EXIST_MSG'));
    else if (values.counter > product.inventoryAvailableQuantity) toast.warn(t('ADD_TO_CART_EXCEED_QUANTITY_MSG'));
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

export default CartForm;
