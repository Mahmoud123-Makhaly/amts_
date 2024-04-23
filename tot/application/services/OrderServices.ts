import { Utils } from '../common';
import { IOrderService, Result } from '../contracts';
import { Mapper } from '../mapper';
import { Contracts, DTO } from '../types';

export class OrderServices extends IOrderService {
  protected setContext() {
    this._context = new this._repos.OrderRepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
      this._configurations.apiKey,
    );
  }

  getInvoice(number?: string, id?: string): Promise<Result<DTO.IInvoiceDTO>> {
    return this._context.getInvoice(number, id).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'OrderServices.getInvoice',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<DTO.IInvoiceDTO>;
      } else {
        const data: DTO.IInvoiceDTO = {
          status: result.data.status ?? '',
          id: result.data.id ?? '',
          createdDate: result.data.createdDate ?? Date.now(),
          shipments: result.data.shipments?.map(shipment => ({
            ...shipment,
            deliveryAddress: {
              ...shipment.deliveryAddress,
              formattedAddress: shipment.deliveryAddress?.line1,
            },
            ...Object(Utils.removeKeysDeep(shipment, ['discounts'])),
          })),
          items: result.data.items!.map(item => ({
            ...item,
            ...Object(Utils.removeKeysDeep(item, ['discounts'])),
            product: item?.product ? { ...Mapper.mapEntitiesProductToProductDTO(item.product) } : undefined,
          })),
          number: result.data.number ?? '',
          subTotal: result.data.subTotal,
          total: result.data.total,
          discountTotalWithTax: result.data.discountTotalWithTax,
          shippingTotal: result.data.shippingTotal,
          taxTotal: result.data.taxTotal,
          inPayments: (result.data.inPayments ?? [])?.map(x => ({
            gatewayCode: x.gatewayCode,
            createdDate: x.capturedDate,
            isApproved: false,
            isCancelled: false,
            number: x.number,
            objectType: x.objectType,
            operationType: x.operationType,
          })),
          shippingSubTotalWithTax: result.data.shippingSubTotalWithTax,
        };
        Utils.removeKeysDeep(data, [
          'id',
          'key',
          'regionId',
          'catalogId',
          'outerId',
          'priceId',
          'categoryId',
          'vendorId',
          'productId',
          'fulfillmentCenterId',
        ]);
        return { data } as Contracts.Result<DTO.IInvoiceDTO>;
      }
    });
  }

  updateOrderDynamicProperties(
    name: string,
    value: string,
    orderId: string,
  ): Promise<Result<Partial<DTO.ICustomerOrderDTO>>> {
    return this._context.updateOrderDynamicProperties(name, value, orderId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'OrderServices.updateOrderDynamicProperties',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<Partial<DTO.ICustomerOrderDTO>>;
      } else {
        return { data: result.data } as Contracts.Result<Partial<DTO.ICustomerOrderDTO>>;
      }
    });
  }

  changeOrderStatus(status: string, orderId: string): Promise<Result<boolean>> {
    return this._context.changeOrderStatus(status, orderId).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'OrderServices.changeOrderStatus',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }
}
