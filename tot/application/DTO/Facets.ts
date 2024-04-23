export interface IFacetTermTypeDTO {
  /** count */
  count?: number | undefined;
  /** is selected state */
  isSelected?: boolean | undefined;
  label: string;
  /** term */
  term?: string | undefined;
}
export interface IFacetDTO {
  /** Three facet types: Terms, Range, and Filter */
  facetType?: 'TERMS' | 'RANGE' | 'FILTER' | undefined;
  /** Localized name of the facet. */
  label: string;
  /** The key/name  of the facet. */
  name: string;
}
export interface ITermFacetDTO extends IFacetDTO {
  /** Three facet types: Terms, Range, and Filter */
  facetType?: 'TERMS' | 'RANGE' | 'FILTER' | undefined;
  /** Localized name of the facet. */
  label: string;
  /** The key/name  of the facet. */
  name: string;
  /** Terms */
  terms?: Array<IFacetTermTypeDTO> | undefined;
}
