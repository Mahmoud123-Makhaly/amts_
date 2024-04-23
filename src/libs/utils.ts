import crypto from 'crypto';
import moment from 'moment';
import { DTO } from '@tot/core/types';

type EnumValueType = string | number;
type AnyObject = Record<string, any>;

const getType = (p: any): string => {
  if (Array.isArray(p)) return 'array';
  else if (typeof p == 'string') return 'string';
  else if (p != null && typeof p == 'object') return 'object';
  else return 'other';
};

const toBoolean = (input: string | number): boolean => {
  const value = input.toString();
  if (value === '1' || value === 'true') {
    return true;
  } else if (value === '0' || value === 'false') {
    return false;
  } else throw Error(`Invalid boolean`);
};

// Utility function to convert enum value to string or number
const enumToValue = <T extends {}>(enumType: T, value: EnumValueType): EnumValueType | undefined => {
  const enumKeys = Object.keys(enumType) as (keyof typeof enumType)[];
  const key = enumKeys.find(key => enumType[key] === value);
  return key !== undefined ? (enumType[key] as EnumValueType) : undefined;
};

// Utility function to convert string or number to enum value
const valueToEnum = <T extends {}>(enumType: T, val: EnumValueType): T | undefined => {
  const enumKeys = Object.keys(enumType) as (keyof typeof enumType)[];
  const key = enumKeys.find(key => enumType[key] === val);
  return key !== undefined ? (enumType[key] as T) : undefined;
};

const cleanEmpty = (obj: any): AnyObject => {
  if (Array.isArray(obj)) {
    return obj
      .map(v => (v && typeof v === 'object' ? cleanEmpty(v) : v))
      .filter(v => v !== null && v !== undefined) as AnyObject[];
  } else {
    return Object.entries(obj).reduce((acc, [k, v]) => {
      if (v !== null && v !== undefined && v !== '') {
        acc[k] = typeof v === 'object' ? cleanEmpty(v) : v;
      }
      return acc;
    }, {} as AnyObject);
  }
};
const cleanEmptyAndZeros = (obj: any): AnyObject => {
  if (Array.isArray(obj)) {
    return obj
      .map(v => (v && typeof v === 'object' ? cleanEmpty(v) : v))
      .filter(v => v !== null && v !== undefined && v.toString() !== '0') as AnyObject[];
  } else {
    return Object.entries(obj).reduce((acc, [k, v]) => {
      if (v !== null && v !== undefined && v !== '' && v.toString() !== '0') {
        acc[k] = typeof v === 'object' ? cleanEmpty(v) : v;
      }
      return acc;
    }, {} as AnyObject);
  }
};

const generateQueryString = (params: AnyObject): string => {
  const queryString = Object.keys(params)
    .map(key => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        return `${key}=${value.toString()}`;
      }
      return '';
    })
    .filter(param => param !== '')
    .join('&');

  return queryString ? `?${queryString}` : '';
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

const isValidBirthDate = (day: string, month: string, year: string): Date | undefined => {
  const parsedDay = parseInt(day, 10);
  const parsedMonth = parseInt(month, 10);
  const parsedYear = parseInt(year, 10);

  // Validate day, month, and year values
  if (
    isNaN(parsedDay) ||
    isNaN(parsedMonth) ||
    isNaN(parsedYear) ||
    parsedDay < 1 ||
    parsedDay > 31 ||
    parsedMonth < 1 ||
    parsedMonth > 12 ||
    parsedYear < 1800 ||
    parsedYear > new Date().getFullYear()
  ) {
    return undefined; // Invalid birthDate
  }

  // Validate day based on the month
  const maxDaysInMonth = new Date(parsedYear, parsedMonth, 0).getDate();
  if (parsedDay > maxDaysInMonth) {
    return undefined; // Invalid day for the given month
  }

  // Create a Date object
  const birthDate = new Date(parsedYear, parsedMonth - 1, parsedDay); // Month is zero-based

  return birthDate;
};

const createHash = (data: { [k: string]: any }, separator: string, secret: string, algorithm = 'sha512'): string => {
  return crypto
    .createHash(algorithm)
    .update(`${JSON.stringify(data)}${separator}${secret}`)
    .digest('hex');
};

const createEncodedHash = (
  data: { [k: string]: any },
  separator: string,
  secret: string,
  algorithm = 'sha512',
): string => {
  const hash = createHash(data, separator, secret, algorithm);
  return encodeURIComponent(hash);
};

const isValidEncodedHash = (
  data: { [k: string]: any },
  separator: string,
  secret: string,
  hash: string,
  algorithm = 'sha512',
): boolean => {
  const _newHash = createEncodedHash(data, separator, secret, algorithm);
  return _newHash === hash;
};

const formatDate = (date?: string, fromNow?: true, time?: '12' | '24', format?: string): string => {
  if (!isNaN(new Date(date || '').getTime())) {
    let newDate = '';
    if (format) newDate = moment(date).format(format);
    else if (fromNow) newDate = moment(date).fromNow(true);
    else if (time) {
      switch (time) {
        case '12':
          newDate = moment(date).format('DD MMM YYYY h:mm A');
          break;
        default:
          newDate = moment(date).format('DD MMM YYYY HH:mm:ss');
          break;
      }
    } else newDate = new Date(date!).toLocaleDateString('en-EG');
    return newDate;
  }
  return date || '';
};

const calculateAverageRating = (
  rateValues: (number | null | undefined)[],
  maxStars: number,
  decimalPlaces: number = 0,
): { average: number; count: number } => {
  // Filter out undefined and null values
  const validRates = rateValues.filter(rate => rate !== null && rate !== undefined) as number[];

  // Calculate sum of valid rates
  const sum = validRates.reduce((acc, curr) => acc + curr, 0);

  // Calculate average rating
  const average = validRates.length > 0 ? sum / validRates.length : 0;

  // Round the average rating to the nearest whole number or to the specified number of decimal places
  const roundedAverage = decimalPlaces > 0 ? parseFloat(average.toFixed(decimalPlaces)) : Math.round(average);

  // Return the rounded average rating and count of valid ratings
  return {
    average: roundedAverage > maxStars ? maxStars : roundedAverage,
    count: validRates.length,
  };
};

const convertArabicToEnglish = (str: string): string => {
  const arabicToEnglishMap: { [key: string]: string } = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
  };

  return str
    ? str
        .split('')
        .map(char => arabicToEnglishMap[char] || char)
        .join('')
    : str;
};

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

const mapIProductDTOtoIVariantDTO = (product: DTO.IProductDTO): DTO.IVariationTypeDTO => {
  let result: DTO.IVariationTypeDTO = { isInInventory: false, inventoryAvailableQuantity: 0 };
  Object.keys(product).forEach(key => {
    // @ts-ignore
    result[key as keyof DTO.IVariationTypeDTO] = product[key];
  });
  return result;
};

export const Utils = {
  toBoolean,
  getType,
  enumToValue,
  valueToEnum,
  cleanEmpty,
  generateQueryString,
  cleanEmptyAndZeros,
  hasPropertyWithSpecificValue,
  isValidBirthDate,
  createHash,
  isValidEncodedHash,
  createEncodedHash,
  formatDate,
  compareValues,
  calculateAverageRating,
  convertArabicToEnglish,
  addressFormatter,
  mapIProductDTOtoIVariantDTO,
};
