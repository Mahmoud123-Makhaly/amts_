import type { GraphQLError } from 'graphql';

import type { Entities } from '../../../domain';

import type { FacetItemType, FacetValueItemType, GraphQLErrorCode } from '../models';

const getType = (p: any): string => {
  if (Array.isArray(p)) return 'array';
  else if (typeof p == 'string') return 'string';
  else if (p != null && typeof p == 'object') return 'object';
  else return 'other';
};

/**
 * Learn more about filter syntax:
 * - {@link https://github.com/VirtoCommerce/vc-module-experience-api/blob/master/docs/filter-syntax.md#filters}
 * - {@link https://github.com/VirtoCommerce/vc-module-experience-api/blob/master/docs/x-catalog-reference.md#filter-by-price}
 */

const getFilterPriceExpression = (currencyCode?: string, from?: string, to?: string): string => {
  const rangeExpression = from || to ? `(${from || 0} TO${to ? ` ${to}` : ''})` : '';

  const priceFilterExpression = currencyCode ? `price.${currencyCode}:` : `price:`;

  return rangeExpression ? priceFilterExpression + rangeExpression : '';
};

const getFilterExpressionForInStock = (value: boolean): string => {
  return value ? 'availability:InStock' : '';
};

const getFilterExpressionForAvailableIn = (value?: string[], availableInType: 'id' | 'name' = 'name'): string => {
  const branches = value;
  return branches && branches.length
    ? `${availableInType === 'id' ? 'available_in' : 'fulfillmentCenter_name'}:"${branches.join('","')}"`
    : '';
};

const getFilterExpressionFromFacets = (facets: FacetItemType[]): string => {
  const result: string[] = [];

  for (const facet of facets) {
    const selectedValues: string[] = facet.values
      .filter(item => item.selected)
      .map(item =>
        item.value
          // https://github.com/VirtoCommerce/vc-module-experience-api/blob/dev/docs/filter-syntax.md#escaping-special-characters
          .replace(/\\/g, '\\\\')
          .replace(/"/g, '\\"'),
      );

    if (!selectedValues.length) {
      continue;
    }

    const conditions =
      facet.type === 'terms'
        ? `"${selectedValues.join('","')}"` // Terms
        : selectedValues.join(','); // Ranges

    result.push(`"${facet.paramName}":${conditions}`);
  }

  return result.join(' ');
};

const getFilterExpressionFromFacetRange = (facetRange: Entities.FacetRangeType): string => {
  const { from, to, includeFrom, includeTo } = facetRange;

  const firstBracket = includeFrom ? '[' : '(';
  const lastBracket = includeTo ? ']' : ')';

  const fromStr = from ? `${from} ` : '';
  const toStr = to ? ` ${to}` : '';

  return `${firstBracket}${fromStr}TO${toStr}${lastBracket}`;
};

const termFacetToCommonFacet = (termFacet: Entities.TermFacet): FacetItemType => {
  return {
    type: 'terms',
    label: termFacet.label,
    paramName: termFacet.name,
    values: termFacet
      .terms!.map<FacetValueItemType>((facetTerm: Entities.FacetTermType) => ({
        count: facetTerm.count,
        label: facetTerm.label,
        value: facetTerm.term!,
        selected: facetTerm.isSelected!,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)),
  };
};

const rangeFacetToCommonFacet = (rangeFacet: Entities.RangeFacet): FacetItemType => {
  return {
    type: 'range',
    label: rangeFacet.label,
    paramName: rangeFacet.name,
    values: rangeFacet.ranges!.map<FacetValueItemType>((facetRange: Entities.FacetRangeType) => ({
      count: facetRange.count,
      label: facetRange.label!,
      value: getFilterExpressionFromFacetRange(facetRange),
      selected: facetRange.isSelected!,
    })),
  };
};

const hasErrorCode = (graphQLErrors: ReadonlyArray<GraphQLError> | undefined, errorCode: GraphQLErrorCode) => {
  return graphQLErrors?.some(graphQLError => graphQLError.extensions.code === errorCode);
};

const objToArrayOfKeyAndValue = (obj?: any): Array<any> | undefined => {
  if (!obj) return undefined;
  const results: Array<any> = [];
  Object.keys(obj).map(key => {
    results.push({ [key]: obj[key] });
  });
  return results;
};

const convertArrayOfKeyAndValuesToString = (items?: Array<any>, separator: string = ';'): string | undefined => {
  if (!items || items.length <= 0) return undefined;
  const keyValueStrings = items.map(item => {
    const objKey = Object.keys(item)[0];
    return `${objKey}:${item[objKey]}`;
  });
  return keyValueStrings.join(separator);
};

const getFilterProductsORVariationsExpression = (mode?: 'grouped' | 'single' | 'both'): string => {
  if (mode) {
    let exp: string = 'status:';
    exp += mode === 'grouped' ? 'visible' : mode === 'single' ? 'hidden' : 'hidden,visible';
    return exp;
  } else return '';
};

export const Utils = {
  getType,
  getFilterPriceExpression,
  getFilterExpressionForInStock,
  getFilterExpressionForAvailableIn,
  getFilterExpressionFromFacets,
  termFacetToCommonFacet,
  rangeFacetToCommonFacet,
  hasErrorCode,
  objToArrayOfKeyAndValue,
  convertArrayOfKeyAndValuesToString,
  getFilterProductsORVariationsExpression,
};
