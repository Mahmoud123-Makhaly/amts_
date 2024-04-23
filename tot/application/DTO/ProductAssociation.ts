import { IProductDTO } from './Product';

export interface IProductAssociationDTO{
  associatedObjectId?:string;
  associatedObjectType?:string;
  priority?:number;
  product?: IProductDTO;
  quantity?:number;
  tags?: Array<string>;
  type?:string;
};
