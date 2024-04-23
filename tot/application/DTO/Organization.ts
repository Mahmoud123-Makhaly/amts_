import { IMemberAddressDTO } from './MemberAddress';

export interface IOrganizationDTO {
  id?: string;
  name?: string;
  description?: string;
  address?: IMemberAddressDTO;
  status?: string;
  createdBy?: string;
  ownerId?: string;
}
