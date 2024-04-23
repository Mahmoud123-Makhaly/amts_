import { IRepositories } from '../../domain';
import { IBaseService } from '.';
import { Result } from './Result';
import { Models } from '../types';

export abstract class ICheckoutService extends IBaseService<IRepositories.ICartRepository> {
  protected defaultCartName = 'default';
  protected cartType = 'shopping-cart';

  abstract checkout(
    checks?: Models.ICheckoutProcess | Array<Models.ICheckoutProcess>,
    selectedInventory?: { id?: string; name?: string },
  ): Promise<Result<boolean>>;
}
