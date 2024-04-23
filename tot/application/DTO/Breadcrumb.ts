export type BreadcrumbDTO = {
  /** Id of item the breadcrumb calculated for */
  itemId?: string;
  /** Semantic URL keyword */
  semanticUrl?: string;
  /** Full path from catalog */
  seoPath?: string;
  /** Name of current breadcrumb */
  title?: string;
  /** Catalog, category or product */
  typeName?: string;
};
