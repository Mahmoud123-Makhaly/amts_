import { IRepositories, Models, Entities } from '../../../domain';

import {
  GET_ME,
  CHECK_EMAIL_UNIQUENESS,
  REQUEST_REGISTRATION,
  GET_CONTACT,
  UPDATE_CONTACT,
  CHANGE_PASSWORD,
  GET_MY_ADDRESSES,
  DELETE_MEMBER_ADDRESSES,
  UPDATE_MEMBER_ADDRESSES,
  REQUEST_PASSWORD_RESET,
  RESET_PASSWORD_BY_TOKEN,
  ADD_WISHLIST,
  DELETE_WISHLIST,
  ADD_WISHLIST_ITEM,
  DELETE_WISHLIST_ITEM,
  GET_WISHLIST,
  GET_WISHLISTS,
  ADD_CUSTOMER_REVIEW,
  GET_ORDERS,
  getOrderDetailsDocument,
} from './documents';
import { GraphQLClient } from '../graphqlClient';

export class AccountRepository extends IRepositories.IEntityBaseRepository implements IRepositories.IAccountRepository {
  private _restClient = (this._context as GraphQLClient)._restContext;

  constructor(
    context: IRepositories.IClient,
    storeId?: string,
    catalogId?: string,
    cultureName?: string,
    currencyCode?: string,
    userId?: string,
  ) {
    super(context, storeId, catalogId, cultureName, currencyCode, userId);
  }

