import { InventoryInfoDTO } from "./InventoryInfo";

export interface IAvailabilityDataDTO  {
  /** Available quantity */
  availableQuantity: any;
  /** Inventories */
  inventories?: Array<InventoryInfoDTO>;
  /** Is active */
  isActive?: boolean;
  /** Is available */
  isAvailable?: boolean;
  /** Is buyable */
  isBuyable?: boolean;
  /** Is in stock */
  isInStock?: boolean;
  /** Is track inventory */
  isTrackInventory?: boolean;
};
