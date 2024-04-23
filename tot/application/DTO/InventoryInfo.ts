export type InventoryInfoDTO = {
  /** Allow backorder */
  allowBackorder?: boolean;
  /** Allow preorder */
  allowPreorder?: boolean;
  /** Backorder availability date */
  backorderAvailabilityDate?: any;
  fulfillmentCenterId: string;
  fulfillmentCenterName: string;
  /** Inventory in stock quantity */
  inStockQuantity?: any;
  /** Preorder availability date */
  preorderAvailabilityDate?: any;
  /** Inventory reserved quantity */
  reservedQuantity?: any;
};
