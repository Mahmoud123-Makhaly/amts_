import { RepositoryModulesRegistryFactory, RepositoryInstanceType } from '../../infrastructure';
import { IConfiguration } from './Configuration';
import { Models, IRepositories } from '../../domain';
import { ClientTypes } from '../models';
import {
  IProductService,
  ISEOService,
  IAccountService,
  IFulfillmentCenterService,
  ICartService,
  ICheckoutService,
  IOrderService,
  IPaymentService,
  IIntegrationServiceService,
} from '.';

export abstract class IServiceFactory<T> {
  protected _repositories: RepositoryInstanceType;
  protected readonly _configurations: IConfiguration;
  protected readonly _clientInstance: IRepositories.IClient;
  protected seoServices: ISEOService | null = null;

  productServices: IProductService | null = null;
  accountServices: IAccountService | null = null;
  fulfillmentCenterServices: IFulfillmentCenterService | null = null;
  cartServices: ICartService | null = null;
  checkoutServices: ICheckoutService | null = null;
  orderServices: IOrderService | null = null;
  paymentServices: IPaymentService | null = null;
  integrationServices: IIntegrationServiceService | null = null;

  constructor(configuration: IConfiguration) {
    this._configurations = configuration;
    this._repositories = this.loadRepositoryModule(configuration);
    this._clientInstance = new this._repositories.Client(configuration.basePath, configuration.accessToken);
  }

  private loadRepositoryModule(configuration: IConfiguration) {
    switch (configuration.client.toString()) {
      case ClientTypes.GraphQL.toString():
        return new RepositoryModulesRegistryFactory(Models.ModulesTypes.Apollo).createInstance();
      case ClientTypes.RestAPI.toString():
        return new RepositoryModulesRegistryFactory(Models.ModulesTypes.Axios).createInstance();
      default:
        return new RepositoryModulesRegistryFactory(Models.ModulesTypes.Apollo).createInstance();
    }
  }

  abstract registerProductServices(): T;
  abstract registerAccountServices(): T;
  abstract registerFulfillmentCenterServices(): T;
  abstract registerCartServices(): T;
  abstract registerPaymentServices(): T;
  abstract registerIntegrationServices(): T;
}
