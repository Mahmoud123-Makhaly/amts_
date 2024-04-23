'use client';

import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useSession } from 'next-auth/react';

import { Actions } from '@libs/actions';
import { Contracts, DTO } from '@tot/core/types';
import { useAppStore, useTranslate, useToast } from '@app/hooks';
import { useRouter, usePathname } from '@navigation';
import { Favorite } from '@components';

import { AppForm, FormFieldType, FormikValues } from '../index';

export interface IFavoriteFormProps {
  product: DTO.IProductDTO;
  postSubmission?: (result: Contracts.Result<DTO.IProductDTO>) => void;
  enableActionNotification?: boolean;
  className?: string;
  size?: 'sm' | 'lg' | 'xl' | '2xl';
}

const FavoriteForm = ({
  product: data,
  enableActionNotification = false,
  postSubmission,
  className,
  size,
}: IFavoriteFormProps) => {
  const [product, setProduct] = useState<DTO.IProductDTO>(data);
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const toast = useToast();
  const t = useTranslate('COMP_FavoriteForm');
  const { setDefaultWishlistId, defaultWishlistId } = useAppStore(state => ({
    setDefaultWishlistId: state.appAccount.setDefaultWishlistId,
    defaultWishlistId: state.appAccount.defaultWishlistId,
  }));

  const wishlistFormFields: Array<FormFieldType> = [{ name: 'productId', label: '', type: 'hidden' }];
  const wishlistFormInitialValues = { productId: product.id };
  const wishlistFormValidationSchema = Yup.object().shape({
    productId: Yup.string().default(product.id),
  });

  const handleFavoriteActionNotification = (result: Contracts.Result<DTO.IProductDTO>) => {
    if (result.data && !product!.inWishlist) {
      toast.success(t('ADD_TO_FAVORITE_MESSAGE'));
    } else if (result.data && product!.inWishlist) {
      toast.success(t('REMOVE_FROM_FAVORITE_MESSAGE'));
    } else product!.inWishlist ? toast.error(t('REMOVE_FROM_FAVORITE_ERROR')) : toast.error(t('ADD_TO_FAVORITE_ERROR'));
  };

  const ActionComponent = ({ isSubmitting }: any) => {
    return (
      <Favorite
        isLoading={isSubmitting}
        isFilled={product.inWishlist}
        className={`bg-white ${className}`}
        size={size}
        enableActionNotification
      />
    );
  };

  useEffect(() => {
    if (!defaultWishlistId && session?.isAuthorized) {
      Actions.account.requestDefaultWishlist().then(({ data: result }) => {
        if (result && result.data) setDefaultWishlistId && setDefaultWishlistId(result.data);
      });
    }
  }, [defaultWishlistId, session?.isAuthorized, setDefaultWishlistId]);

  const onSubmit = async (values: FormikValues) => {
    if (!session?.isAuthorized) return router.push(`/auth/login?redirectURL=${pathName}`);

    let _wishlistId = defaultWishlistId;
    let _postSubmissionResult: Contracts.Result<DTO.IProductDTO> = {
      error: {
        code: 'FavoriteForm',
        message: 'Failed to add product to user wishlist.',
      },
    } as Contracts.Result<DTO.IProductDTO>;
    //double check if store has the default user wishlist id
    if (!_wishlistId) {
      const { data: result, validationErrors, serverError } = await Actions.account.requestDefaultWishlist();
      if (result && result.data) {
        _wishlistId = result.data;
        setDefaultWishlistId(_wishlistId);
      } else {
        _postSubmissionResult = {
          error: {
            code: 'FavoriteForm',
            message: 'Failed to fetch user wishlists for getting default one.',
            exception: { validationErrors, serverError },
          },
        } as Contracts.Result<DTO.IProductDTO>;
      }
    }
    if (_wishlistId) {
      if (product.inWishlist) {
        const {
          data: result,
          validationErrors,
          serverError,
        } = await Actions.account.removeProductFromWishlist({ listId: _wishlistId, productId: values.productId });
        if (result && result.data) {
          _postSubmissionResult = { data: product } as Contracts.Result<DTO.IProductDTO>;
          setProduct(prev => ({ ...prev, inWishlist: false }));
        } else {
          _postSubmissionResult = {
            error: {
              code: 'FavoriteForm',
              message: 'Failed to remove product from user wishlist.',
              exception: { validationErrors, serverError },
            },
          } as Contracts.Result<DTO.IProductDTO>;
        }
      } else {
        const {
          data: result,
          validationErrors,
          serverError,
        } = await Actions.account.addWishlistItem({ listId: _wishlistId, productId: values.productId });
        if (result && result.data) {
          _postSubmissionResult = { data: product } as Contracts.Result<DTO.IProductDTO>;
          setProduct(prev => ({ ...prev, inWishlist: true }));
        } else {
          _postSubmissionResult = {
            error: {
              code: 'FavoriteForm',
              message: 'Failed to add product to user wishlist.',
              exception: { validationErrors, serverError },
            },
          } as Contracts.Result<DTO.IProductDTO>;
        }
      }
    }
    enableActionNotification && handleFavoriteActionNotification(_postSubmissionResult);
    postSubmission && postSubmission(_postSubmissionResult);
    return true;
  };

  return (
    <AppForm
      fields={wishlistFormFields}
      initialValues={wishlistFormInitialValues}
      validationSchema={wishlistFormValidationSchema}
      onSubmit={onSubmit}
      ActionComponent={ActionComponent}
    />
  );
};

export default FavoriteForm;
