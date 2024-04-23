import { IRepositories } from '../../domain';

import { IBaseService } from './BaseService';
import { Result } from './Result';

export abstract class IPaymentService extends IBaseService<IRepositories.IPaymentGatewaysRepository> {
  _gateway: IRepositories.IPaymentGatewayRepository | undefined = undefined;

  abstract hasGateway(paymentMethodCode: string): Promise<Result<boolean>>;

  abstract loadConfiguration(paymentMethodCode: 'QnbMethod', params: any): Promise<Result<any>>;

  abstract confirmPayment(paymentMethodCode: 'QnbMethod', params: any): Promise<Result<boolean>>;
}
