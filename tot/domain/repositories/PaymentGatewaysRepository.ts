import { Result } from '../models';
import { IPaymentGatewayRepository, IEntityBaseRepository } from './index';

export abstract class IPaymentGatewaysRepository extends IEntityBaseRepository {
  _gateway: IPaymentGatewayRepository | undefined = undefined;

  protected checkGatewaySetup = <R>(moduleName: string): Promise<Result<R>> => {
    return new Promise(resolve =>
      resolve(
        this._gateway
          ? ({ data: true } as Result<R>)
          : ({
              error: {
                code: moduleName,
                message: 'You need to setup a payment gateway first.',
              },
            } as Result<R>),
      ),
    );
  };

  abstract hasGateway: (paymentMethodCode: string) => Promise<Result<boolean>>;

  abstract setupGateway: (paymentMethodCode: 'QnbMethod') => this;

  abstract loadConfiguration: (params: any) => Promise<Result<any>>;

  abstract confirmPayment: (params: any) => Promise<Result<boolean>>;
}
