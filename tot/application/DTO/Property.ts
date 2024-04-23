/** Represents property dictionary item */
export interface IPropertyDictionaryItemDTO {
  /** The unique ID of the property dictionary item. */
  id: string;
  /** Value order. */
  sortOrder: number;
  /** Value alias. */
  value?: string;
}
export interface IPageInfoDTO {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: string;
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean;
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: string;
}

/** A connection from an object to a list of objects of type `PropertyDictionaryItem`. */
export interface IPropertyDictionaryItemConnectionDTO {
  /** A list of all of the edges returned in the connection. */
  edges?: Array<PropertyDictionaryItemEdgeDTO>;
  /** A list of all of the objects returned in the connection. This is a convenience field provided for quickly exploring the API; rather than querying for "{ edges { node } }" when no edge data is needed, this field can be used instead. Note that when clients like Relay need to fetch the "cursor" field on the edge to enable efficient pagination, this shortcut cannot be used, and the full "{ edges { node } } " version should be used instead. */
  items?: Array<IPropertyDictionaryItemDTO>;
  /** Information to aid in pagination. */
  pageInfo: IPageInfoDTO;
  /** A count of the total number of objects in this connection, ignoring pagination. This allows a client to fetch the first five objects by passing "5" as the argument to `first`, then fetch the total count so it could display "5 of 83", for example. In cases where we employ infinite scrolling or don't have an exact count of entries, this field will return `null`. */
  totalCount?: number;
}

/** An edge in a connection from an object to another object of type `PropertyDictionaryItem`. */
export interface PropertyDictionaryItemEdgeDTO {
  /** A cursor for use in pagination */
  cursor: string;
  /** The item at the end of the edge */
  node?: IPropertyDictionaryItemDTO;
}

export interface IDynamicPropertyTypeDTO {
  dictionaryItems?: IPropertyDictionaryItemConnectionDTO;
  /** The order for the dynamic property to display */
  displayOrder?: number;
  /** Id */
  id: string;
  /** Is dynamic property value an array */
  isArray?: boolean;
  /** Is dynamic property value a dictionary */
  isDictionary?: boolean;
  /** Is dynamic property value multilingual */
  isMultilingual?: boolean;
  /** Is dynamic property value required */
  isRequired?: boolean;
  /** Localized property name */
  label?: string;
  name: string;
  /** Object type */
  objectType: string;
  /** Value type */
  valueType: string;
}

export interface IPropertyDTO {
  /** The display order of the property. */
  displayOrder?: number;
  /** Is property hidden. */
  hidden: boolean;
  /** The unique ID of the product. */
  id?: string;
  label?: string;
  /** Is property has multiple values. */
  multivalue: boolean;
  /** The name of the property. */
  name: string;
  type?: string;
  value?: any;
  valueId?: string;
  /** ValueType of the property. */
  valueType?: string;
}

export interface IDictionaryItemTypeDTO {
  /** Id */
  id: string;
  /** Localized dictionary item value */
  label?: string;
  /** Name */
  name: string;
}

export interface IDynamicPropertyValueTypeDTO {
  /** Associated dictionary item */
  dictionaryItem?: IDictionaryItemTypeDTO;
  /** Associated dynamic property */
  dynamicProperty?: IDynamicPropertyTypeDTO;
  /** Property name */
  name?: string;
  /** Property value */
  value?: any;
  /** Value type */
  valueType?: string;
}
