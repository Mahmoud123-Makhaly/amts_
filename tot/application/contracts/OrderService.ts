import { IRepositories } from '../../domain';
import { DTO } from '../types';
import { IBaseService } from './BaseService';
import { Result } from './Result';

export abstract class IOrderService extends IBaseService<IRepositories.IOrderRepository> {
  abstract getInvoice(number?: string, id?: string): Promise<Result<DTO.IInvoiceDTO>>;

  abstract updateOrderDynamicProperties(
    name: string,
    value: string,
    orderId: string,
  ): Promise<Result<Partial<DTO.ICustomerOrderDTO>>>;
  abstract changeOrderStatus(status: string, orderId: string): Promise<Result<boolean>>;
}
