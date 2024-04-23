'server only';

import { z } from 'zod';

import { appRegx } from '../../appRegx';

const signUp = z.object({
  firstName: z
    .string({ required_error: 'First Name field is required' })
    .min(3, `First Name must be more than ${3}`)
    .max(128, `First Name must be less than ${128}`),
  lastName: z
    .string({ required_error: 'Last Name field is required' })
    .min(3, `Last Name must be more than ${3}`)
    .max(128, `Last Name must be less than ${128}`),
  email: z.string({ required_error: 'Email field is required' }).email('Invalid Email.'),
  phoneNumber: z.optional(z.string().regex(appRegx.PhoneRegExp, 'invalid phone number format')),
  password: z
    .string({ required_error: 'Password field is required' })
    .regex(
      appRegx.PasswordRegExp,
      'Passwords must have at least one uppercase and one lowercase and 8 chars and one special character',
    ),
  termsAndConditions: z.literal(true, { required_error: 'Terms and Condition field is required' }),
});

const signUpWithOrganization = z.object({
  firstName: z
    .string({ required_error: 'First Name field is required' })
    .min(3, `First Name must be more than ${3}`)
    .max(128, `First Name must be less than ${128}`),
  lastName: z
    .string({ required_error: 'Last Name field is required' })
    .min(3, `Last Name must be more than ${3}`)
    .max(128, `Last Name must be less than ${128}`),
  email: z.string({ required_error: 'Email field is required' }).email('Invalid Email.'),
  phoneNumber: z.optional(z.string().regex(appRegx.PhoneRegExp, 'invalid phone number format')),
  organizationName: z.string({ required_error: 'Organization Name field is required' }),
  password: z
    .string({ required_error: 'Password field is required' })
    .regex(
      appRegx.PasswordRegExp,
      'Passwords must have at least one uppercase and one lowercase and 8 chars and one special character',
    ),
  termsAndConditions: z.literal(true, { required_error: 'Terms and Condition field is required' }),
});

const checkEmailUniqueness = z.string({ required_error: 'Email field is required' }).email('Invalid Email.');

const login = z.object({
  email: z.string({ required_error: 'email field is required' }).email('Invalid Email'),
  password: z.string({ required_error: 'email field is required' }),
});

const getCurrentUser = z.optional(z.void().or(z.object({ accessToken: z.optional(z.string()) })));

const logout = z.void();

const getContactDetails = z.string({ required_error: 'Member id is required to get contact details.' });

const updateContactInput = z.object({
  id: z.string({ required_error: 'ID is required.' }),
  firstName: z
    .string({ required_error: 'First Name field is required.' })
    .min(3, `First Name must be more than ${3}`)
    .max(128, `First Name must be less than ${128}`),
  lastName: z
    .string({ required_error: 'Last Name field is required.' })
    .min(3, `Last Name must be more than ${3}.`)
    .max(128, `Last Name must be less than ${128}.`),
  email: z.string({ required_error: 'Email field is required.' }).email('Invalid Email.'),
  phone: z
    .string({ required_error: 'Phone field is required.' })
    .regex(appRegx.PhoneRegExp, 'Phone number is not valid.'),
  birthDate: z.optional(z.date({ required_error: 'BirthDate is not valid.' })),
});

const changePassword = z.object({
  id: z.string({ required_error: 'User Id is required.' }),
  currentPassword: z.string({ required_error: 'Current Password field is required.' }),
  newPassword: z.string({ required_error: 'New Password field is required.' }),
});

const getMyAddress = z.void().or(
  z.object({
    after: z.optional(z.string()),
    first: z.optional(z.number()),
    sort: z.optional(z.string()),
  }),
);

