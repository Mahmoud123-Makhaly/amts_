import { IServiceFactory } from '../contracts';
import { AccountServices } from './AccountServices';
import { ProductServices } from './ProductServices';
import { FulfillmentCenterServices } from './FulfillmentCenterServices';
import { CartServices } from './CartServices';
import { CheckoutService } from './CheckoutServices';
import { OrderServices } from './OrderServices';
import { PaymentServices } from './PaymentServices';
import { IntegrationServices } from './IntegrationServices';

export class ServiceFactory extends IServiceFactory<ServiceFactory> {
  registerProductServices(): ServiceFactory {
    this.productServices = new ProductServices(this._configurations, this._repositories, this._clientInstance);
    return this;
  }

  registerAccountServices(): ServiceFactory {
    this.accountServices = new AccountServices(this._configurations, this._repositories, this._clientInstance);
    return this;
  }

  registerFulfillmentCenterServices(): ServiceFactory {
    this.fulfillmentCenterServices = new FulfillmentCenterServices(
      this._configurations,
      this._repositories,
      this._clientInstance,
    );
    return this;
  }

  registerCartServices(): ServiceFactory {
    this.cartServices = new CartServices(this._configurations, this._repositories, this._clientInstance);
    this.checkoutServices = new CheckoutService(this._configurations, this._repositories, this._clientInstance);
    this.orderServices = new OrderServices(this._configurations, this._repositories, this._clientInstance);
    return this;
  }

  registerPaymentServices(): ServiceFactory {
    this.paymentServices = new PaymentServices(this._configurations, this._repositories, this._clientInstance);
    return this;
  }

  registerIntegrationServices(): ServiceFactory {
    this.integrationServices = new IntegrationServices(this._configurations, this._repositories, this._clientInstance);
    return this;
  }
}
