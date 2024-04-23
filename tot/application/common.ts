import crypto from 'crypto';
import { Models } from './types';

type EnumValueType = string | number;
type AnyObject = Record<string, any>;

const convertEnumToStr = <T extends string | number>(enumType: T): string => {
  return enumType.toString();
};

const checkIfEmpty = (val?: string): boolean => {
  return val?.trim() === null || val?.trim() === undefined || val?.trim() === '';
};

const createHashLink = (
  data: Record<string, string>,
  separator: string,
  secret: string,
  algorithm = 'sha256',
): string => {
  return crypto
    .createHash(algorithm)
    .update(`${JSON.stringify(data)}${separator}${secret}`)
    .digest('hex');
};

const createEncodedHash = (
  data: Record<string, string>,
  separator: string,
  secret: string,
  algorithm = 'sha256',
): string => {
  const hash = createHashLink(data, separator, secret, algorithm);
  return `${Object.keys(data)
    .map(k => `${k}=${encodeURIComponent(data[k])}`)
    .join('&')}&hash=${encodeURIComponent(hash)}`;
};

const isValidHash = (
  data: Record<string, string>,
  separator: string,
  secret: string,
  hash: string,
  algorithm = 'sha256',
): boolean => {
  const _newHash = createHashLink(data, separator, secret, algorithm);
  return _newHash === hash;
};

/**
 * Remove all specified keys from an object, no matter how deep they are.
 * The removal is done in place, so run it on a copy if you don't want to modify the original object.
 * This function has no limit so circular objects will probably crash the browser
 *
 * @param obj The object from where you want to remove the keys
 * @param keys An array of property names (strings) to remove
 */
const removeKeysDeep = (obj: { [k: string]: any }, keys: Array<string>) => {
  var index;
  for (var prop in obj) {
    // important check that this is objects own property
    // not from prototype prop inherited
    if (obj.hasOwnProperty(prop)) {
      switch (typeof obj[prop]) {
        case 'object':
          index = keys.indexOf(prop);
          if (index > -1) {
            delete obj[prop];
          } else {
            removeKeysDeep(obj[prop], keys);
          }
          break;
        default:
          keys.forEach(k => {
            if (k === prop) delete obj[prop];
          });
          break;
      }
    }
  }
};

const valueToEnum = <T>(enumType: T, val: EnumValueType): T | undefined => {
  const enumKeys = Object.keys(enumType ?? {}) as (keyof typeof enumType)[];
  const key = enumKeys.find(key => enumType[key] === val);
  return key !== undefined ? (enumType[key] as T) : undefined;
};

const compareValues = (source: any, target: any, operator: 'sw' | 'swi' | 'eq' | 'in' | 'ini') => {
  switch (operator) {
    case 'sw': // Start With case sensitive
      return source?.startsWith(target);
    case 'swi': // Start With case insensitive
      return source?.toLowerCase().startsWith(target?.toLowerCase());
    case 'eq': // Equal To
      return source === target;
    case 'in': // Includes case sensitive
      return source.toString().includes(target.toString());
    case 'ini': // Includes case insensitive
      return source.toString().toLowerCase().includes(target.toString().toLowerCase());
    default:
      return false;
  }
};

function hasPropertyWithSpecificValue(obj: any, targetProp: string, targetValue: any): boolean;
function hasPropertyWithSpecificValue(
  obj: any,
  targetProp: string,
  targetValue: any,
  operator: 'sw' | 'swi' | 'eq' | 'in' | 'ini',
): boolean;
function hasPropertyWithSpecificValue(
  obj: AnyObject,
  targetProp: string,
  targetValue: any,
  operator: 'sw' | 'swi' | 'eq' | 'in' | 'ini' = 'eq',
): boolean {
  // Check if the object is null or undefined
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  if (obj.hasOwnProperty(targetProp) && compareValues(obj[targetProp], targetValue, operator)) {
    return true;
  }

  // If the object is an array, recursively search each element
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (hasPropertyWithSpecificValue(item, targetProp, targetValue, operator)) {
        return true;
      }
    }
  } else {
    // If the object is not an array, recursively search its properties
    for (const key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        typeof obj[key] === 'object' &&
        hasPropertyWithSpecificValue(obj[key], targetProp, targetValue, operator)
      ) {
        return true;
      }
    }
  }

  // Property with the specific value not found in the object
  return false;
}

const addressFormatter = (
  mode: 'format' | 'extract',
  address: string | { address: string; building: string; floor: string; flat: string },
): string | { formattedAddress: string; address: string; building: string; floor: string; flat: string } => {
  if (mode === 'format' && typeof address === 'object') {
    return [address.address, `building:${address.building}`, `floor:${address.floor}`, `apt:${address.flat}`].join(',');
  } else if (mode === 'extract' && typeof address === 'string') {
    const _addressHouseDetails = address.replace(/building:|floor:|apt:/g, '').split(',');
    return {
      formattedAddress: address,
      address: _addressHouseDetails?.at(0) ?? '',
      building: _addressHouseDetails?.at(1) ?? '',
      floor: _addressHouseDetails?.at(2) ?? '',
      flat: _addressHouseDetails?.at(3) ?? '',
    };
  }
  return '';
};

const productSortLabels = (key: string, culture?: Models.CultureNames): string => {
  const messages = {
    [Models.CultureNames.US]:
      new Map([
        ['FEATURED', 'Featured'],
        ['ALPHABET_AZ', 'Alphabetically, A-Z'],
        ['ALPHABET_ZA', 'Alphabetically, Z-A'],
        ['PRICE_LH', 'Price, low to high'],
        ['PRICE_HL', 'Price, high to low'],
        ['DATE_NO', 'Date, new to old'],
        ['DATE_ON', 'Date, old to new'],
        ['IN_STOCK', 'In Stock First'],
      ]).get(key) ?? '',
    [Models.CultureNames.EG]:
      new Map([
        ['FEATURED', 'مميز'],
        ['ALPHABET_AZ', 'أبجديًا، من الألف إلى الياء'],
        ['ALPHABET_ZA', 'أبجديًا، من الياء إلى الألف'],
        ['PRICE_LH', 'السعر، من الأقل إلى الأعلى'],
        ['PRICE_HL', 'السعر، من الأعلى إلى الأقل'],
        ['DATE_NO', 'التاريخ، من الجديد إلى القديم'],
        ['DATE_ON', 'التاريخ، من القديم إلى الجديد'],
        ['IN_STOCK', 'في المخزن الأول'],
      ]).get(key) ?? '',
  };
  return messages[culture ?? Models.CultureNames.US];
};

export const Utils = {
  convertEnumToStr,
  checkIfEmpty,
  createHashLink,
  createEncodedHash,
  isValidHash,
  removeKeysDeep,
  valueToEnum,
  compareValues,
  hasPropertyWithSpecificValue,
  addressFormatter,
  productSortLabels,
};
