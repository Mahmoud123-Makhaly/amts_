import { Models } from '../types';

export interface ICustomerReviewDTO {
  createdDate: Date;
  entityId: string;
  entityName: string;
  entityType: string;
  id: string;
  modifiedDate?: Date;
  rating: number;
  review: string;
  viewStatus?: Models.CustomerReviewStatus;
  storeId: string;
  title: string;
  userId: string;
  userName: string;
}
