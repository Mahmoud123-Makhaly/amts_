import { IPaymentHandler } from './PaymentHandler.types';
import { QNB } from './gateway-handlers';

const usePaymentPage = (): { pay: (paymentMethod: 'QnbMethod', initialConfiguration: any) => void | undefined } => {
  return {
    pay: (paymentMethod: 'QnbMethod', initialConfiguration: any): void | undefined => {
      const handlers = new Map<string, IPaymentHandler>([['QnbMethod', QNB]]);
      return handlers.get(paymentMethod)?.pay(initialConfiguration);
    },
  };
};
export default usePaymentPage;
