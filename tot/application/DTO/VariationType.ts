import { IAssetDTO } from "./Asset";
import { IAvailabilityDataDTO } from "./AvailabilityData";
import { ImageTypeDTO } from "./ImageType";
import { IPriceTypeDTO } from "./PriceType";
import { IPropertyDTO } from "./Property";

export interface IVariationTypeDTO {
  /** Assets */
  assets?: Array<IAssetDTO>;
  /** Availability data */
  availabilityData?: IAvailabilityDataDTO;
  /** SKU of variation. */
  code?: string;
  /** Id of variation. */
  id?: string;
  /** Product images */
  images?: Array<ImageTypeDTO>;
  /** Max. quantity. */
  maxQuantity?: number;
  /** Min. quantity. */
  minQuantity?: number;
  /** Name of variation. */
  name?: string;
  /** Product price */
  price?: IPriceTypeDTO;
  /** Product prices */
  prices?: Array<IPriceTypeDTO>;
  /** The type of product */
  productType?: string;
  properties?: Array<IPropertyDTO>;
  /** Request related slug for product */
  slug?: string;
  isInInventory: boolean;
  inventoryAvailableQuantity: number;
}
