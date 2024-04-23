import { IPropertyDTO } from '../DTO/Property';

export type InputRegisterOrganizationType = {
  description?: string;
  dynamicProperties?: Array<IPropertyDTO>;
  name: string;
};
