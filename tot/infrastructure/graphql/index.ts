import { AccountRepository } from './account';
import { GraphQLClient } from './graphqlClient';
import { ProductRepository } from './product';
import { SEORepository } from './seoRepository';
import { FulfillmentCenterRepository } from './fulfillment-center';
import { CartRepository } from './cart';
import { OrderRepository } from './order';
import { PaymentGatewaysRepository } from './PaymentGatewaysRepository';
import { IntegrationRepository } from './integration';

export const GraphQLModule = {
  Client: GraphQLClient,
  ProductRepository: ProductRepository,
  SEORepository: SEORepository,
  AccountRepository: AccountRepository,
  FulfillmentCenterRepository: FulfillmentCenterRepository,
  CartRepository: CartRepository,
  OrderRepository: OrderRepository,
  PaymentGatewaysRepository: PaymentGatewaysRepository,
  IntegrationRepository: IntegrationRepository,
};
