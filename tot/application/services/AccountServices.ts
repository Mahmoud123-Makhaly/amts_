import { Entities } from '@tot/domain';

import { IAccountService } from '../contracts';
import { Utils } from '../common';
import { Contracts, DTO, Models } from '../types';
import { Mapper } from '../mapper';

export class AccountServices extends IAccountService {
  protected setContext() {
    this._context = new this._repos.AccountRepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
    );
  }

  checkEmailUniqueness(email: string): Promise<Contracts.Result<boolean>> {
    return this._context.checkEmailUniqueness(email).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.checkEmailUniqueness',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }

  protected requestRegistration(
    account: Models.InputRegisterAccountType,
    contact: Models.InputRegisterContactType,
    organization?: Models.InputRegisterOrganizationType,
  ): Promise<Contracts.Result<DTO.IContactDTO>> {
    if (Utils.checkIfEmpty(this._configurations.selectedStoreId))
      return Promise.resolve<Contracts.Result<DTO.IContactDTO>>({
        error: {
          code: 'AccountServices.requestRegistration',
          message: 'Store Id is invalid.',
        },
      } as Contracts.Result<DTO.IContactDTO>);
    else
      return this._context
        .requestRegistration(
          this._configurations.selectedStoreId!,
          account,
          contact,
          this._configurations.defaultCultureName,
          organization,
        )
        .then(result => {
          if (result.error) {
            return {
              error: {
                code: 'AccountServices.requestRegistration',
                message: result.error?.message || 'Could not create an account.',
                trace: [result.error],
              },
            } as Contracts.Result<DTO.IContactDTO>;
          } else if (
            (result.data.result && !result.data.result.succeeded) ||
            !result.data.contact ||
            !result.data.account
          ) {
            return {
              error: {
                code: 'AccountServices.requestRegistration',
                message: result.data.result?.errors?.at(0)?.code ?? 'Could not create an account.',
                trace: result.data.result?.errors ?? [],
              },
            } as Contracts.Result<DTO.IContactDTO>;
          } else {
            const _contact: DTO.IContactDTO = {
              id: result.data.contact.id,
              firstName: result.data.contact.firstName,
              lastName: result.data.contact.lastName,
              middleName: result.data.contact.middleName,
              about: result.data.contact.about,
              birthdate: result.data.contact.birthdate,
              status: result.data.contact.status,
              securityAccounts: [
                {
                  createdBy: result.data.account.createdBy,
                  email: result.data.account.email,
                  id: result.data.account.id,
                  status: result.data.account.status,
                  username: result.data.account.username,
                  phoneNumber: result.data.contact.phoneNumber,
                } as DTO.IAccountDTO,
              ],
              organizations: [
                {
                  id: result.data.organization?.id,
                } as DTO.IOrganizationDTO,
              ],
            };
            return { data: _contact } as Contracts.Result<DTO.IContactDTO>;
          }
        });
  }

  requestContactRegistration(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    middleName?: string,
    phoneNumber?: string,
    about?: string,
    birthDate?: Date,
  ): Promise<Contracts.Result<DTO.IContactDTO>> {
    return this.requestRegistration(
      { email, password, username: email },
      { firstName, lastName, middleName, phoneNumber, about: about ?? firstName, birthdate: birthDate },
    ).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.requestContactRegistration',
            message: 'Could not create a contact.',
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IContactDTO>;
      } else {
        return { data: result.data } as Contracts.Result<DTO.IContactDTO>;
      }
    });
  }

  getCurrentUser(): Promise<Contracts.Result<DTO.IUserDTO>> {
    return this._context.getMe().then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.getCurrentUser',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IUserDTO>;
      } else {
        const _user: DTO.IUserDTO = {
          id: result.data.id,
          userName: result.data.userName,
          email: result.data.email,
          emailConfirmed: result.data.emailConfirmed,
          firstName: result.data.contact?.firstName,
          lastName: result.data.contact?.lastName,
          forcePasswordChange: result.data.forcePasswordChange || false,
          isAdministrator: result.data.isAdministrator,
          lockedState: result.data.lockedState || false,
          lockoutEnabled: result.data.lockoutEnabled,
          lockoutEnd: result.data.lockoutEnd,
          memberId: result.data.memberId,
          passwordExpired: result.data.passwordExpired,
          phoneNumber: result.data.phoneNumber,
          photoUrl: result.data.photoUrl,
          accessFailedCount: result.data.accessFailedCount,
          twoFactorEnabled: result.data.twoFactorEnabled,
          userType: result.data.userType,
        };
        return { data: _user } as Contracts.Result<DTO.IUserDTO>;
      }
    });
  }

  login(username: string, password: string): Promise<Contracts.Result<DTO.IJWT>> {
    return this._context
      .getToken('password', 'offline_access profile openid email', username, password)
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.login',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<DTO.IJWT>;
        } else {
          return { data: result.data } as Contracts.Result<DTO.IJWT>;
        }
      });
  }

  getTokenByRefreshToken(refreshToken: string): Promise<Contracts.Result<DTO.IJWT>> {
    return this._context.getTokenByRefreshToken(this._configurations.accessToken ?? '', refreshToken).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.getTokenByRefreshToken',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IJWT>;
      } else {
        return { data: result.data } as Contracts.Result<DTO.IJWT>;
      }
    });
  }

  getContact = (id: string): Promise<Contracts.Result<DTO.IContactDTO>> => {
    return this._context.getContact(id).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.getContact',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IContactDTO>;
      } else {
        return {
          data: {
            ...result.data,
            birthdate: result.data.birthDate ? new Date(result.data.birthDate.toString()) : undefined,
            email: result.data.emails,
            phones: result.data.phones,
          } as DTO.IContactDTO,
        } as Contracts.Result<DTO.IContactDTO>;
      }
    });
  };

  //TODO: update contact birthDate
  updateContact(
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    birthDate?: Date | undefined,
    about?: string,
  ): Promise<Contracts.Result<DTO.IContactDTO>> {
    return this._context
      .updateContact({ id, emails: [email], phones: [phoneNumber], firstName, lastName, about: about ?? firstName })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.updateContact',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<DTO.IContactDTO>;
        } else {
          return {
            data: {
              ...result.data,
              birthdate: result.data.birthDate ? new Date(result.data.birthDate.toString()) : undefined,
              email: result.data.emails,
              phones: result.data.phones,
            } as DTO.IContactDTO,
          } as Contracts.Result<DTO.IContactDTO>;
        }
      });
  }

  async changeLoggedInUserPassword(
    oldPassword: string,
    newPassword: string,
    id: string,
  ): Promise<Contracts.Result<boolean>> {
    return this._context.changePassword(newPassword, oldPassword, id).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.changeLoggedInUserPassword',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }

  getMyAddresses(
    after?: string | undefined,
    first?: number | undefined,
    sort?: string | undefined,
  ): Promise<Contracts.Result<Array<DTO.IMemberAddressDTO>>> {
    return this._context.getMyAddresses(after, first, sort).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.getMyAddresses',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<Array<DTO.IMemberAddressDTO>>;
      } else {
        return {
          data: result.data?.map(address => ({
            ...address,
            ...Object(Utils.addressFormatter('extract', address.line1 ?? '')),
          })),
        } as Contracts.Result<Array<DTO.IMemberAddressDTO>>;
      }
    });
  }

  deleteMemberAddresses(memberId: string, addresses: Array<DTO.IMemberAddressDTO>): Promise<Contracts.Result<string>> {
    return this._context
      .deleteMemberAddresses(
        memberId,
        addresses.map(address => {
          const { address: mainAddress, building, floor, flat, formattedAddress, ...rest } = address;
          return { ...rest, line1: formattedAddress };
        }),
      )
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.deleteMemberAddresses',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<string>;
        } else {
          return { data: result.data } as Contracts.Result<string>;
        }
      });
  }

  deleteMemberAddress(memberId: string, address: DTO.IMemberAddressDTO): Promise<Contracts.Result<string>> {
    const { address: mainAddress, building, floor, flat, formattedAddress, ...rest } = address;
    return this._context.deleteMemberAddress(memberId, { ...rest, line1: formattedAddress }).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.deleteMemberAddress',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<string>;
      } else {
        return { data: result.data } as Contracts.Result<string>;
      }
    });
  }

  //TODO: update is default flag too
  updateMemberAddresses(memberId: string, addresses: Array<DTO.IMemberAddressDTO>): Promise<Contracts.Result<string>> {
    return this._context
      .updateMemberAddresses(
        memberId,
        addresses.map(address => {
          const { address: mainAddress, building, floor, flat, formattedAddress, ...rest } = address;
          return {
            ...rest,
            line1: Utils.addressFormatter('format', {
              address: mainAddress,
              building,
              floor,
              flat,
            }).toString(),
          };
        }),
      )
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.updateMemberAddresses',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<string>;
        } else {
          return { data: result.data } as Contracts.Result<string>;
        }
      });
  }

  updateMemberAddress(memberId: string, address: DTO.IMemberAddressDTO): Promise<Contracts.Result<string>> {
    const { address: mainAddress, building, floor, flat, formattedAddress, ...rest } = address;
    return this._context
      .updateMemberAddress(memberId, {
        ...rest,
        line1: Utils.addressFormatter('format', {
          address: mainAddress,
          building,
          floor,
          flat,
        }).toString(),
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.updateMemberAddress',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<string>;
        } else {
          return { data: result.data } as Contracts.Result<string>;
        }
      });
  }

  addMemberAddresses(memberId: string, addresses: Array<DTO.IMemberAddressDTO>): Promise<Contracts.Result<string>> {
    return this._context
      .addMemberAddresses(
        memberId,
        addresses.map(address => {
          const { address: mainAddress, building, floor, flat, formattedAddress, ...rest } = address;
          return {
            ...rest,
            line1: Utils.addressFormatter('format', {
              address: mainAddress,
              building,
              floor,
              flat,
            }).toString(),
          };
        }),
      )
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.addMemberAddresses',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<string>;
        } else {
          return { data: result.data } as Contracts.Result<string>;
        }
      });
  }

  addMemberAddress(memberId: string, address: DTO.IMemberAddressDTO): Promise<Contracts.Result<string>> {
    const { address: mainAddress, building, floor, flat, formattedAddress, ...rest } = address;

    return this._context
      .addMemberAddress(memberId, {
        ...rest,
        line1: Utils.addressFormatter('format', {
          address: mainAddress,
          building,
          floor,
          flat,
        }).toString(),
      })
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.addMemberAddress',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<string>;
        } else {
          return { data: result.data } as Contracts.Result<string>;
        }
      });
  }

  requestPasswordReset(
    loginOrEmail: string,
    state: Record<string, string>,
    prefixLocale?: string | undefined,
  ): Promise<Contracts.Result<boolean>> {
    const _query = Utils.createEncodedHash(state, ',', this._configurations.hashSignSecret ?? '');

    return this._context
      .requestPasswordReset(
        loginOrEmail,
        `${prefixLocale}/${this._configurations.resetPasswordWebHook ?? ''}?${_query}`.replaceAll('//', '/'),
      )
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.requestPasswordReset',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<boolean>;
        } else {
          return { data: result.data } as Contracts.Result<boolean>;
        }
      });
  }

  resetPasswordByToken(
    newPassword: string,
    token: string,
    userId: string,
    state: Record<string, string>,
    hash: string,
  ): Promise<Contracts.Result<boolean>> {
    if (!Utils.isValidHash(state, ',', this._configurations.hashSignSecret ?? '', hash))
      return new Promise(
        resolve =>
          ({
            error: {
              code: 'AccountServices.requestPasswordReset',
              message: 'Invalid hash',
            },
          }) as Contracts.Result<boolean>,
      );
    return this._context.resetPasswordByToken(newPassword, token, userId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.resetPasswordByToken',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }

  async createWishlist(listName: string): Promise<Contracts.Result<string>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<string>('AccountServices.createWishlist');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.createWishlist(listName).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.createWishlist',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<string>;
      } else {
        return { data: result.data } as Contracts.Result<string>;
      }
    });
  }

  async removeWishlist(listId: string): Promise<Contracts.Result<boolean>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<boolean>('AccountServices.removeWishlist');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.removeWishlist(listId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.removeWishlist',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }

  async addWishlistItem(
    listId: string,
    productId: string,
    quantity?: number | undefined,
  ): Promise<Contracts.Result<string>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<string>('AccountServices.addWishlistItem');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.addWishlistItem(listId, productId, quantity).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.addWishlistItem',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<string>;
      } else {
        return { data: result.data } as Contracts.Result<string>;
      }
    });
  }

  async deleteWishlistItem(listId: string, lineItemId: string): Promise<Contracts.Result<boolean>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<boolean>('AccountServices.deleteWishlistItem');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.deleteWishlistItem(listId, lineItemId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.deleteWishlistItem',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }

  async getWishlist(listId: string): Promise<Contracts.Result<DTO.IWishlistTypeDTO>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<DTO.IWishlistTypeDTO>('AccountServices.getWishlist');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.getWishlist(listId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.getWishlist',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IWishlistTypeDTO>;
      } else {
        return { data: result.data } as Contracts.Result<DTO.IWishlistTypeDTO>;
      }
    });
  }

  async getWishlists(
    after?: string | undefined,
    first?: number | undefined,
    sort?: string | undefined,
  ): Promise<Contracts.Result<DTO.IWishlistConnectionDTO>> {
    const _isUserAuthenticated =
      await this.checkUserAuthenticity<DTO.IWishlistConnectionDTO>('AccountServices.getWishlists');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.getWishlists(after, first, sort).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.getWishlists',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IWishlistConnectionDTO>;
      } else {
        return { data: result.data } as Contracts.Result<DTO.IWishlistConnectionDTO>;
      }
    });
  }

  async requestDefaultWishlist(): Promise<Contracts.Result<string>> {
    //check if user is authenticated
    const _isUserAuthenticated = await this.checkUserAuthenticity<string>('AccountServices.requestDefaultWishlist');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    const DEFAULT_WISHLIST_NAME = `wishlist-${this._configurations.user?.id}`;

    //get user wishlists to check if default wishlist is already created or not
    const _userWishlists = await this.getWishlists();
    if (_userWishlists.error) {
      return {
        error: {
          code: 'AccountServices.requestDefaultWishlist',
          message: 'Failed to fetch user wishlists for getting default one.',
          trace: [_userWishlists.error],
        },
      } as Contracts.Result<string>;
    }

    if (
      _userWishlists.data.totalCount === 0 ||
      !_userWishlists.data.items?.some(x => x.name === DEFAULT_WISHLIST_NAME)
    ) {
      const _defaultWishlistId = await this.createWishlist(DEFAULT_WISHLIST_NAME);
      if (_defaultWishlistId.error) {
        return {
          error: {
            code: 'AccountServices.requestDefaultWishlist',
            message: 'Failed to create user default wishlist.',
            trace: [_defaultWishlistId.error],
          },
        } as Contracts.Result<string>;
      } else
        return {
          data: _defaultWishlistId.data,
        } as Contracts.Result<string>;
    } else
      return {
        data: _userWishlists.data.items.find(x => x.name === DEFAULT_WISHLIST_NAME)!.id,
      } as Contracts.Result<string>;
  }

  async getDefaultWishlist(inInventory?: string): Promise<Contracts.Result<DTO.IWishlistTypeDTO>> {
    //check if user is authenticated
    const _isUserAuthenticated = await this.checkUserAuthenticity<DTO.IWishlistTypeDTO>(
      'AccountServices.getDefaultWishlist',
    );
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    const DEFAULT_WISHLIST_NAME = `wishlist-${this._configurations.user?.id}`;

    //get user wishlists to check if default wishlist is already created or not
    const _userWishlists = await this.getWishlists();
    if (_userWishlists.error) {
      return {
        error: {
          code: 'AccountServices.getDefaultWishlist',
          message: 'Failed to fetch user wishlists for getting default one.',
          trace: [_userWishlists.error],
        },
      } as Contracts.Result<DTO.IWishlistTypeDTO>;
    } else {
      let _wishlist: DTO.IWishlistTypeDTO | undefined = _userWishlists.data.items?.find(
        x => x.name === DEFAULT_WISHLIST_NAME,
      );

      if (_wishlist && _wishlist.items && _wishlist.items.length) {
        _wishlist = {
          ..._wishlist,
          items: _wishlist.items.map(item => ({
            ...item,
            product: { ...Mapper.mapEntitiesProductToProductDTO(item.product!, inInventory) },
          })),
        };
      }

      return {
        data: _wishlist,
      } as Contracts.Result<DTO.IWishlistTypeDTO>;
    }
  }

  async removeProductFromWishlist(listId: string, productId: string): Promise<Contracts.Result<string>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<string>('AccountServices.removeProductFromWishlist');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    const _wishlist = await this.getWishlist(listId);
    if (_wishlist.error) {
      return {
        error: {
          code: 'AccountServices.removeProductFromWishlist',
          message: `Wishlist doesn't exist`,
          trace: [_wishlist.error],
        },
      } as Contracts.Result<string>;
    } else if (
      !_wishlist.data ||
      (_wishlist.data.itemsCount || 0) <= 0 ||
      !_wishlist.data.items ||
      _wishlist.data.items.length <= 0
    ) {
      return {
        error: {
          code: 'AccountServices.removeProductFromWishlist',
          message: `Wishlist is empty.`,
        },
      } as Contracts.Result<string>;
    } else if (!_wishlist.data.items.some(x => x.productId === productId)) {
      return {
        error: {
          code: 'AccountServices.removeProductFromWishlist',
          message: `Product doesn't belong to this wishlist.`,
        },
      } as Contracts.Result<string>;
    } else {
      const _lineItem = _wishlist.data.items.find(x => x.productId === productId)!;
      const _lineItemDeletionStatus = await this.deleteWishlistItem(listId, _lineItem.id);
      if (_lineItemDeletionStatus.error || !_lineItemDeletionStatus.data) {
        return {
          error: {
            code: 'AccountServices.removeProductFromWishlist',
            message: `Failed to delete the product`,
            trace: [_lineItemDeletionStatus.error],
          },
        } as Contracts.Result<string>;
      } else return { data: productId } as Contracts.Result<string>;
    }
  }

  async createReview(
    userName: string,
    entityId: string,
    entityType: 'Product',
    entityName: string,
    title: string,
    review: string,
    rating: number,
  ): Promise<Contracts.Result<DTO.ICustomerReviewDTO>> {
    const _isUserAuthenticated =
      await this.checkUserAuthenticity<DTO.ICustomerReviewDTO>('AccountServices.createReview');
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    if (this._configurations.reviewsMode === 'None')
      return {
        error: {
          code: 'AccountServices.createReview',
          message: 'App Reviews Mode is NONE',
        },
      } as Contracts.Result<DTO.ICustomerReviewDTO>;

    return this._context
      .createReview(userName, entityId, entityType, entityName, title, review, rating)
      .then(result => {
        if (result.error) {
          return {
            error: {
              code: 'AccountServices.createReview',
              message: Utils.hasPropertyWithSpecificValue(result.error, 'message', 'duplicate key value', 'ini')
                ? 'DUPLICATE'
                : result.error?.message,
              trace: [result.error],
            },
          } as Contracts.Result<DTO.ICustomerReviewDTO>;
        } else {
          return { data: result.data } as Contracts.Result<DTO.ICustomerReviewDTO>;
        }
      });
  }

  async getCustomerOrders(
    filter?: string | undefined,
    sort: string | undefined = 'createdDate:desc',
    after?: string | undefined,
    first?: number | undefined,
  ): Promise<Contracts.Result<DTO.ICustomerOrderConnectionDTO>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<DTO.ICustomerOrderConnectionDTO>(
      'AccountServices.getCustomerOrders',
    );
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.getCustomerOrders(filter, sort, after, first).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.getCustomerOrders',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICustomerOrderConnectionDTO>;
      } else {
        return { data: result.data } as Contracts.Result<DTO.ICustomerOrderConnectionDTO>;
      }
    });
  }

  async getOrderDetails(
    number: string,
    type: 'short' | 'full' = 'full',
    id?: string,
  ): Promise<Contracts.Result<DTO.ICustomerOrderDTO>> {
    const _isUserAuthenticated = await this.checkUserAuthenticity<DTO.ICustomerOrderDTO>(
      'AccountServices.getOrderDetails',
    );
    if (!_isUserAuthenticated.data) return _isUserAuthenticated;

    return this._context.getOrderDetails(type, number, id).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.getOrderDetails',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.ICustomerOrderDTO>;
      } else {
        const data: DTO.ICustomerOrderDTO = {
          createdDate: result.data.createdDate,
          id: result.data.id,
          isApproved: result.data.isApproved,
          isCancelled: result.data.isCancelled,
          currency: result.data.currency,
          customerName: result.data.customerName,
          purchaseOrderNumber: result.data.purchaseOrderNumber,
          shipments: result.data.shipments?.map(shipment => ({
            ...shipment,
            deliveryAddress: {
              ...shipment.deliveryAddress,
              ...Object(Utils.addressFormatter('extract', shipment.deliveryAddress?.line1 ?? '')),
            },
            ...Object(Utils.removeKeysDeep(shipment, ['discounts'])),
          })),
          items: result.data.items.map(item => ({
            ...item,
            ...Object(Utils.removeKeysDeep(item, ['discounts'])),
            product: item?.product ? { ...Mapper.mapEntitiesProductToProductDTO(item.product) } : undefined,
          })),
          number: result.data.number,
          status: result.data.status,
          subTotal: result.data.subTotal,
          total: result.data.total,
          discountTotalWithTax: result.data.discountTotalWithTax,
          shippingTotal: result.data.shippingTotal,
          taxTotal: result.data.taxTotal,
          inPayments: result.data.inPayments,
          modifiedDate: result.data.modifiedDate,
        };
        return { data } as Contracts.Result<DTO.ICustomerOrderDTO>;
      }
    });
  }
  requestContactWithOrganizationRegistration(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    organizationName: string,
    middleName?: string | undefined,
    phoneNumber?: string | undefined,
    about?: string | undefined,
    birthDate?: Date | undefined,
  ): Promise<Contracts.Result<DTO.IContactDTO>> {
    return this.requestRegistration(
      { email, password, username: email },
      { firstName, lastName, middleName, phoneNumber, about: about ?? firstName, birthdate: birthDate },
      { name: organizationName },
    ).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'AccountServices.requestContactWithOrganizationRegistration',
            message: 'Could not create a contact.',
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IContactDTO>;
      } else {
        return { data: result.data } as Contracts.Result<DTO.IContactDTO>;
      }
    });
  }
}
