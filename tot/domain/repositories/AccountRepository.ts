import {
  UserType,
  RequestRegistrationType,
  InputRegisterAccountType,
  InputRegisterContactType,
  InputRegisterOrganizationType,
  LoginType,
  InputUpdateContactType,
  ContactType,
  MemberAddressType,
  WishlistType,
  WishlistConnection,
  CustomerReview,
  CustomerOrderConnection,
  CustomerOrderType,
} from '../entities';
import { Result } from '../models';
import { IEntityBaseRepository } from './EntityBaseRepository';

export interface IAccountRepository extends IEntityBaseRepository {
  getMe: () => Promise<Result<UserType>>;

  checkEmailUniqueness: (email: string) => Promise<Result<boolean>>;

  requestRegistration: (
    /** Store ID */
    storeId: string,
    /** Creating contact's account */
    account: InputRegisterAccountType,
    /** Creating contact */
    contact: InputRegisterContactType,
    /** Notification language code */
    languageCode?: string,
    /** company type */
    organization?: InputRegisterOrganizationType,
  ) => Promise<Result<RequestRegistrationType>>;

  getToken: (grantType: 'password', scope: string, username: string, password: string) => Promise<Result<LoginType>>;

  getTokenByRefreshToken: (accessToken: string, refreshToken: string) => Promise<Result<LoginType>>;

  changePassword: (
    /** New password according with system security policy */
    newPassword: string,
    /** User password reset token */
    oldPassword: string,
    /** User identifier */
    userId: string,
  ) => Promise<Result<boolean>>;

  requestPasswordReset: (loginOrEmail: string, urlSuffix?: string) => Promise<Result<boolean>>;

  updateContact: (contact: InputUpdateContactType) => Promise<Result<ContactType>>;

  getContact: (id: string) => Promise<Result<ContactType>>;

  getMyAddresses: (after?: string, first?: number, sort?: string) => Promise<Result<Array<MemberAddressType>>>;

  deleteMemberAddress: (memberId: string, address: MemberAddressType) => Promise<Result<string>>;

  deleteMemberAddresses: (memberId: string, addresses: Array<MemberAddressType>) => Promise<Result<string>>;

  updateMemberAddress: (memberId: string, address: MemberAddressType) => Promise<Result<string>>;

  updateMemberAddresses: (memberId: string, addresses: Array<MemberAddressType>) => Promise<Result<string>>;

  addMemberAddress: (memberId: string, address: MemberAddressType) => Promise<Result<string>>;

  addMemberAddresses: (memberId: string, addresses: Array<MemberAddressType>) => Promise<Result<string>>;

  resetPasswordByToken: (newPassword: string, token: string, userId: string) => Promise<Result<boolean>>;

  createWishlist: (listName: string) => Promise<Result<string>>;

  removeWishlist: (listId: string) => Promise<Result<boolean>>;

  addWishlistItem: (listId: string, productId: string, quantity?: number) => Promise<Result<string>>;

  deleteWishlistItem: (listId: string, lineItemId: string) => Promise<Result<boolean>>;

  getWishlist: (listId: string) => Promise<Result<WishlistType>>;

  getWishlists: (after?: string, first?: number, sort?: string) => Promise<Result<WishlistConnection>>;

  createReview: (
    userName: string,
    entityId: string,
    entityType: 'Product',
    entityName: string,
    title: string,
    review: string,
    rating: number,
  ) => Promise<Result<CustomerReview>>;

  getCustomerOrders: (
    filter?: string,
    sort?: string,
    after?: string,
    first?: number,
  ) => Promise<Result<CustomerOrderConnection>>;

  getOrderDetails: (type: 'short' | 'full', number: string, id?: string) => Promise<Result<CustomerOrderType>>;
}
