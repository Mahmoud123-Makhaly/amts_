import { ITermFacetDTO } from './Facets';
import { IJsonLd } from './JsonLd';
import { IProductDTO } from './Product';

export interface IProductConnectionDTO extends IJsonLd {
  items?: Array<IProductDTO>;
  /** Term facets */
  termFacets?: Array<ITermFacetDTO>;
  /** A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing "5" as the argument to `first`, then fetch the total count so it could display "5 of 83", for example. In cases where we employ infinite scrolling or don't have an exact count of entries, this field will return `null`. */
  totalCount?: number;
  sort?: Array<{ label: string; term: string; isSelected: boolean }>;
}
