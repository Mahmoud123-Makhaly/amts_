import { IPaymentHandler } from '../PaymentHandler.types';

export const QNB: IPaymentHandler = {
  pay: (initialConfiguration: any) => {
    if (!initialConfiguration.Item3) return undefined;
    Checkout.configure({ session: { id: `${initialConfiguration.Item3}` } });
    Checkout.showPaymentPage();
  },
};
