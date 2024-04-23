import { ICustomerReviewDTO, IPageInfoDTO } from './index';

export interface ICustomerReviewConnectionDTO {
  items?: Array<ICustomerReviewDTO>;
  pageInfo: IPageInfoDTO;
}
