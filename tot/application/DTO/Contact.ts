import { IAccountDTO, IOrganizationDTO } from '.';

export interface IContactDTO {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phones?: Array<string>;
  about?: string;
  birthdate?: Date;
  status?: string;
  securityAccounts?: Array<IAccountDTO>;
  emails?: Array<string>;
  organizations?: Array<IOrganizationDTO>;
}
