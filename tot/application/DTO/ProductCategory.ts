import { ImageTypeDTO } from './ImageType';
import { ISeoInfoDTO } from './SeoInfo';

export interface IProductCategoryDTO {
  /** Breadcrumbs */
  childCategories?: Array<IProductCategoryDTO>;
  /** SKU of category. */
  code: string;
  /** Have a parent */
  hasParent?: boolean;
  /** Id of category. */
  id: string;
  /** The category image. */
  imgSrc?: string;
  /** Level in hierarchy */
  level?: number;
  /** Name of category. */
  name: string;
  /** All parent categories ids relative to the requested catalog and concatenated with \ . E.g. (1/21/344) */
  outline?: string;
  parent?: IProductCategoryDTO;
  /** Category path in to the requested catalog  (all parent categories names concatenated. E.g. (parent1/parent2)) */
  path?: string;
  /** The category priority. */
  priority: number;
  /** Request related slug for category */
  slug?: string;
  seoInfo?: ISeoInfoDTO;
  images?: Array<ImageTypeDTO>;
}
