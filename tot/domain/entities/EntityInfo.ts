import { Scalars, Maybe } from '../common';

export type EntityInfo = {
  id: Scalars['String'] | null;
  objectType: Scalars['String'] | null;
  objectId: Scalars['String'] | null;
  isActive: Maybe<Scalars['Boolean']>;
  name: Scalars['String'] | null;
  semanticUrl: Scalars['String'] | null;
  pageTitle: Scalars['String'] | null;
  metaDescription: Scalars['String'] | null;
  imageAltDescription: Scalars['String'] | null;
  metaKeywords: Scalars['String'] | null;
  storeId: Scalars['String'] | null;
  languageCode: Scalars['String'] | null;
};
