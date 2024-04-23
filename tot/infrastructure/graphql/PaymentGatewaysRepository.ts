import { IRepositories, Models } from '../../domain';
import { PaymentGatewaysMap } from '../core';
import { GraphQLClient } from './graphqlClient';

export class PaymentGatewaysRepository extends IRepositories.IPaymentGatewaysRepository {
  private _restClient = (this._context as GraphQLClient)._restContext;

  constructor(
    context: IRepositories.IClient,
    storeId?: string,
    catalogId?: string,
    cultureName?: string,
    currencyCode?: string,
    userId?: string,
  ) {
    super(context, storeId, catalogId, cultureName, currencyCode, userId);
  }

  hasGateway = (paymentMethodCode: string) => {
    return new Promise<Models.Result<boolean>>(resolve =>
      resolve({ data: PaymentGatewaysMap.has(paymentMethodCode) } as Models.Result<boolean>),
    );
  };

  setupGateway = (paymentMethodCode: 'QnbMethod') => {
    const getPG = PaymentGatewaysMap.get(paymentMethodCode) as IRepositories.IPaymentGatewayRepository | undefined;
    if (getPG) this._gateway = getPG.getInstance(this._restClient);
    return this;
  };

  loadConfiguration = async (params: any): Promise<Models.Result<any>> => {
    const _doesGatewayExist = await this.checkGatewaySetup<any>('PaymentGatewaysRepository.loadConfiguration');
    if (!_doesGatewayExist.data) return _doesGatewayExist;
    return this._gateway!.loadConfiguration(params);
  };

  confirmPayment = async (params: any): Promise<Models.Result<boolean>> => {
    const _doesGatewayExist = await this.checkGatewaySetup<boolean>('PaymentGatewaysRepository.confirmPayment');
    if (!_doesGatewayExist.data) return _doesGatewayExist;
    return this._gateway!.confirmPayment(params);
  };
}
