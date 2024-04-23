import { Result } from '../models';
import { IBaseRepository, IClient } from './index';

export abstract class IPaymentGatewayRepository implements IBaseRepository {
  protected _client: IClient | null = null;

  protected checkClientSetup = <R>(moduleName: string): Promise<Result<R>> => {
    return new Promise(resolve =>
      resolve(
        this._client
          ? ({ data: true } as Result<R>)
          : ({
              error: {
                code: moduleName,
                message: 'You need to setup a payment gateway client first.',
              },
            } as Result<R>),
      ),
    );
  };

  abstract getInstance: (client: IClient) => this;

  abstract loadConfiguration: (params: any) => Promise<Result<any>>;

  abstract confirmPayment: (params: any) => Promise<Result<boolean>>;
}