const address = z.object({
  addressType: z.optional(z.number()),
  /** City */
  city: z.string({ required_error: 'City is required.' }),
  /** Country code */
  countryCode: z.optional(z.string()).default('EGY'),
  /** Country name */
  countryName: z.optional(z.string()).default('Egypt'),
  /** Description */
  description: z.optional(z.string()),
  /** Email */
  email: z.optional(z.string()),
  /** First name */
  firstName: z.optional(z.string()),
  /** Id */
  id: z.optional(z.string()),
  /** Id */
  key: z.optional(z.string()),
  /** Last name */
  lastName: z.optional(z.string()),
  /** Line1 */
  formattedAddress: z.optional(z.string()),
  address: z.string({ required_error: 'address is required.' }),
  building: z.string({ required_error: 'building is required.' }),
  floor: z.string({ required_error: 'floor is required.' }),
  flat: z.string({ required_error: 'flat is required.' }),
  /** Line2 */
  line2: z.optional(z.nullable(z.string())),
  /** Middle name */
  middleName: z.optional(z.string()),
  /** Name */
  name: z.optional(z.string()),
  /** Phone */
  phone: z.optional(z.string()),
  /** Postal code */
  postalCode: z.optional(z.string()).default('00202'),
  /** Region id */
  regionId: z.optional(z.nullable(z.string())),
  regionName: z.optional(z.nullable(z.string())),
});

const deleteMyAddress = z.object({
  memberId: z.string({ required_error: 'MemberId is required.' }),
  address: address.merge(z.object({ key: z.string({ required_error: 'Id is required.' }) })),
});

const updateMyAddress = z.object({
  memberId: z.string({ required_error: 'MemberId is required.' }),
  address: address.merge(z.object({ key: z.string({ required_error: 'Id is required.' }) })),
});

const addMyAddress = z.object({
  memberId: z.string({ required_error: 'MemberId is required.' }),
  address: address,
});

const requestPasswordReset = z.object({
  email: z.string({ required_error: 'Email field is required' }).email('Invalid Email.'),
  prefixLocale: z.optional(z.string()),
  state: z.record(z.string()),
});

const requestDefaultWishlist = z.void();

const addWishlistItem = z.object({
  listId: z.string({ required_error: 'ListId field is required' }),
  productId: z.string({ required_error: 'ProductId field is required' }),
  quantity: z.optional(z.number()),
});

const deleteWishlistItem = z.object({
  listId: z.string({ required_error: 'ListId field is required' }),
  productId: z.string({ required_error: 'ProductId field is required' }),
});

const getDefaultWishlist = z.void();

const refreshToken = z.string({ required_error: 'Refresh Token field is required' });

const addReview = z.object({
  userName: z.string({ required_error: 'Username field is required' }),
  entityId: z.string({ required_error: 'Entity Id field is required' }),
  entityType: z.enum(['Product']),
  entityName: z.string({ required_error: 'Entity Name field is required' }),
  title: z.string({ required_error: 'Title field is required' }),
  review: z.string({ required_error: 'Review field is required' }),
  rating: z.number({ required_error: 'Rating field is required' }).gt(0),
  pathName: z.string({ required_error: 'Path Name field is required' }),
});

const getCustomerOrders = z.void().or(
  z.object({
    skip: z.optional(z.number()).default(0),
    take: z.optional(z.number()).default(3),
    sort: z.optional(z.string()),
    filter: z.optional(z.string()),
  }),
);

const getOrderDetails = z.object({
  id: z.optional(z.string()),
  number: z.string({ required_error: ' Order Number field is required' }),
  type: z.optional(z.enum(['short', 'full']).default('full')),
});

export const Schema = {
  signUp,
  checkEmailUniqueness,
  login,
  getCurrentUser,
  logout,
  getContactDetails,
  updateContactInput,
  changePassword,
  getMyAddress,
  deleteMyAddress,
  updateMyAddress,
  addMyAddress,
  requestPasswordReset,
  requestDefaultWishlist,
  addWishlistItem,
  deleteWishlistItem,
  getDefaultWishlist,
  refreshToken,
  addReview,
  getCustomerOrders,
  getOrderDetails,
  signUpWithOrganization,
};
