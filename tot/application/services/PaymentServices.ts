import { IPaymentService } from '../contracts';
import { Utils } from '../common';
import { Contracts } from '../types';

export class PaymentServices extends IPaymentService {
  protected setContext() {
    this._context = new this._repos.PaymentGatewaysRepository(
      this._client,
      this._configurations.selectedStoreId,
      this._configurations.selectedCatalogId,
      Utils.convertEnumToStr(this._configurations.defaultCultureName),
      Utils.convertEnumToStr(this._configurations.defaultCurrency),
      this._configurations.user?.id,
    );
  }

  hasGateway(paymentMethodCode: string): Promise<Contracts.Result<boolean>> {
    return this._context.hasGateway(paymentMethodCode).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'PaymentServices.hasGateway',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<boolean>;
      } else {
        return { data: result.data } as Contracts.Result<boolean>;
      }
    });
  }

  loadConfiguration(paymentMethodCode: 'QnbMethod', params: any): Promise<Contracts.Result<any>> {
    this._context.setupGateway(paymentMethodCode);
    return this._context.loadConfiguration(params).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'PaymentServices.loadConfiguration',
            message: result.error?.message,
            trace: [result.error],
          },
        } as Contracts.Result<any>;
      } else {
        return { data: result.data } as Contracts.Result<any>;
      }
    });
  }

  confirmPayment(paymentMethodCode: 'QnbMethod', params: any): Promise<Contracts.Result<boolean>> {
    this._context.setupGateway(paymentMethodCode);
    return this._context.confirmPayment(params).then(result => {
      if (result.error) {
        return {
          error: {
            code: 'PaymentServices.confirmPayment',
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
