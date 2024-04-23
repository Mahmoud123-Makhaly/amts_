import * as Account from './account/actions';
import * as App from './app/actions';
import * as Products from './products/actions';
import * as Session from './session';
import * as FulfillmentCenters from './fulfillment-centers/actions';
import * as Cart from './cart/actions';
import * as Order from './order/actions';
import * as Payment from './payment/actions';
import * as Integration from './integration/actions';

export const Actions = {
  products: Products,
  account: Account,
  app: App,
  session: Session,
  fulfillmentCenters: FulfillmentCenters,
  cart: Cart,
  order: Order,
  payment: Payment,
  integration: Integration,
};
