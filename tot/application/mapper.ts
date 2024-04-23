import { Models, DTO } from './types';
import { Entities } from '@tot/domain';

const getProductInventoryProps = (
  product?: Entities.Product | DTO.IProductDTO | DTO.IVariationTypeDTO | Entities.VariationType,
  inInventory?: string | undefined,
): { inventoryAvailableQuantity: number; isInInventory: boolean } => {
  if (
    product &&
    inInventory &&
    product.availabilityData?.inventories &&
    product.availabilityData.inventories.length > 0
  ) {
    const inventoryData = product.availabilityData.inventories.find(
      x =>
        x.inStockQuantity &&
        x.inStockQuantity > 0 &&
        (x.fulfillmentCenterId === inInventory || x.fulfillmentCenterName === inInventory),
    );

    return inventoryData
      ? { inventoryAvailableQuantity: inventoryData.inStockQuantity ?? 0, isInInventory: true }
      : { inventoryAvailableQuantity: 0, isInInventory: false };
  } else
    return {
      inventoryAvailableQuantity: product?.availabilityData?.availableQuantity ?? 0,
      isInInventory: !!product?.availabilityData?.isInStock,
    };
};

function instanceOfIProductDTO(object: any): object is DTO.IProductDTO {
  return 'isInInventory' in object && 'inventoryAvailableQuantity' in object;
}

const mapEntitiesProductToProductDTO = (
  product: Entities.Product | DTO.IProductDTO,
  inInventory?: string,
): DTO.IProductDTO => {
  const data: DTO.IProductDTO = {
    brandName: product.brandName,
    catalogId: product.catalogId,
    category: product.category as DTO.IProductCategoryDTO | undefined,
    code: product.code,
    hasVariations: product.hasVariations,
    id: product.id,
    imgSrc: product.imgSrc,
    inWishlist: product.inWishlist,
    maxQuantity: product.maxQuantity,
    minQuantity: product.minQuantity,
    name: product.name,
    outerId: product.outerId,
    outline: product.outline,
    productType: product.productType,
    seoInfo: product.seoInfo as DTO.ISeoInfoDTO | undefined,
    slug: product.slug,
    minVariationPrice: product.minVariationPrice,
    price: product.price,
    prices: product.prices,
    listFormattedPrice: product.price?.list?.formattedAmount,
    description: !instanceOfIProductDTO(product) ? product.description?.content : product.description,
    images: product.images,
    availabilityData: product.availabilityData,
    breadcrumbs: product.breadcrumbs,
    properties: product.properties,
    assets: product.assets,
    masterVariation: product.masterVariation
      ? { ...product.masterVariation, ...getProductInventoryProps(product.masterVariation, inInventory) }
      : undefined,
    variations: product.variations
      ? product.variations?.map(mv => ({
          ...mv,
          ...getProductInventoryProps(mv, inInventory),
        }))
      : undefined,
    ...getProductInventoryProps(product, inInventory),
  };
  return data;
};

export const Mapper = {
  getProductInventoryProps,
  mapEntitiesProductToProductDTO,
};
