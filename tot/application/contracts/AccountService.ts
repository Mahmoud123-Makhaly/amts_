import { IRepositories } from '../../domain';
import { IBaseService } from '.';
import { Result } from './Result';
import { DTO, Models } from '../types';

export abstract class IAccountService extends IBaseService<IRepositories.IAccountRepository> {
  abstract checkEmailUniqueness(email: string): Promise<Result<boolean>>;

  protected abstract requestRegistration(
    /** Creating contact's account */
    account: Models.InputRegisterAccountType,
    /** Creating contact */
    contact: Models.InputRegisterContactType,
    /** company type */
    organization?: Models.InputRegisterOrganizationType,
  ): Promise<Result<DTO.IContactDTO>>;

  abstract requestContactRegistration(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    middleName?: string,
    phoneNumber?: string,
    about?: string,
    birthDate?: Date,
  ): Promise<Result<DTO.IContactDTO>>;

  abstract getCurrentUser(): Promise<Result<DTO.IUserDTO>>;

  abstract login(username: string, password: string): Promise<Result<DTO.IJWT>>;

  abstract getTokenByRefreshToken(refreshToken: string): Promise<Result<DTO.IJWT>>;

  abstract getContact(id: string): Promise<Result<DTO.IContactDTO>>;

  abstract updateContact(
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    birthDate?: Date,
    about?: string,
  ): Promise<Result<DTO.IContactDTO>>;

  abstract changeLoggedInUserPassword(oldPassword: string, newPassword: string, id: string): Promise<Result<boolean>>;

  abstract getMyAddresses(after?: string, first?: number, sort?: string): Promise<Result<Array<DTO.IMemberAddressDTO>>>;

  abstract deleteMemberAddress(memberId: string, address: DTO.IMemberAddressDTO): Promise<Result<string>>;

  abstract deleteMemberAddresses(memberId: string, addresses: Array<DTO.IMemberAddressDTO>): Promise<Result<string>>;

  abstract updateMemberAddress(memberId: string, address: DTO.IMemberAddressDTO): Promise<Result<string>>;

  abstract updateMemberAddresses(memberId: string, addresses: Array<DTO.IMemberAddressDTO>): Promise<Result<string>>;

  abstract addMemberAddress(memberId: string, address: DTO.IMemberAddressDTO): Promise<Result<string>>;

  abstract addMemberAddresses(memberId: string, addresses: Array<DTO.IMemberAddressDTO>): Promise<Result<string>>;

  abstract requestPasswordReset(
    loginOrEmail: string,
    state: Record<string, string>,
    prefixLocale?: string,
  ): Promise<Result<boolean>>;

  abstract resetPasswordByToken(
    newPassword: string,
    token: string,
    userId: string,
    state: Record<string, string>,
    hash: string,
  ): Promise<Result<boolean>>;

  abstract createWishlist(listName: string): Promise<Result<string>>;

  abstract removeWishlist(listId: string): Promise<Result<boolean>>;

  abstract addWishlistItem(listId: string, productId: string, quantity?: number): Promise<Result<string>>;

  abstract deleteWishlistItem(listId: string, lineItemId: string): Promise<Result<boolean>>;

  abstract getWishlist(listId: string): Promise<Result<DTO.IWishlistTypeDTO>>;

  abstract getWishlists(after?: string, first?: number, sort?: string): Promise<Result<DTO.IWishlistConnectionDTO>>;

  abstract requestDefaultWishlist(): Promise<Result<string>>;

  abstract getDefaultWishlist(inInventory?: string): Promise<Result<DTO.IWishlistTypeDTO>>;

  abstract removeProductFromWishlist(listId: string, productId: string): Promise<Result<string>>;

  abstract createReview(
    userName: string,
    entityId: string,
    entityType: 'Product',
    entityName: string,
    title: string,
    review: string,
    rating: number,
  ): Promise<Result<DTO.ICustomerReviewDTO>>;

  abstract getCustomerOrders(
    filter?: string,
    sort?: string,
    after?: string,
    first?: number,
  ): Promise<Result<DTO.ICustomerOrderConnectionDTO>>;

  abstract getOrderDetails(
    number: string,
    type?: 'short' | 'full',
    id?: string,
  ): Promise<Result<DTO.ICustomerOrderDTO>>;

  abstract requestContactWithOrganizationRegistration(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    organizationName: string,
    middleName?: string,
    phoneNumber?: string,
    about?: string,
    birthDate?: Date,
  ): Promise<Result<DTO.IContactDTO>>;
}
