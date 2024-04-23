import { IRepositories, Models } from '../../../../domain';

export class QNB extends IRepositories.IPaymentGatewayRepository {
  getInstance = (client: IRepositories.IClient) => {
    this._client = client;
    return this;
  };

  loadConfiguration = async (params: any): Promise<Models.Result<any>> => {
    const _doesClientExist = await this.checkClientSetup<any>('QNB.loadConfiguration');
    if (!_doesClientExist.data) return _doesClientExist;

    const { orderId } = params;
    if (!orderId)
      return new Promise<Models.Result<any>>(resolve =>
        resolve({
          error: {
            code: 'QNB.loadConfiguration',
            message: 'Order Id is required',
          },
        } as Models.Result<any>),
      );
    else
      return this._client!.post<any>({
        segmentPath: `api/payments/an/QnbInitializePayment/${params.orderId}`,
      }).then(result => {
        if (result.error) {
          return {
            error: {
              code: 'QNB.loadConfiguration',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<any>;
        } else {
          return {
            data: result.data,
          } as Models.Result<any>;
        }
      });
  };

  confirmPayment = async (params: any): Promise<Models.Result<boolean>> => {
    const _doesClientExist = await this.checkClientSetup<boolean>('QNB.confirmPayment');
    if (!_doesClientExist.data) return _doesClientExist;

    const { orderId, query } = params;
    if (!orderId)
      return new Promise<Models.Result<boolean>>(resolve =>
        resolve({
          error: {
            code: 'QNB.confirmPayment',
            message: 'Order Id is required',
          },
        } as Models.Result<boolean>),
      );
    else if (!query)
      return new Promise<Models.Result<boolean>>(resolve =>
        resolve({
          error: {
            code: 'QNB.confirmPayment',
            message: 'query is required',
          },
        } as Models.Result<boolean>),
      );
    else
      return this._client!.post<boolean>({
        segmentPath: `api/payments/an/QnbPostPayment/${params.orderId}`,
        data: query,
        config: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      }).then(result => {
        if (result.error) {
          return {
            error: {
              code: 'QNB.confirmPayment',
              message: result.error?.message,
              trace: [result.error],
            },
          } as Models.Result<boolean>;
        } else {
          return {
            data: result.data,
          } as Models.Result<boolean>;
        }
      });
  };
}
