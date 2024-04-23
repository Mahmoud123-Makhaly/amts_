/**
 * Maybe
 is a generic type that takes a single type parameter T.
 It is used to define optional properties in an object by allowing the property to be undefined or have a value of type T
 */
export type Maybe<T> = T;

/**
 * InputMaybe is a type alias for Maybe<T>. It is used to define optional input parameters in a function.
 */
export type InputMaybe<T> = T;

/*
Exact
 is a type that takes an object type T
 and returns an object type with the same properties as T,
 but with all optional properties removed.
 */
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };

/*
MakeOptional
 makes all properties in the object optional, including nested properties.
 It does this by using the Omit type to remove the specified key from the object type,
and then adding a ? to the key name to make it optional. This means that all properties in the object will be optional, including nested properties.
*/
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };

/*
MakeMaybe
 makes only the specified property optional, but it does not make any nested properties optional.
 It does this by using the Omit type to remove the specified key from the object type,
 and then adding a Maybe<T[SubKey]> type to the key name to make it optional.
 This means that only the specified property is optional, but nested properties are not affected.
*/
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

/** All built-in and custom scalars, mapped to their actual values.
 * Scalars is an object type that defines the built-in and custom scalars in a GraphQL schema. It maps each scalar to its actual value.
 */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Decimal: any;
  DynamicPropertyValue: any;
  Long: any;
  OptionalDecimal: any;
  OptionalNullableDecimal: any;
  OptionalString: any;
  PropertyValue: any;
};
