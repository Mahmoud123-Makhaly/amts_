import { ILineItemTypeDTO } from './LineItemType';
import { ICurrencyTypeDTO } from './PriceType';
import { IPageInfoDTO } from './Property';

export interface IWishlistTypeDTO {
  /** Currency */
  currency?: ICurrencyTypeDTO;
  /** Shopping cart user ID */
  customerId?: string;
  /** Shopping cart user name */
  customerName?: string;
  /** Shopping cart ID */
  id?: string;
  /** Items */
  items?: Array<ILineItemTypeDTO>;
  /** Item count */
  itemsCount?: number;
  /** Shopping cart name */
  name: string;
  /** Shopping cart store ID */
  storeId?: string;
}

export interface IWishlistConnectionDTO {
  /** A list of all of the edges returned in the connection. */
  edges?: Array<IWishlistEdgeDTO>;
  /** A list of all of the objects returned in the connection. This is a convenience field provided for quickly exploring the API; rather than querying for "{ edges { node } }" when no edge data is needed, this field can be used instead. Note that when clients like Relay need to fetch the "cursor" field on the edge to enable efficient pagination, this shortcut cannot be used, and the full "{ edges { node } } " version should be used instead. */
  items?: Array<IWishlistTypeDTO>;
  /** Information to aid in pagination. */
  pageInfo: IPageInfoDTO;
  /** A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing "5" as the argument to `first`, then fetch the total count so it could display "5 of 83", for example. In cases where we employ infinite scrolling or don't have an exact count of entries, this field will return `null`. */
  totalCount?: number;
}

/** An edge in a connection from an object to another object of type `Wishlist`. */
export interface IWishlistEdgeDTO {
  /** A cursor for use in pagination */
  cursor: string;
  /** The item at the end of the edge */
  node?: IWishlistTypeDTO;
}