  getContact = (id: string): Promise<Models.Result<Entities.ContactType>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'contact'>>, Entities.ContactType>({
        query: GET_CONTACT,
        variables: {
          memberId: id,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.getContact',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.ContactType>;
        } else {
          return { data: result.data?.contact } as Models.Result<Entities.ContactType>;
        }
      });
  };

  updateContact = (contact: Entities.InputUpdateContactType): Promise<Models.Result<Entities.ContactType>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'updateContact'>>, Entities.MutationsUpdateContactArgs>({
        mutation: UPDATE_CONTACT,
        variables: {
          command: contact,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.updateContact',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.ContactType>;
        } else {
          return { data: result.data?.updateContact } as Models.Result<Entities.ContactType>;
        }
      });
  };

  getMe = (): Promise<Models.Result<Entities.UserType>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'me'>>>({
        query: GET_ME,
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.getMe',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.UserType>;
        } else {
          return { data: result.data?.me } as Models.Result<Entities.UserType>;
        }
      });
  };

  checkEmailUniqueness = (email: string): Promise<Models.Result<boolean>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'checkEmailUniqueness'>>, Entities.QueryCheckEmailUniquenessArgs>({
        query: CHECK_EMAIL_UNIQUENESS,
        variables: {
          email,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.checkEmailUniqueness',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<boolean>;
        } else {
          return { data: result.data?.checkEmailUniqueness } as Models.Result<boolean>;
        }
      });
  };

  requestRegistration = (
    /** Store ID */
    storeId: string,
    /** Creating contact's account */
    account: Entities.InputRegisterAccountType,
    /** Creating contact */
    contact: Entities.InputRegisterContactType,
    /** Notification language code */
    languageCode?: string,
    /** company type */
    organization?: Entities.InputRegisterOrganizationType,
  ): Promise<Models.Result<Entities.RequestRegistrationType>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'requestRegistration'>>, Entities.MutationsRequestRegistrationArgs>({
        mutation: REQUEST_REGISTRATION,
        variables: {
          command: { storeId, account, contact, languageCode, organization },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.requestRegistration',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.RequestRegistrationType>;
        } else {
          return { data: result.data?.requestRegistration } as Models.Result<Entities.RequestRegistrationType>;
        }
      });
  };

  getToken = (
    grantType: 'password',
    scope: string,
    username: string,
    password: string,
  ): Promise<Models.Result<Entities.LoginType>> => {
    return this._restClient
      .post<any>({
        segmentPath: 'connect/token',
        data: {
          grant_type: grantType,
          scope,
          username: username,
          password: password,
        },
        config: { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.login',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.LoginType>;
        } else {
          const _res = result.data;
          return {
            data: {
              accessToken: _res.access_token,
              code: _res.code,
              deviceCode: _res.deviceCode,
              error: _res.error,
              errorDescription: _res.errorDescription,
              errorUri: _res.errorUri,
              expiresIn: _res.expires_in,
              idToken: _res.id_token,
              iss: _res.iss,
              refreshToken: _res.refresh_token,
              scope: _res.scope,
              state: _res.state,
              tokenType: _res.token_type,
              userCode: _res.userCode,
              verificationUri: _res.verificationUri,
              verificationUriComplete: _res.verificationUriComplete,
              count: _res.count,
            },
          } as Models.Result<Entities.LoginType>;
        }
      });
  };

  getTokenByRefreshToken = (accessToken: string, refreshToken: string): Promise<Models.Result<Entities.LoginType>> => {
    return this._restClient
      .post<any>({
        segmentPath: 'connect/token',
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        },
        config: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.getTokenByRefreshToken',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.LoginType>;
        } else {
          const _res = result.data;
          return {
            data: {
              accessToken: _res.access_token,
              code: _res.code,
              deviceCode: _res.deviceCode,
              error: _res.error,
              errorDescription: _res.errorDescription,
              errorUri: _res.errorUri,
              expiresIn: _res.expires_in,
              idToken: _res.id_token,
              iss: _res.iss,
              refreshToken: _res.refresh_token,
              scope: _res.scope,
              state: _res.state,
              tokenType: _res.token_type,
              userCode: _res.userCode,
              verificationUri: _res.verificationUri,
              verificationUriComplete: _res.verificationUriComplete,
              count: _res.count,
            },
          } as Models.Result<Entities.LoginType>;
        }
      });
  };

  changePassword = (newPassword: string, oldPassword: string, userId: string): Promise<Models.Result<boolean>> => {
    return this._context
      .post<
        Required<Pick<Entities.Mutations, 'changePassword'>>,
        { command: { newPassword: string; oldPassword: string; userId: string } }
      >({
        mutation: CHANGE_PASSWORD,
        variables: {
          command: { newPassword, oldPassword, userId },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.changePassword',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<boolean>;
        } else if (result.data.changePassword.errors && result.data.changePassword.errors.length) {
          return {
            error: {
              code: 'AccountRepository.changePassword',
              message: result.data.changePassword.errors[0].code,
              trace: result.data.changePassword.errors,
            },
          } as Models.Result<boolean>;
        } else {
          return { data: result.data?.changePassword.succeeded } as Models.Result<boolean>;
        }
      });
  };

  getMyAddresses = (
    after?: string,
    first?: number,
    sort?: string,
  ): Promise<Models.Result<Array<Entities.MemberAddressType>>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'me'>>, { query: { after?: string; first?: number; sort?: string } }>({
        query: GET_MY_ADDRESSES,
        variables: {
          after,
          first,
          sort,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.getMyAddresses',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Array<Entities.MemberAddressType>>;
        } else {
          return { data: result.data?.me.contact?.addresses?.items } as Models.Result<
            Array<Entities.MemberAddressType>
          >;
        }
      });
  };

  deleteMemberAddresses = (
    memberId: string,
    addresses: Array<Entities.MemberAddressType>,
  ): Promise<Models.Result<string>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'deleteMemberAddresses'>>, Entities.MutationsDeleteMemberAddressesArgs>({
        mutation: DELETE_MEMBER_ADDRESSES,
        variables: {
          command: {
            memberId,
            addresses,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.deleteMemberAddresses',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<string>;
        } else {
          return { data: result.data?.deleteMemberAddresses.id } as Models.Result<string>;
        }
      });
  };

  deleteMemberAddress = (memberId: string, address: Entities.MemberAddressType): Promise<Models.Result<string>> => {
    return this.deleteMemberAddresses(memberId, [address]).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountRepository.deleteMemberAddress',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Models.Result<string>;
      } else {
        return { data: result.data } as Models.Result<string>;
      }
    });
  };

  updateMemberAddresses = (
    memberId: string,
    addresses: Array<Entities.MemberAddressType>,
  ): Promise<Models.Result<string>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'updateMemberAddresses'>>, Entities.MutationsUpdateMemberAddressesArgs>({
        mutation: UPDATE_MEMBER_ADDRESSES,
        variables: {
          command: {
            memberId,
            addresses,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.updateMemberAddresses',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<string>;
        } else {
          return { data: result.data?.updateMemberAddresses.id } as Models.Result<string>;
        }
      });
  };

  updateMemberAddress = (memberId: string, address: Entities.MemberAddressType): Promise<Models.Result<string>> => {
    return this.updateMemberAddresses(memberId, [address]).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountRepository.updateMemberAddress',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Models.Result<string>;
      } else {
        return { data: result.data } as Models.Result<string>;
      }
    });
  };

  addMemberAddress = (memberId: string, address: Entities.MemberAddressType): Promise<Models.Result<string>> => {
    return this.addMemberAddresses(memberId, [address]).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountRepository.addMemberAddress',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Models.Result<string>;
      } else {
        return { data: result.data } as Models.Result<string>;
      }
    });
  };

  addMemberAddresses = (
    memberId: string,
    addresses: Array<Entities.MemberAddressType>,
  ): Promise<Models.Result<string>> => {
    return this.updateMemberAddresses(memberId, addresses).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountRepository.addMemberAddresses',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Models.Result<string>;
      } else {
        return { data: result.data } as Models.Result<string>;
      }
    });
  };

  requestPasswordReset = (loginOrEmail: string, urlSuffix?: string | undefined): Promise<Models.Result<boolean>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'requestPasswordReset'>>, Entities.QueryRequestPasswordResetArgs>({
        query: REQUEST_PASSWORD_RESET,
        variables: {
          loginOrEmail,
          urlSuffix,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.requestPasswordReset',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<boolean>;
        } else {
          return { data: result.data?.requestPasswordReset } as Models.Result<boolean>;
        }
      });
  };

  resetPasswordByToken = (newPassword: string, token: string, userId: string): Promise<Models.Result<boolean>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'resetPasswordByToken'>>, Entities.MutationsResetPasswordByTokenArgs>({
        mutation: RESET_PASSWORD_BY_TOKEN,
        variables: {
          command: {
            newPassword,
            token,
            userId,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.resetPasswordByToken',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<boolean>;
        } else if (result.data.resetPasswordByToken.errors || !result.data.resetPasswordByToken.succeeded) {
          return {
            error: {
              code: 'AccountRepository.resetPasswordByToken',
              message: result.data.resetPasswordByToken.errors?.length
                ? result.data.resetPasswordByToken.errors[0].code
                : 'Invalid token or user id',
              trace: result.data.resetPasswordByToken.errors,
            },
          } as Models.Result<boolean>;
        } else {
          return { data: result.data?.resetPasswordByToken.succeeded } as Models.Result<boolean>;
        }
      });
  };

  createWishlist = (listName: string): Promise<Models.Result<string>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'createWishlist'>>, Entities.MutationsCreateWishlistArgs>({
        mutation: ADD_WISHLIST,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            cultureName: this.cultureName,
            currencyCode: this.currencyCode,
            listName,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.createWishlist',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<string>;
        } else {
          return { data: result.data?.createWishlist.id || '' } as Models.Result<string>;
        }
      });
  };

  removeWishlist = (listId: string): Promise<Models.Result<boolean>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'removeWishlist'>>, Entities.MutationsRemoveWishlistArgs>({
        mutation: DELETE_WISHLIST,
        variables: {
          command: {
            listId,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.removeWishlist',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<boolean>;
        } else {
          return { data: result.data?.removeWishlist } as Models.Result<boolean>;
        }
      });
  };

  addWishlistItem = (listId: string, productId: string, quantity?: number): Promise<Models.Result<string>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'addWishlistItem'>>, Entities.MutationsAddWishlistItemArgs>({
        mutation: ADD_WISHLIST_ITEM,
        variables: {
          command: {
            listId,
            productId,
            quantity,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.addWishlistItem',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<string>;
        } else {
          return { data: result.data?.addWishlistItem.id || '' } as Models.Result<string>;
        }
      });
  };

  deleteWishlistItem = (listId: string, lineItemId: string): Promise<Models.Result<boolean>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'removeWishlistItem'>>, Entities.InputRemoveWishlistItemType>({
        mutation: DELETE_WISHLIST_ITEM,
        variables: {
          command: {
            listId,
            lineItemId,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.deleteWishlistItem',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<boolean>;
        } else {
          return { data: !!result.data?.removeWishlistItem.id } as Models.Result<boolean>;
        }
      });
  };

  getWishlist = (listId: string): Promise<Models.Result<Entities.WishlistType>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'wishlist'>>, Entities.QueryWishlistArgs>({
        query: GET_WISHLIST,
        variables: {
          cultureName: this.cultureName,
          listId,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.getWishlist',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.WishlistType>;
        } else {
          return { data: result.data?.wishlist } as Models.Result<Entities.WishlistType>;
        }
      });
  };

  getWishlists = (
    after?: string | undefined,
    first?: number | undefined,
    sort?: string | undefined,
  ): Promise<Models.Result<Entities.WishlistConnection>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'wishlists'>>, Entities.QueryWishlistsArgs>({
        query: GET_WISHLISTS,
        variables: {
          storeId: this.storeId,
          userId: this.userId,
          cultureName: this.cultureName,
          currencyCode: this.currencyCode,
          sort,
          first,
          after,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.getWishlists',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.WishlistConnection>;
        } else {
          return { data: result.data?.wishlists } as Models.Result<Entities.WishlistConnection>;
        }
      });
  };

  createReview = (
    userName: string,
    entityId: string,
    entityType: 'Product',
    entityName: string,
    title: string,
    review: string,
    rating: number,
  ): Promise<Models.Result<Entities.CustomerReview>> => {
    return this._context
      .post<Required<Pick<Entities.Mutations, 'createCustomerReview'>>, Entities.MutationsCreateCustomerReviewArgs>({
        mutation: ADD_CUSTOMER_REVIEW,
        variables: {
          command: {
            storeId: this.storeId,
            userId: this.userId,
            userName,
            entityId,
            entityType,
            entityName,
            title,
            review,
            rating,
          },
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.createReview',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CustomerReview>;
        } else {
          return { data: result.data?.createCustomerReview } as Models.Result<Entities.CustomerReview>;
        }
      });
  };

  getCustomerOrders = (
    filter?: string,
    sort?: string,
    after?: string,
    first?: number,
  ): Promise<Models.Result<Entities.CustomerOrderConnection>> => {
    return this._context
      .get<Required<Pick<Entities.Query, 'orders'>>, Entities.QueryOrdersArgs>({
        query: GET_ORDERS,
        variables: {
          userId: this.userId,
          cultureName: this.cultureName,
          filter,
          sort,
          after,
          first,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.getCustomerOrders',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CustomerOrderConnection>;
        } else {
          return { data: result.data?.orders } as Models.Result<Entities.CustomerOrderConnection>;
        }
      });
  };

  getOrderDetails = (
    type: 'short' | 'full',
    number: string | undefined,
    id?: string,
  ): Promise<Models.Result<Entities.CustomerOrderType>> => {
    const queryDocument = getOrderDetailsDocument(type);
    return this._context
      .get<Required<Pick<Entities.Query, 'order'>>, Entities.QueryOrderArgs>({
        query: queryDocument,
        variables: {
          cultureName: this.cultureName,
          id,
          number,
        },
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountRepository.getOrderDetails',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<Entities.CustomerOrderType>;
        } else {
          return { data: result.data?.order } as Models.Result<Entities.CustomerOrderType>;
        }
      });
  };
}
