export type FacetValueItemType = {
  value: string;
  label: string;
  count?: number;
  selected: boolean;
};

export type FacetItemType = {
  label: string;
  paramName: string;
  type: 'terms' | 'range';
  values: FacetValueItemType[];
};

export enum GraphQLErrorCode {
  Forbidden = 'Forbidden',
  Unauthorized = 'Unauthorized',
  Unhandled = '',
}
