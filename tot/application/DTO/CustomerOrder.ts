import { ILineItemTypeDTO } from './LineItemType';
import { ICurrencyTypeDTO, IMoneyTypeDTO } from './PriceType';
import { IShipmentTypeDTO } from './Shipment';

export interface IPaymentInTypeDTO {
  gatewayCode?: string;
  id?: string;
  isApproved?: boolean;
  number?: string;
  customerId?: string;
  createdDate?: Date;
  isCancelled?: boolean;
  objectType?: string;
  operationType?: string;
}

export interface ICustomerOrderDTO {
  createdDate: Date;
  currency?: ICurrencyTypeDTO;
  customerName?: string;
  inPayments: Array<IPaymentInTypeDTO>;
  id: string;
  isApproved: boolean;
  isCancelled: boolean;
  items: Array<ILineItemTypeDTO>;
  number: string;
  purchaseOrderNumber?: string;
  shipments?: Array<IShipmentTypeDTO>;
  status?: string;
  shippingTotal?: IMoneyTypeDTO;
  subTotal?: IMoneyTypeDTO;
  taxTotal?: IMoneyTypeDTO;
  discountTotalWithTax?: IMoneyTypeDTO;
  total?: IMoneyTypeDTO;
  modifiedDate: Date;
}
