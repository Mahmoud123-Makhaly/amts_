import { IEntityBaseRepository } from './EntityBaseRepository';
import { Result } from '../models';
import { CustomerOrderType } from '../entities';

export interface IOrderRepository extends IEntityBaseRepository {
  getInvoice: (number?: string, id?: string) => Promise<Result<Partial<CustomerOrderType>>>;
  updateOrderDynamicProperties: (
    name: string,
    value: string,
    orderId: string,
  ) => Promise<Result<Partial<CustomerOrderType>>>;

  changeOrderStatus: (status: string, orderId: string) => Promise<Result<boolean>>;
}
