import { IPaymentInTypeDTO } from './CustomerOrder';
import { ILineItemTypeDTO } from './LineItemType';
import { IMoneyTypeDTO } from './PriceType';
import { IShipmentTypeDTO } from './Shipment';

export interface IInvoiceDTO {
  createdDate: Date;
  id: string;
  status?: string;
  number: string;
  items: Array<ILineItemTypeDTO>;
  shipments?: Array<IShipmentTypeDTO>;
  inPayments: Array<IPaymentInTypeDTO>;
  discountTotalWithTax?: IMoneyTypeDTO;
  discountTotal?: IMoneyTypeDTO;
  shippingTotal?: IMoneyTypeDTO;
  taxTotal?: IMoneyTypeDTO;
  subTotal?: IMoneyTypeDTO;
  total?: IMoneyTypeDTO;
  shippingSubTotalWithTax?: IMoneyTypeDTO;
}
